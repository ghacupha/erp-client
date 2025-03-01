///
/// Erp System - Mark X No 10 (Jehoiada Series) Client 1.7.8
/// Copyright © 2021 - 2024 Edwin Njeru (mailnjeru@gmail.com)
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
import { ITransactionAccountLedger, getTransactionAccountLedgerIdentifier } from '../transaction-account-ledger.model';

export type EntityResponseType = HttpResponse<ITransactionAccountLedger>;
export type EntityArrayResponseType = HttpResponse<ITransactionAccountLedger[]>;

@Injectable({ providedIn: 'root' })
export class TransactionAccountLedgerService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/transaction-account-ledgers');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/transaction-account-ledgers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(transactionAccountLedger: ITransactionAccountLedger): Observable<EntityResponseType> {
    return this.http.post<ITransactionAccountLedger>(this.resourceUrl, transactionAccountLedger, { observe: 'response' });
  }

  update(transactionAccountLedger: ITransactionAccountLedger): Observable<EntityResponseType> {
    return this.http.put<ITransactionAccountLedger>(
      `${this.resourceUrl}/${getTransactionAccountLedgerIdentifier(transactionAccountLedger) as number}`,
      transactionAccountLedger,
      { observe: 'response' }
    );
  }

  partialUpdate(transactionAccountLedger: ITransactionAccountLedger): Observable<EntityResponseType> {
    return this.http.patch<ITransactionAccountLedger>(
      `${this.resourceUrl}/${getTransactionAccountLedgerIdentifier(transactionAccountLedger) as number}`,
      transactionAccountLedger,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITransactionAccountLedger>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransactionAccountLedger[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransactionAccountLedger[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addTransactionAccountLedgerToCollectionIfMissing(
    transactionAccountLedgerCollection: ITransactionAccountLedger[],
    ...transactionAccountLedgersToCheck: (ITransactionAccountLedger | null | undefined)[]
  ): ITransactionAccountLedger[] {
    const transactionAccountLedgers: ITransactionAccountLedger[] = transactionAccountLedgersToCheck.filter(isPresent);
    if (transactionAccountLedgers.length > 0) {
      const transactionAccountLedgerCollectionIdentifiers = transactionAccountLedgerCollection.map(
        transactionAccountLedgerItem => getTransactionAccountLedgerIdentifier(transactionAccountLedgerItem)!
      );
      const transactionAccountLedgersToAdd = transactionAccountLedgers.filter(transactionAccountLedgerItem => {
        const transactionAccountLedgerIdentifier = getTransactionAccountLedgerIdentifier(transactionAccountLedgerItem);
        if (
          transactionAccountLedgerIdentifier == null ||
          transactionAccountLedgerCollectionIdentifiers.includes(transactionAccountLedgerIdentifier)
        ) {
          return false;
        }
        transactionAccountLedgerCollectionIdentifiers.push(transactionAccountLedgerIdentifier);
        return true;
      });
      return [...transactionAccountLedgersToAdd, ...transactionAccountLedgerCollection];
    }
    return transactionAccountLedgerCollection;
  }
}
