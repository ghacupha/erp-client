///
/// Erp System - Mark III No 16 (Caleb Series) Client 1.3.9
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
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../../core/request/request-util';
import { ILedgerTranslationList } from './ledger-translation-list.model';
import { ApplicationConfigService } from '../../../core/config/application-config.service';

type EntityArrayResponseType = HttpResponse<ILedgerTranslationList[]>;

/**
 * Eventually this service will be able to do the dogs work of generating entire list of the whole
 * data set from the backend
 */
@Injectable({
  providedIn: 'root',
})
export class LedgerDtViewService {
  // TODO Create custom api for pulling all data
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/accounts/transaction-accounts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILedgerTranslationList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
