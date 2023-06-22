import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISecurityClearance, NewSecurityClearance } from '../security-clearance.model';

export type PartialUpdateSecurityClearance = Partial<ISecurityClearance> & Pick<ISecurityClearance, 'id'>;

export type EntityResponseType = HttpResponse<ISecurityClearance>;
export type EntityArrayResponseType = HttpResponse<ISecurityClearance[]>;

@Injectable({ providedIn: 'root' })
export class SecurityClearanceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/security-clearances');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/security-clearances');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(securityClearance: NewSecurityClearance): Observable<EntityResponseType> {
    return this.http.post<ISecurityClearance>(this.resourceUrl, securityClearance, { observe: 'response' });
  }

  update(securityClearance: ISecurityClearance): Observable<EntityResponseType> {
    return this.http.put<ISecurityClearance>(
      `${this.resourceUrl}/${this.getSecurityClearanceIdentifier(securityClearance)}`,
      securityClearance,
      { observe: 'response' }
    );
  }

  partialUpdate(securityClearance: PartialUpdateSecurityClearance): Observable<EntityResponseType> {
    return this.http.patch<ISecurityClearance>(
      `${this.resourceUrl}/${this.getSecurityClearanceIdentifier(securityClearance)}`,
      securityClearance,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISecurityClearance>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISecurityClearance[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISecurityClearance[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSecurityClearanceIdentifier(securityClearance: Pick<ISecurityClearance, 'id'>): number {
    return securityClearance.id;
  }

  compareSecurityClearance(o1: Pick<ISecurityClearance, 'id'> | null, o2: Pick<ISecurityClearance, 'id'> | null): boolean {
    return o1 && o2 ? this.getSecurityClearanceIdentifier(o1) === this.getSecurityClearanceIdentifier(o2) : o1 === o2;
  }

  addSecurityClearanceToCollectionIfMissing<Type extends Pick<ISecurityClearance, 'id'>>(
    securityClearanceCollection: Type[],
    ...securityClearancesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const securityClearances: Type[] = securityClearancesToCheck.filter(isPresent);
    if (securityClearances.length > 0) {
      const securityClearanceCollectionIdentifiers = securityClearanceCollection.map(
        securityClearanceItem => this.getSecurityClearanceIdentifier(securityClearanceItem)!
      );
      const securityClearancesToAdd = securityClearances.filter(securityClearanceItem => {
        const securityClearanceIdentifier = this.getSecurityClearanceIdentifier(securityClearanceItem);
        if (securityClearanceCollectionIdentifiers.includes(securityClearanceIdentifier)) {
          return false;
        }
        securityClearanceCollectionIdentifiers.push(securityClearanceIdentifier);
        return true;
      });
      return [...securityClearancesToAdd, ...securityClearanceCollection];
    }
    return securityClearanceCollection;
  }
}
