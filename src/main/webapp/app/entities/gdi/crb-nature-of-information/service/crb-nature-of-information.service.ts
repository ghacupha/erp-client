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
import { ICrbNatureOfInformation, getCrbNatureOfInformationIdentifier } from '../crb-nature-of-information.model';

export type EntityResponseType = HttpResponse<ICrbNatureOfInformation>;
export type EntityArrayResponseType = HttpResponse<ICrbNatureOfInformation[]>;

@Injectable({ providedIn: 'root' })
export class CrbNatureOfInformationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-nature-of-informations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-nature-of-informations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbNatureOfInformation: ICrbNatureOfInformation): Observable<EntityResponseType> {
    return this.http.post<ICrbNatureOfInformation>(this.resourceUrl, crbNatureOfInformation, { observe: 'response' });
  }

  update(crbNatureOfInformation: ICrbNatureOfInformation): Observable<EntityResponseType> {
    return this.http.put<ICrbNatureOfInformation>(
      `${this.resourceUrl}/${getCrbNatureOfInformationIdentifier(crbNatureOfInformation) as number}`,
      crbNatureOfInformation,
      { observe: 'response' }
    );
  }

  partialUpdate(crbNatureOfInformation: ICrbNatureOfInformation): Observable<EntityResponseType> {
    return this.http.patch<ICrbNatureOfInformation>(
      `${this.resourceUrl}/${getCrbNatureOfInformationIdentifier(crbNatureOfInformation) as number}`,
      crbNatureOfInformation,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbNatureOfInformation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbNatureOfInformation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbNatureOfInformation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addCrbNatureOfInformationToCollectionIfMissing(
    crbNatureOfInformationCollection: ICrbNatureOfInformation[],
    ...crbNatureOfInformationsToCheck: (ICrbNatureOfInformation | null | undefined)[]
  ): ICrbNatureOfInformation[] {
    const crbNatureOfInformations: ICrbNatureOfInformation[] = crbNatureOfInformationsToCheck.filter(isPresent);
    if (crbNatureOfInformations.length > 0) {
      const crbNatureOfInformationCollectionIdentifiers = crbNatureOfInformationCollection.map(
        crbNatureOfInformationItem => getCrbNatureOfInformationIdentifier(crbNatureOfInformationItem)!
      );
      const crbNatureOfInformationsToAdd = crbNatureOfInformations.filter(crbNatureOfInformationItem => {
        const crbNatureOfInformationIdentifier = getCrbNatureOfInformationIdentifier(crbNatureOfInformationItem);
        if (
          crbNatureOfInformationIdentifier == null ||
          crbNatureOfInformationCollectionIdentifiers.includes(crbNatureOfInformationIdentifier)
        ) {
          return false;
        }
        crbNatureOfInformationCollectionIdentifiers.push(crbNatureOfInformationIdentifier);
        return true;
      });
      return [...crbNatureOfInformationsToAdd, ...crbNatureOfInformationCollection];
    }
    return crbNatureOfInformationCollection;
  }
}
