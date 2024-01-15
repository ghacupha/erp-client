///
/// Erp System - Mark X No 1 (Jehoiada Series) Client 1.7.1
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
import {
  ICrbSubmittingInstitutionCategory,
  getCrbSubmittingInstitutionCategoryIdentifier,
} from '../crb-submitting-institution-category.model';

export type EntityResponseType = HttpResponse<ICrbSubmittingInstitutionCategory>;
export type EntityArrayResponseType = HttpResponse<ICrbSubmittingInstitutionCategory[]>;

@Injectable({ providedIn: 'root' })
export class CrbSubmittingInstitutionCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-submitting-institution-categories');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-submitting-institution-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory): Observable<EntityResponseType> {
    return this.http.post<ICrbSubmittingInstitutionCategory>(this.resourceUrl, crbSubmittingInstitutionCategory, { observe: 'response' });
  }

  update(crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory): Observable<EntityResponseType> {
    return this.http.put<ICrbSubmittingInstitutionCategory>(
      `${this.resourceUrl}/${getCrbSubmittingInstitutionCategoryIdentifier(crbSubmittingInstitutionCategory) as number}`,
      crbSubmittingInstitutionCategory,
      { observe: 'response' }
    );
  }

  partialUpdate(crbSubmittingInstitutionCategory: ICrbSubmittingInstitutionCategory): Observable<EntityResponseType> {
    return this.http.patch<ICrbSubmittingInstitutionCategory>(
      `${this.resourceUrl}/${getCrbSubmittingInstitutionCategoryIdentifier(crbSubmittingInstitutionCategory) as number}`,
      crbSubmittingInstitutionCategory,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbSubmittingInstitutionCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbSubmittingInstitutionCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbSubmittingInstitutionCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addCrbSubmittingInstitutionCategoryToCollectionIfMissing(
    crbSubmittingInstitutionCategoryCollection: ICrbSubmittingInstitutionCategory[],
    ...crbSubmittingInstitutionCategoriesToCheck: (ICrbSubmittingInstitutionCategory | null | undefined)[]
  ): ICrbSubmittingInstitutionCategory[] {
    const crbSubmittingInstitutionCategories: ICrbSubmittingInstitutionCategory[] =
      crbSubmittingInstitutionCategoriesToCheck.filter(isPresent);
    if (crbSubmittingInstitutionCategories.length > 0) {
      const crbSubmittingInstitutionCategoryCollectionIdentifiers = crbSubmittingInstitutionCategoryCollection.map(
        crbSubmittingInstitutionCategoryItem => getCrbSubmittingInstitutionCategoryIdentifier(crbSubmittingInstitutionCategoryItem)!
      );
      const crbSubmittingInstitutionCategoriesToAdd = crbSubmittingInstitutionCategories.filter(crbSubmittingInstitutionCategoryItem => {
        const crbSubmittingInstitutionCategoryIdentifier = getCrbSubmittingInstitutionCategoryIdentifier(
          crbSubmittingInstitutionCategoryItem
        );
        if (
          crbSubmittingInstitutionCategoryIdentifier == null ||
          crbSubmittingInstitutionCategoryCollectionIdentifiers.includes(crbSubmittingInstitutionCategoryIdentifier)
        ) {
          return false;
        }
        crbSubmittingInstitutionCategoryCollectionIdentifiers.push(crbSubmittingInstitutionCategoryIdentifier);
        return true;
      });
      return [...crbSubmittingInstitutionCategoriesToAdd, ...crbSubmittingInstitutionCategoryCollection];
    }
    return crbSubmittingInstitutionCategoryCollection;
  }
}
