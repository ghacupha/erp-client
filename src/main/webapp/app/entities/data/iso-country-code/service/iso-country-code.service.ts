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
import { IIsoCountryCode, NewIsoCountryCode } from '../iso-country-code.model';

export type PartialUpdateIsoCountryCode = Partial<IIsoCountryCode> & Pick<IIsoCountryCode, 'id'>;

export type EntityResponseType = HttpResponse<IIsoCountryCode>;
export type EntityArrayResponseType = HttpResponse<IIsoCountryCode[]>;

@Injectable({ providedIn: 'root' })
export class IsoCountryCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/iso-country-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/iso-country-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(isoCountryCode: NewIsoCountryCode): Observable<EntityResponseType> {
    return this.http.post<IIsoCountryCode>(this.resourceUrl, isoCountryCode, { observe: 'response' });
  }

  update(isoCountryCode: IIsoCountryCode): Observable<EntityResponseType> {
    return this.http.put<IIsoCountryCode>(`${this.resourceUrl}/${this.getIsoCountryCodeIdentifier(isoCountryCode)}`, isoCountryCode, {
      observe: 'response',
    });
  }

  partialUpdate(isoCountryCode: PartialUpdateIsoCountryCode): Observable<EntityResponseType> {
    return this.http.patch<IIsoCountryCode>(`${this.resourceUrl}/${this.getIsoCountryCodeIdentifier(isoCountryCode)}`, isoCountryCode, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIsoCountryCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIsoCountryCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIsoCountryCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getIsoCountryCodeIdentifier(isoCountryCode: Pick<IIsoCountryCode, 'id'>): number {
    return isoCountryCode.id;
  }

  compareIsoCountryCode(o1: Pick<IIsoCountryCode, 'id'> | null, o2: Pick<IIsoCountryCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getIsoCountryCodeIdentifier(o1) === this.getIsoCountryCodeIdentifier(o2) : o1 === o2;
  }

  addIsoCountryCodeToCollectionIfMissing<Type extends Pick<IIsoCountryCode, 'id'>>(
    isoCountryCodeCollection: Type[],
    ...isoCountryCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const isoCountryCodes: Type[] = isoCountryCodesToCheck.filter(isPresent);
    if (isoCountryCodes.length > 0) {
      const isoCountryCodeCollectionIdentifiers = isoCountryCodeCollection.map(
        isoCountryCodeItem => this.getIsoCountryCodeIdentifier(isoCountryCodeItem)!
      );
      const isoCountryCodesToAdd = isoCountryCodes.filter(isoCountryCodeItem => {
        const isoCountryCodeIdentifier = this.getIsoCountryCodeIdentifier(isoCountryCodeItem);
        if (isoCountryCodeCollectionIdentifiers.includes(isoCountryCodeIdentifier)) {
          return false;
        }
        isoCountryCodeCollectionIdentifiers.push(isoCountryCodeIdentifier);
        return true;
      });
      return [...isoCountryCodesToAdd, ...isoCountryCodeCollection];
    }
    return isoCountryCodeCollection;
  }
}
