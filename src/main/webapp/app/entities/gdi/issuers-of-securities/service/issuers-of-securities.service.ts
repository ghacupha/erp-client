///
/// Erp System - Mark VII No 5 (Gideon Series) Client 1.5.7
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IIssuersOfSecurities, getIssuersOfSecuritiesIdentifier } from '../issuers-of-securities.model';

export type EntityResponseType = HttpResponse<IIssuersOfSecurities>;
export type EntityArrayResponseType = HttpResponse<IIssuersOfSecurities[]>;

@Injectable({ providedIn: 'root' })
export class IssuersOfSecuritiesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/issuers-of-securities');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/issuers-of-securities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(issuersOfSecurities: IIssuersOfSecurities): Observable<EntityResponseType> {
    return this.http.post<IIssuersOfSecurities>(this.resourceUrl, issuersOfSecurities, { observe: 'response' });
  }

  update(issuersOfSecurities: IIssuersOfSecurities): Observable<EntityResponseType> {
    return this.http.put<IIssuersOfSecurities>(
      `${this.resourceUrl}/${getIssuersOfSecuritiesIdentifier(issuersOfSecurities) as number}`,
      issuersOfSecurities,
      { observe: 'response' }
    );
  }

  partialUpdate(issuersOfSecurities: IIssuersOfSecurities): Observable<EntityResponseType> {
    return this.http.patch<IIssuersOfSecurities>(
      `${this.resourceUrl}/${getIssuersOfSecuritiesIdentifier(issuersOfSecurities) as number}`,
      issuersOfSecurities,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIssuersOfSecurities>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIssuersOfSecurities[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIssuersOfSecurities[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addIssuersOfSecuritiesToCollectionIfMissing(
    issuersOfSecuritiesCollection: IIssuersOfSecurities[],
    ...issuersOfSecuritiesToCheck: (IIssuersOfSecurities | null | undefined)[]
  ): IIssuersOfSecurities[] {
    const issuersOfSecurities: IIssuersOfSecurities[] = issuersOfSecuritiesToCheck.filter(isPresent);
    if (issuersOfSecurities.length > 0) {
      const issuersOfSecuritiesCollectionIdentifiers = issuersOfSecuritiesCollection.map(
        issuersOfSecuritiesItem => getIssuersOfSecuritiesIdentifier(issuersOfSecuritiesItem)!
      );
      const issuersOfSecuritiesToAdd = issuersOfSecurities.filter(issuersOfSecuritiesItem => {
        const issuersOfSecuritiesIdentifier = getIssuersOfSecuritiesIdentifier(issuersOfSecuritiesItem);
        if (issuersOfSecuritiesIdentifier == null || issuersOfSecuritiesCollectionIdentifiers.includes(issuersOfSecuritiesIdentifier)) {
          return false;
        }
        issuersOfSecuritiesCollectionIdentifiers.push(issuersOfSecuritiesIdentifier);
        return true;
      });
      return [...issuersOfSecuritiesToAdd, ...issuersOfSecuritiesCollection];
    }
    return issuersOfSecuritiesCollection;
  }
}
