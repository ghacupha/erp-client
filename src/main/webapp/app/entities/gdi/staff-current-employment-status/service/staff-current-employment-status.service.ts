import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IStaffCurrentEmploymentStatus, getStaffCurrentEmploymentStatusIdentifier } from '../staff-current-employment-status.model';

export type EntityResponseType = HttpResponse<IStaffCurrentEmploymentStatus>;
export type EntityArrayResponseType = HttpResponse<IStaffCurrentEmploymentStatus[]>;

@Injectable({ providedIn: 'root' })
export class StaffCurrentEmploymentStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/staff-current-employment-statuses');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/staff-current-employment-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(staffCurrentEmploymentStatus: IStaffCurrentEmploymentStatus): Observable<EntityResponseType> {
    return this.http.post<IStaffCurrentEmploymentStatus>(this.resourceUrl, staffCurrentEmploymentStatus, { observe: 'response' });
  }

  update(staffCurrentEmploymentStatus: IStaffCurrentEmploymentStatus): Observable<EntityResponseType> {
    return this.http.put<IStaffCurrentEmploymentStatus>(
      `${this.resourceUrl}/${getStaffCurrentEmploymentStatusIdentifier(staffCurrentEmploymentStatus) as number}`,
      staffCurrentEmploymentStatus,
      { observe: 'response' }
    );
  }

  partialUpdate(staffCurrentEmploymentStatus: IStaffCurrentEmploymentStatus): Observable<EntityResponseType> {
    return this.http.patch<IStaffCurrentEmploymentStatus>(
      `${this.resourceUrl}/${getStaffCurrentEmploymentStatusIdentifier(staffCurrentEmploymentStatus) as number}`,
      staffCurrentEmploymentStatus,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStaffCurrentEmploymentStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStaffCurrentEmploymentStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStaffCurrentEmploymentStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addStaffCurrentEmploymentStatusToCollectionIfMissing(
    staffCurrentEmploymentStatusCollection: IStaffCurrentEmploymentStatus[],
    ...staffCurrentEmploymentStatusesToCheck: (IStaffCurrentEmploymentStatus | null | undefined)[]
  ): IStaffCurrentEmploymentStatus[] {
    const staffCurrentEmploymentStatuses: IStaffCurrentEmploymentStatus[] = staffCurrentEmploymentStatusesToCheck.filter(isPresent);
    if (staffCurrentEmploymentStatuses.length > 0) {
      const staffCurrentEmploymentStatusCollectionIdentifiers = staffCurrentEmploymentStatusCollection.map(
        staffCurrentEmploymentStatusItem => getStaffCurrentEmploymentStatusIdentifier(staffCurrentEmploymentStatusItem)!
      );
      const staffCurrentEmploymentStatusesToAdd = staffCurrentEmploymentStatuses.filter(staffCurrentEmploymentStatusItem => {
        const staffCurrentEmploymentStatusIdentifier = getStaffCurrentEmploymentStatusIdentifier(staffCurrentEmploymentStatusItem);
        if (
          staffCurrentEmploymentStatusIdentifier == null ||
          staffCurrentEmploymentStatusCollectionIdentifiers.includes(staffCurrentEmploymentStatusIdentifier)
        ) {
          return false;
        }
        staffCurrentEmploymentStatusCollectionIdentifiers.push(staffCurrentEmploymentStatusIdentifier);
        return true;
      });
      return [...staffCurrentEmploymentStatusesToAdd, ...staffCurrentEmploymentStatusCollection];
    }
    return staffCurrentEmploymentStatusCollection;
  }
}
