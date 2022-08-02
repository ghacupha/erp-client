import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IWorkInProgressRegistration, getWorkInProgressRegistrationIdentifier } from '../work-in-progress-registration.model';

export type EntityResponseType = HttpResponse<IWorkInProgressRegistration>;
export type EntityArrayResponseType = HttpResponse<IWorkInProgressRegistration[]>;

@Injectable({ providedIn: 'root' })
export class WorkInProgressRegistrationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset/work-in-progress-registrations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset/_search/work-in-progress-registrations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(workInProgressRegistration: IWorkInProgressRegistration): Observable<EntityResponseType> {
    return this.http.post<IWorkInProgressRegistration>(this.resourceUrl, workInProgressRegistration, { observe: 'response' });
  }

  update(workInProgressRegistration: IWorkInProgressRegistration): Observable<EntityResponseType> {
    return this.http.put<IWorkInProgressRegistration>(
      `${this.resourceUrl}/${getWorkInProgressRegistrationIdentifier(workInProgressRegistration) as number}`,
      workInProgressRegistration,
      { observe: 'response' }
    );
  }

  partialUpdate(workInProgressRegistration: IWorkInProgressRegistration): Observable<EntityResponseType> {
    return this.http.patch<IWorkInProgressRegistration>(
      `${this.resourceUrl}/${getWorkInProgressRegistrationIdentifier(workInProgressRegistration) as number}`,
      workInProgressRegistration,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWorkInProgressRegistration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorkInProgressRegistration[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorkInProgressRegistration[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addWorkInProgressRegistrationToCollectionIfMissing(
    workInProgressRegistrationCollection: IWorkInProgressRegistration[],
    ...workInProgressRegistrationsToCheck: (IWorkInProgressRegistration | null | undefined)[]
  ): IWorkInProgressRegistration[] {
    const workInProgressRegistrations: IWorkInProgressRegistration[] = workInProgressRegistrationsToCheck.filter(isPresent);
    if (workInProgressRegistrations.length > 0) {
      const workInProgressRegistrationCollectionIdentifiers = workInProgressRegistrationCollection.map(
        workInProgressRegistrationItem => getWorkInProgressRegistrationIdentifier(workInProgressRegistrationItem)!
      );
      const workInProgressRegistrationsToAdd = workInProgressRegistrations.filter(workInProgressRegistrationItem => {
        const workInProgressRegistrationIdentifier = getWorkInProgressRegistrationIdentifier(workInProgressRegistrationItem);
        if (
          workInProgressRegistrationIdentifier == null ||
          workInProgressRegistrationCollectionIdentifiers.includes(workInProgressRegistrationIdentifier)
        ) {
          return false;
        }
        workInProgressRegistrationCollectionIdentifiers.push(workInProgressRegistrationIdentifier);
        return true;
      });
      return [...workInProgressRegistrationsToAdd, ...workInProgressRegistrationCollection];
    }
    return workInProgressRegistrationCollection;
  }
}
