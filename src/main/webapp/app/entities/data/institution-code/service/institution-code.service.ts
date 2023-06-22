///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
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
import { IInstitutionCode, NewInstitutionCode } from '../institution-code.model';

export type PartialUpdateInstitutionCode = Partial<IInstitutionCode> & Pick<IInstitutionCode, 'id'>;

export type EntityResponseType = HttpResponse<IInstitutionCode>;
export type EntityArrayResponseType = HttpResponse<IInstitutionCode[]>;

@Injectable({ providedIn: 'root' })
export class InstitutionCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/institution-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/institution-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(institutionCode: NewInstitutionCode): Observable<EntityResponseType> {
    return this.http.post<IInstitutionCode>(this.resourceUrl, institutionCode, { observe: 'response' });
  }

  update(institutionCode: IInstitutionCode): Observable<EntityResponseType> {
    return this.http.put<IInstitutionCode>(`${this.resourceUrl}/${this.getInstitutionCodeIdentifier(institutionCode)}`, institutionCode, {
      observe: 'response',
    });
  }

  partialUpdate(institutionCode: PartialUpdateInstitutionCode): Observable<EntityResponseType> {
    return this.http.patch<IInstitutionCode>(`${this.resourceUrl}/${this.getInstitutionCodeIdentifier(institutionCode)}`, institutionCode, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInstitutionCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstitutionCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstitutionCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getInstitutionCodeIdentifier(institutionCode: Pick<IInstitutionCode, 'id'>): number {
    return institutionCode.id;
  }

  compareInstitutionCode(o1: Pick<IInstitutionCode, 'id'> | null, o2: Pick<IInstitutionCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getInstitutionCodeIdentifier(o1) === this.getInstitutionCodeIdentifier(o2) : o1 === o2;
  }

  addInstitutionCodeToCollectionIfMissing<Type extends Pick<IInstitutionCode, 'id'>>(
    institutionCodeCollection: Type[],
    ...institutionCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const institutionCodes: Type[] = institutionCodesToCheck.filter(isPresent);
    if (institutionCodes.length > 0) {
      const institutionCodeCollectionIdentifiers = institutionCodeCollection.map(
        institutionCodeItem => this.getInstitutionCodeIdentifier(institutionCodeItem)!
      );
      const institutionCodesToAdd = institutionCodes.filter(institutionCodeItem => {
        const institutionCodeIdentifier = this.getInstitutionCodeIdentifier(institutionCodeItem);
        if (institutionCodeCollectionIdentifiers.includes(institutionCodeIdentifier)) {
          return false;
        }
        institutionCodeCollectionIdentifiers.push(institutionCodeIdentifier);
        return true;
      });
      return [...institutionCodesToAdd, ...institutionCodeCollection];
    }
    return institutionCodeCollection;
  }
}
