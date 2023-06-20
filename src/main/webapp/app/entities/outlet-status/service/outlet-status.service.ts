import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IOutletStatus, NewOutletStatus } from '../outlet-status.model';

export type PartialUpdateOutletStatus = Partial<IOutletStatus> & Pick<IOutletStatus, 'id'>;

export type EntityResponseType = HttpResponse<IOutletStatus>;
export type EntityArrayResponseType = HttpResponse<IOutletStatus[]>;

@Injectable({ providedIn: 'root' })
export class OutletStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/outlet-statuses');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/outlet-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(outletStatus: NewOutletStatus): Observable<EntityResponseType> {
    return this.http.post<IOutletStatus>(this.resourceUrl, outletStatus, { observe: 'response' });
  }

  update(outletStatus: IOutletStatus): Observable<EntityResponseType> {
    return this.http.put<IOutletStatus>(`${this.resourceUrl}/${this.getOutletStatusIdentifier(outletStatus)}`, outletStatus, {
      observe: 'response',
    });
  }

  partialUpdate(outletStatus: PartialUpdateOutletStatus): Observable<EntityResponseType> {
    return this.http.patch<IOutletStatus>(`${this.resourceUrl}/${this.getOutletStatusIdentifier(outletStatus)}`, outletStatus, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOutletStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOutletStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOutletStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getOutletStatusIdentifier(outletStatus: Pick<IOutletStatus, 'id'>): number {
    return outletStatus.id;
  }

  compareOutletStatus(o1: Pick<IOutletStatus, 'id'> | null, o2: Pick<IOutletStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getOutletStatusIdentifier(o1) === this.getOutletStatusIdentifier(o2) : o1 === o2;
  }

  addOutletStatusToCollectionIfMissing<Type extends Pick<IOutletStatus, 'id'>>(
    outletStatusCollection: Type[],
    ...outletStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const outletStatuses: Type[] = outletStatusesToCheck.filter(isPresent);
    if (outletStatuses.length > 0) {
      const outletStatusCollectionIdentifiers = outletStatusCollection.map(
        outletStatusItem => this.getOutletStatusIdentifier(outletStatusItem)!
      );
      const outletStatusesToAdd = outletStatuses.filter(outletStatusItem => {
        const outletStatusIdentifier = this.getOutletStatusIdentifier(outletStatusItem);
        if (outletStatusCollectionIdentifiers.includes(outletStatusIdentifier)) {
          return false;
        }
        outletStatusCollectionIdentifiers.push(outletStatusIdentifier);
        return true;
      });
      return [...outletStatusesToAdd, ...outletStatusCollection];
    }
    return outletStatusCollection;
  }
}
