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
import { ILeaseModelMetadata, NewLeaseModelMetadata } from '../lease-model-metadata.model';

export type PartialUpdateLeaseModelMetadata = Partial<ILeaseModelMetadata> & Pick<ILeaseModelMetadata, 'id'>;

type RestOf<T extends ILeaseModelMetadata | NewLeaseModelMetadata> = Omit<T, 'commencementDate' | 'terminalDate'> & {
  commencementDate?: string | null;
  terminalDate?: string | null;
};

export type RestLeaseModelMetadata = RestOf<ILeaseModelMetadata>;

export type NewRestLeaseModelMetadata = RestOf<NewLeaseModelMetadata>;

export type PartialUpdateRestLeaseModelMetadata = RestOf<PartialUpdateLeaseModelMetadata>;

export type EntityResponseType = HttpResponse<ILeaseModelMetadata>;
export type EntityArrayResponseType = HttpResponse<ILeaseModelMetadata[]>;

@Injectable({ providedIn: 'root' })
export class LeaseModelMetadataService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lease-model-metadata');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/lease-model-metadata');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(leaseModelMetadata: NewLeaseModelMetadata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseModelMetadata);
    return this.http
      .post<RestLeaseModelMetadata>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(leaseModelMetadata: ILeaseModelMetadata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseModelMetadata);
    return this.http
      .put<RestLeaseModelMetadata>(`${this.resourceUrl}/${this.getLeaseModelMetadataIdentifier(leaseModelMetadata)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(leaseModelMetadata: PartialUpdateLeaseModelMetadata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseModelMetadata);
    return this.http
      .patch<RestLeaseModelMetadata>(`${this.resourceUrl}/${this.getLeaseModelMetadataIdentifier(leaseModelMetadata)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLeaseModelMetadata>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLeaseModelMetadata[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLeaseModelMetadata[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getLeaseModelMetadataIdentifier(leaseModelMetadata: Pick<ILeaseModelMetadata, 'id'>): number {
    return leaseModelMetadata.id;
  }

  compareLeaseModelMetadata(o1: Pick<ILeaseModelMetadata, 'id'> | null, o2: Pick<ILeaseModelMetadata, 'id'> | null): boolean {
    return o1 && o2 ? this.getLeaseModelMetadataIdentifier(o1) === this.getLeaseModelMetadataIdentifier(o2) : o1 === o2;
  }

  addLeaseModelMetadataToCollectionIfMissing<Type extends Pick<ILeaseModelMetadata, 'id'>>(
    leaseModelMetadataCollection: Type[],
    ...leaseModelMetadataToCheck: (Type | null | undefined)[]
  ): Type[] {
    const leaseModelMetadata: Type[] = leaseModelMetadataToCheck.filter(isPresent);
    if (leaseModelMetadata.length > 0) {
      const leaseModelMetadataCollectionIdentifiers = leaseModelMetadataCollection.map(
        leaseModelMetadataItem => this.getLeaseModelMetadataIdentifier(leaseModelMetadataItem)!
      );
      const leaseModelMetadataToAdd = leaseModelMetadata.filter(leaseModelMetadataItem => {
        const leaseModelMetadataIdentifier = this.getLeaseModelMetadataIdentifier(leaseModelMetadataItem);
        if (leaseModelMetadataCollectionIdentifiers.includes(leaseModelMetadataIdentifier)) {
          return false;
        }
        leaseModelMetadataCollectionIdentifiers.push(leaseModelMetadataIdentifier);
        return true;
      });
      return [...leaseModelMetadataToAdd, ...leaseModelMetadataCollection];
    }
    return leaseModelMetadataCollection;
  }

  protected convertDateFromClient<T extends ILeaseModelMetadata | NewLeaseModelMetadata | PartialUpdateLeaseModelMetadata>(
    leaseModelMetadata: T
  ): RestOf<T> {
    return {
      ...leaseModelMetadata,
      commencementDate: leaseModelMetadata.commencementDate?.format(DATE_FORMAT) ?? null,
      terminalDate: leaseModelMetadata.terminalDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLeaseModelMetadata: RestLeaseModelMetadata): ILeaseModelMetadata {
    return {
      ...restLeaseModelMetadata,
      commencementDate: restLeaseModelMetadata.commencementDate ? dayjs(restLeaseModelMetadata.commencementDate) : undefined,
      terminalDate: restLeaseModelMetadata.terminalDate ? dayjs(restLeaseModelMetadata.terminalDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLeaseModelMetadata>): HttpResponse<ILeaseModelMetadata> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLeaseModelMetadata[]>): HttpResponse<ILeaseModelMetadata[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
