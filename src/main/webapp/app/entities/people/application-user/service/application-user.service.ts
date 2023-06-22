import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IApplicationUser, NewApplicationUser } from '../application-user.model';

export type PartialUpdateApplicationUser = Partial<IApplicationUser> & Pick<IApplicationUser, 'id'>;

export type EntityResponseType = HttpResponse<IApplicationUser>;
export type EntityArrayResponseType = HttpResponse<IApplicationUser[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationUserService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/application-users');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/application-users');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(applicationUser: NewApplicationUser): Observable<EntityResponseType> {
    return this.http.post<IApplicationUser>(this.resourceUrl, applicationUser, { observe: 'response' });
  }

  update(applicationUser: IApplicationUser): Observable<EntityResponseType> {
    return this.http.put<IApplicationUser>(`${this.resourceUrl}/${this.getApplicationUserIdentifier(applicationUser)}`, applicationUser, {
      observe: 'response',
    });
  }

  partialUpdate(applicationUser: PartialUpdateApplicationUser): Observable<EntityResponseType> {
    return this.http.patch<IApplicationUser>(`${this.resourceUrl}/${this.getApplicationUserIdentifier(applicationUser)}`, applicationUser, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApplicationUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApplicationUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApplicationUser[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getApplicationUserIdentifier(applicationUser: Pick<IApplicationUser, 'id'>): number {
    return applicationUser.id;
  }

  compareApplicationUser(o1: Pick<IApplicationUser, 'id'> | null, o2: Pick<IApplicationUser, 'id'> | null): boolean {
    return o1 && o2 ? this.getApplicationUserIdentifier(o1) === this.getApplicationUserIdentifier(o2) : o1 === o2;
  }

  addApplicationUserToCollectionIfMissing<Type extends Pick<IApplicationUser, 'id'>>(
    applicationUserCollection: Type[],
    ...applicationUsersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const applicationUsers: Type[] = applicationUsersToCheck.filter(isPresent);
    if (applicationUsers.length > 0) {
      const applicationUserCollectionIdentifiers = applicationUserCollection.map(
        applicationUserItem => this.getApplicationUserIdentifier(applicationUserItem)!
      );
      const applicationUsersToAdd = applicationUsers.filter(applicationUserItem => {
        const applicationUserIdentifier = this.getApplicationUserIdentifier(applicationUserItem);
        if (applicationUserCollectionIdentifiers.includes(applicationUserIdentifier)) {
          return false;
        }
        applicationUserCollectionIdentifiers.push(applicationUserIdentifier);
        return true;
      });
      return [...applicationUsersToAdd, ...applicationUserCollection];
    }
    return applicationUserCollection;
  }
}
