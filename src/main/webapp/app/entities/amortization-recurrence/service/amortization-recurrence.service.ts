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
import { IAmortizationRecurrence, NewAmortizationRecurrence } from '../amortization-recurrence.model';

export type PartialUpdateAmortizationRecurrence = Partial<IAmortizationRecurrence> & Pick<IAmortizationRecurrence, 'id'>;

type RestOf<T extends IAmortizationRecurrence | NewAmortizationRecurrence> = Omit<T, 'firstAmortizationDate' | 'timeOfInstallation'> & {
  firstAmortizationDate?: string | null;
  timeOfInstallation?: string | null;
};

export type RestAmortizationRecurrence = RestOf<IAmortizationRecurrence>;

export type NewRestAmortizationRecurrence = RestOf<NewAmortizationRecurrence>;

export type PartialUpdateRestAmortizationRecurrence = RestOf<PartialUpdateAmortizationRecurrence>;

export type EntityResponseType = HttpResponse<IAmortizationRecurrence>;
export type EntityArrayResponseType = HttpResponse<IAmortizationRecurrence[]>;

@Injectable({ providedIn: 'root' })
export class AmortizationRecurrenceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/amortization-recurrences');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/amortization-recurrences');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(amortizationRecurrence: NewAmortizationRecurrence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(amortizationRecurrence);
    return this.http
      .post<RestAmortizationRecurrence>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(amortizationRecurrence: IAmortizationRecurrence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(amortizationRecurrence);
    return this.http
      .put<RestAmortizationRecurrence>(`${this.resourceUrl}/${this.getAmortizationRecurrenceIdentifier(amortizationRecurrence)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(amortizationRecurrence: PartialUpdateAmortizationRecurrence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(amortizationRecurrence);
    return this.http
      .patch<RestAmortizationRecurrence>(`${this.resourceUrl}/${this.getAmortizationRecurrenceIdentifier(amortizationRecurrence)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAmortizationRecurrence>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAmortizationRecurrence[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAmortizationRecurrence[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getAmortizationRecurrenceIdentifier(amortizationRecurrence: Pick<IAmortizationRecurrence, 'id'>): number {
    return amortizationRecurrence.id;
  }

  compareAmortizationRecurrence(o1: Pick<IAmortizationRecurrence, 'id'> | null, o2: Pick<IAmortizationRecurrence, 'id'> | null): boolean {
    return o1 && o2 ? this.getAmortizationRecurrenceIdentifier(o1) === this.getAmortizationRecurrenceIdentifier(o2) : o1 === o2;
  }

  addAmortizationRecurrenceToCollectionIfMissing<Type extends Pick<IAmortizationRecurrence, 'id'>>(
    amortizationRecurrenceCollection: Type[],
    ...amortizationRecurrencesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const amortizationRecurrences: Type[] = amortizationRecurrencesToCheck.filter(isPresent);
    if (amortizationRecurrences.length > 0) {
      const amortizationRecurrenceCollectionIdentifiers = amortizationRecurrenceCollection.map(
        amortizationRecurrenceItem => this.getAmortizationRecurrenceIdentifier(amortizationRecurrenceItem)!
      );
      const amortizationRecurrencesToAdd = amortizationRecurrences.filter(amortizationRecurrenceItem => {
        const amortizationRecurrenceIdentifier = this.getAmortizationRecurrenceIdentifier(amortizationRecurrenceItem);
        if (amortizationRecurrenceCollectionIdentifiers.includes(amortizationRecurrenceIdentifier)) {
          return false;
        }
        amortizationRecurrenceCollectionIdentifiers.push(amortizationRecurrenceIdentifier);
        return true;
      });
      return [...amortizationRecurrencesToAdd, ...amortizationRecurrenceCollection];
    }
    return amortizationRecurrenceCollection;
  }

  protected convertDateFromClient<T extends IAmortizationRecurrence | NewAmortizationRecurrence | PartialUpdateAmortizationRecurrence>(
    amortizationRecurrence: T
  ): RestOf<T> {
    return {
      ...amortizationRecurrence,
      firstAmortizationDate: amortizationRecurrence.firstAmortizationDate?.format(DATE_FORMAT) ?? null,
      timeOfInstallation: amortizationRecurrence.timeOfInstallation?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAmortizationRecurrence: RestAmortizationRecurrence): IAmortizationRecurrence {
    return {
      ...restAmortizationRecurrence,
      firstAmortizationDate: restAmortizationRecurrence.firstAmortizationDate
        ? dayjs(restAmortizationRecurrence.firstAmortizationDate)
        : undefined,
      timeOfInstallation: restAmortizationRecurrence.timeOfInstallation ? dayjs(restAmortizationRecurrence.timeOfInstallation) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAmortizationRecurrence>): HttpResponse<IAmortizationRecurrence> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAmortizationRecurrence[]>): HttpResponse<IAmortizationRecurrence[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
