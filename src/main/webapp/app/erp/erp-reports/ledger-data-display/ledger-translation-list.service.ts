///
/// Erp System - Mark VI No 1 (Phoebe Series) Client 1.5.3
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
import { SearchWithPagination } from '../../../core/request/request.model';
import { createRequestOption } from '../../../core/request/request-util';
import { ILedgerTranslationList } from './ledger-translation-list.model';

type EntityResponseType = HttpResponse<ILedgerTranslationList>;
type EntityArrayResponseType = HttpResponse<ILedgerTranslationList[]>;

@Injectable({ providedIn: 'root' })
export class LedgerTranslationListService {
  public resourceUrl = SERVER_API_URL + 'api/ledger-translation-lists';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/ledger-translation-lists';

  constructor(protected http: HttpClient) {}

  create(ledgerTranslationList: ILedgerTranslationList): Observable<EntityResponseType> {
    return this.http.post<ILedgerTranslationList>(this.resourceUrl, ledgerTranslationList, { observe: 'response' });
  }

  update(ledgerTranslationList: ILedgerTranslationList): Observable<EntityResponseType> {
    return this.http.put<ILedgerTranslationList>(this.resourceUrl, ledgerTranslationList, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILedgerTranslationList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILedgerTranslationList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILedgerTranslationList[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
