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
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/prepayment-accounts');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/prepayment-accounts');

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
