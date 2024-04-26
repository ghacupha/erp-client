///
/// Erp System - Mark X No 7 (Jehoiada Series) Client 1.7.5
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
import { ICrbCreditFacilityType, getCrbCreditFacilityTypeIdentifier } from '../crb-credit-facility-type.model';

export type EntityResponseType = HttpResponse<ICrbCreditFacilityType>;
export type EntityArrayResponseType = HttpResponse<ICrbCreditFacilityType[]>;

@Injectable({ providedIn: 'root' })
export class CrbCreditFacilityTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-credit-facility-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-credit-facility-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbCreditFacilityType: ICrbCreditFacilityType): Observable<EntityResponseType> {
    return this.http.post<ICrbCreditFacilityType>(this.resourceUrl, crbCreditFacilityType, { observe: 'response' });
  }

  update(crbCreditFacilityType: ICrbCreditFacilityType): Observable<EntityResponseType> {
    return this.http.put<ICrbCreditFacilityType>(
      `${this.resourceUrl}/${getCrbCreditFacilityTypeIdentifier(crbCreditFacilityType) as number}`,
      crbCreditFacilityType,
      { observe: 'response' }
    );
  }

  partialUpdate(crbCreditFacilityType: ICrbCreditFacilityType): Observable<EntityResponseType> {
    return this.http.patch<ICrbCreditFacilityType>(
      `${this.resourceUrl}/${getCrbCreditFacilityTypeIdentifier(crbCreditFacilityType) as number}`,
      crbCreditFacilityType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbCreditFacilityType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbCreditFacilityType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbCreditFacilityType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addCrbCreditFacilityTypeToCollectionIfMissing(
    crbCreditFacilityTypeCollection: ICrbCreditFacilityType[],
    ...crbCreditFacilityTypesToCheck: (ICrbCreditFacilityType | null | undefined)[]
  ): ICrbCreditFacilityType[] {
    const crbCreditFacilityTypes: ICrbCreditFacilityType[] = crbCreditFacilityTypesToCheck.filter(isPresent);
    if (crbCreditFacilityTypes.length > 0) {
      const crbCreditFacilityTypeCollectionIdentifiers = crbCreditFacilityTypeCollection.map(
        crbCreditFacilityTypeItem => getCrbCreditFacilityTypeIdentifier(crbCreditFacilityTypeItem)!
      );
      const crbCreditFacilityTypesToAdd = crbCreditFacilityTypes.filter(crbCreditFacilityTypeItem => {
        const crbCreditFacilityTypeIdentifier = getCrbCreditFacilityTypeIdentifier(crbCreditFacilityTypeItem);
        if (
          crbCreditFacilityTypeIdentifier == null ||
          crbCreditFacilityTypeCollectionIdentifiers.includes(crbCreditFacilityTypeIdentifier)
        ) {
          return false;
        }
        crbCreditFacilityTypeCollectionIdentifiers.push(crbCreditFacilityTypeIdentifier);
        return true;
      });
      return [...crbCreditFacilityTypesToAdd, ...crbCreditFacilityTypeCollection];
    }
    return crbCreditFacilityTypeCollection;
  }
}