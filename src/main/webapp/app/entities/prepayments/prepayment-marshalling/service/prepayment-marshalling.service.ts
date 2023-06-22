import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IPrepaymentMarshalling, NewPrepaymentMarshalling } from '../prepayment-marshalling.model';

export type PartialUpdatePrepaymentMarshalling = Partial<IPrepaymentMarshalling> & Pick<IPrepaymentMarshalling, 'id'>;

type RestOf<T extends IPrepaymentMarshalling | NewPrepaymentMarshalling> = Omit<T, 'amortizationCommencementDate'> & {
  amortizationCommencementDate?: string | null;
};

export type RestPrepaymentMarshalling = RestOf<IPrepaymentMarshalling>;

export type NewRestPrepaymentMarshalling = RestOf<NewPrepaymentMarshalling>;

export type PartialUpdateRestPrepaymentMarshalling = RestOf<PartialUpdatePrepaymentMarshalling>;

export type EntityResponseType = HttpResponse<IPrepaymentMarshalling>;
export type EntityArrayResponseType = HttpResponse<IPrepaymentMarshalling[]>;

@Injectable({ providedIn: 'root' })
export class PrepaymentMarshallingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/prepayment-marshallings');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/prepayment-marshallings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(prepaymentMarshalling: NewPrepaymentMarshalling): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentMarshalling);
    return this.http
      .post<RestPrepaymentMarshalling>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(prepaymentMarshalling: IPrepaymentMarshalling): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentMarshalling);
    return this.http
      .put<RestPrepaymentMarshalling>(`${this.resourceUrl}/${this.getPrepaymentMarshallingIdentifier(prepaymentMarshalling)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(prepaymentMarshalling: PartialUpdatePrepaymentMarshalling): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentMarshalling);
    return this.http
      .patch<RestPrepaymentMarshalling>(`${this.resourceUrl}/${this.getPrepaymentMarshallingIdentifier(prepaymentMarshalling)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPrepaymentMarshalling>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPrepaymentMarshalling[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPrepaymentMarshalling[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getPrepaymentMarshallingIdentifier(prepaymentMarshalling: Pick<IPrepaymentMarshalling, 'id'>): number {
    return prepaymentMarshalling.id;
  }

  comparePrepaymentMarshalling(o1: Pick<IPrepaymentMarshalling, 'id'> | null, o2: Pick<IPrepaymentMarshalling, 'id'> | null): boolean {
    return o1 && o2 ? this.getPrepaymentMarshallingIdentifier(o1) === this.getPrepaymentMarshallingIdentifier(o2) : o1 === o2;
  }

  addPrepaymentMarshallingToCollectionIfMissing<Type extends Pick<IPrepaymentMarshalling, 'id'>>(
    prepaymentMarshallingCollection: Type[],
    ...prepaymentMarshallingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const prepaymentMarshallings: Type[] = prepaymentMarshallingsToCheck.filter(isPresent);
    if (prepaymentMarshallings.length > 0) {
      const prepaymentMarshallingCollectionIdentifiers = prepaymentMarshallingCollection.map(
        prepaymentMarshallingItem => this.getPrepaymentMarshallingIdentifier(prepaymentMarshallingItem)!
      );
      const prepaymentMarshallingsToAdd = prepaymentMarshallings.filter(prepaymentMarshallingItem => {
        const prepaymentMarshallingIdentifier = this.getPrepaymentMarshallingIdentifier(prepaymentMarshallingItem);
        if (prepaymentMarshallingCollectionIdentifiers.includes(prepaymentMarshallingIdentifier)) {
          return false;
        }
        prepaymentMarshallingCollectionIdentifiers.push(prepaymentMarshallingIdentifier);
        return true;
      });
      return [...prepaymentMarshallingsToAdd, ...prepaymentMarshallingCollection];
    }
    return prepaymentMarshallingCollection;
  }

  protected convertDateFromClient<T extends IPrepaymentMarshalling | NewPrepaymentMarshalling | PartialUpdatePrepaymentMarshalling>(
    prepaymentMarshalling: T
  ): RestOf<T> {
    return {
      ...prepaymentMarshalling,
      amortizationCommencementDate: prepaymentMarshalling.amortizationCommencementDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restPrepaymentMarshalling: RestPrepaymentMarshalling): IPrepaymentMarshalling {
    return {
      ...restPrepaymentMarshalling,
      amortizationCommencementDate: restPrepaymentMarshalling.amortizationCommencementDate
        ? dayjs(restPrepaymentMarshalling.amortizationCommencementDate)
        : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPrepaymentMarshalling>): HttpResponse<IPrepaymentMarshalling> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPrepaymentMarshalling[]>): HttpResponse<IPrepaymentMarshalling[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
