///
/// Erp System - Mark III No 12 (Caleb Series) Client 1.2.9
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
import { IPrepaymentAccount, getPrepaymentAccountIdentifier } from '../prepayment-account.model';

export type EntityResponseType = HttpResponse<IPrepaymentAccount>;
export type EntityArrayResponseType = HttpResponse<IPrepaymentAccount[]>;

@Injectable({ providedIn: 'root' })
export class PrepaymentAccountService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/prepayments/prepayment-accounts');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/prepayments/_search/prepayment-accounts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(prepaymentAccount: IPrepaymentAccount): Observable<EntityResponseType> {
    return this.http.post<IPrepaymentAccount>(this.resourceUrl, prepaymentAccount, { observe: 'response' });
  }

  update(prepaymentAccount: IPrepaymentAccount): Observable<EntityResponseType> {
    return this.http.put<IPrepaymentAccount>(
      `${this.resourceUrl}/${getPrepaymentAccountIdentifier(prepaymentAccount) as number}`,
      prepaymentAccount,
      { observe: 'response' }
    );
  }

  partialUpdate(prepaymentAccount: IPrepaymentAccount): Observable<EntityResponseType> {
    return this.http.patch<IPrepaymentAccount>(
      `${this.resourceUrl}/${getPrepaymentAccountIdentifier(prepaymentAccount) as number}`,
      prepaymentAccount,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrepaymentAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrepaymentAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrepaymentAccount[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addPrepaymentAccountToCollectionIfMissing(
    prepaymentAccountCollection: IPrepaymentAccount[],
    ...prepaymentAccountsToCheck: (IPrepaymentAccount | null | undefined)[]
  ): IPrepaymentAccount[] {
    const prepaymentAccounts: IPrepaymentAccount[] = prepaymentAccountsToCheck.filter(isPresent);
    if (prepaymentAccounts.length > 0) {
      const prepaymentAccountCollectionIdentifiers = prepaymentAccountCollection.map(
        prepaymentAccountItem => getPrepaymentAccountIdentifier(prepaymentAccountItem)!
      );
      const prepaymentAccountsToAdd = prepaymentAccounts.filter(prepaymentAccountItem => {
        const prepaymentAccountIdentifier = getPrepaymentAccountIdentifier(prepaymentAccountItem);
        if (prepaymentAccountIdentifier == null || prepaymentAccountCollectionIdentifiers.includes(prepaymentAccountIdentifier)) {
          return false;
        }
        prepaymentAccountCollectionIdentifiers.push(prepaymentAccountIdentifier);
        return true;
      });
      return [...prepaymentAccountsToAdd, ...prepaymentAccountCollection];
    }
    return prepaymentAccountCollection;
  }
}
