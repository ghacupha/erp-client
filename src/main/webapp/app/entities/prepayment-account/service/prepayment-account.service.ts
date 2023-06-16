import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IPrepaymentAccount, NewPrepaymentAccount } from '../prepayment-account.model';

export type PartialUpdatePrepaymentAccount = Partial<IPrepaymentAccount> & Pick<IPrepaymentAccount, 'id'>;

export type EntityResponseType = HttpResponse<IPrepaymentAccount>;
export type EntityArrayResponseType = HttpResponse<IPrepaymentAccount[]>;

@Injectable({ providedIn: 'root' })
export class PrepaymentAccountService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/prepayment-accounts');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/prepayment-accounts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(prepaymentAccount: NewPrepaymentAccount): Observable<EntityResponseType> {
    return this.http.post<IPrepaymentAccount>(this.resourceUrl, prepaymentAccount, { observe: 'response' });
  }

  update(prepaymentAccount: IPrepaymentAccount): Observable<EntityResponseType> {
    return this.http.put<IPrepaymentAccount>(
      `${this.resourceUrl}/${this.getPrepaymentAccountIdentifier(prepaymentAccount)}`,
      prepaymentAccount,
      { observe: 'response' }
    );
  }

  partialUpdate(prepaymentAccount: PartialUpdatePrepaymentAccount): Observable<EntityResponseType> {
    return this.http.patch<IPrepaymentAccount>(
      `${this.resourceUrl}/${this.getPrepaymentAccountIdentifier(prepaymentAccount)}`,
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

  getPrepaymentAccountIdentifier(prepaymentAccount: Pick<IPrepaymentAccount, 'id'>): number {
    return prepaymentAccount.id;
  }

  comparePrepaymentAccount(o1: Pick<IPrepaymentAccount, 'id'> | null, o2: Pick<IPrepaymentAccount, 'id'> | null): boolean {
    return o1 && o2 ? this.getPrepaymentAccountIdentifier(o1) === this.getPrepaymentAccountIdentifier(o2) : o1 === o2;
  }

  addPrepaymentAccountToCollectionIfMissing<Type extends Pick<IPrepaymentAccount, 'id'>>(
    prepaymentAccountCollection: Type[],
    ...prepaymentAccountsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const prepaymentAccounts: Type[] = prepaymentAccountsToCheck.filter(isPresent);
    if (prepaymentAccounts.length > 0) {
      const prepaymentAccountCollectionIdentifiers = prepaymentAccountCollection.map(
        prepaymentAccountItem => this.getPrepaymentAccountIdentifier(prepaymentAccountItem)!
      );
      const prepaymentAccountsToAdd = prepaymentAccounts.filter(prepaymentAccountItem => {
        const prepaymentAccountIdentifier = this.getPrepaymentAccountIdentifier(prepaymentAccountItem);
        if (prepaymentAccountCollectionIdentifiers.includes(prepaymentAccountIdentifier)) {
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
