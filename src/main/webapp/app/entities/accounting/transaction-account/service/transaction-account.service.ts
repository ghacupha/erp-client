import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITransactionAccount, NewTransactionAccount } from '../transaction-account.model';

export type PartialUpdateTransactionAccount = Partial<ITransactionAccount> & Pick<ITransactionAccount, 'id'>;

export type EntityResponseType = HttpResponse<ITransactionAccount>;
export type EntityArrayResponseType = HttpResponse<ITransactionAccount[]>;

@Injectable({ providedIn: 'root' })
export class TransactionAccountService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/transaction-accounts');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/transaction-accounts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(transactionAccount: NewTransactionAccount): Observable<EntityResponseType> {
    return this.http.post<ITransactionAccount>(this.resourceUrl, transactionAccount, { observe: 'response' });
  }

  update(transactionAccount: ITransactionAccount): Observable<EntityResponseType> {
    return this.http.put<ITransactionAccount>(
      `${this.resourceUrl}/${this.getTransactionAccountIdentifier(transactionAccount)}`,
      transactionAccount,
      { observe: 'response' }
    );
  }

  partialUpdate(transactionAccount: PartialUpdateTransactionAccount): Observable<EntityResponseType> {
    return this.http.patch<ITransactionAccount>(
      `${this.resourceUrl}/${this.getTransactionAccountIdentifier(transactionAccount)}`,
      transactionAccount,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITransactionAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransactionAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransactionAccount[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getTransactionAccountIdentifier(transactionAccount: Pick<ITransactionAccount, 'id'>): number {
    return transactionAccount.id;
  }

  compareTransactionAccount(o1: Pick<ITransactionAccount, 'id'> | null, o2: Pick<ITransactionAccount, 'id'> | null): boolean {
    return o1 && o2 ? this.getTransactionAccountIdentifier(o1) === this.getTransactionAccountIdentifier(o2) : o1 === o2;
  }

  addTransactionAccountToCollectionIfMissing<Type extends Pick<ITransactionAccount, 'id'>>(
    transactionAccountCollection: Type[],
    ...transactionAccountsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const transactionAccounts: Type[] = transactionAccountsToCheck.filter(isPresent);
    if (transactionAccounts.length > 0) {
      const transactionAccountCollectionIdentifiers = transactionAccountCollection.map(
        transactionAccountItem => this.getTransactionAccountIdentifier(transactionAccountItem)!
      );
      const transactionAccountsToAdd = transactionAccounts.filter(transactionAccountItem => {
        const transactionAccountIdentifier = this.getTransactionAccountIdentifier(transactionAccountItem);
        if (transactionAccountCollectionIdentifiers.includes(transactionAccountIdentifier)) {
          return false;
        }
        transactionAccountCollectionIdentifiers.push(transactionAccountIdentifier);
        return true;
      });
      return [...transactionAccountsToAdd, ...transactionAccountCollection];
    }
    return transactionAccountCollection;
  }
}
