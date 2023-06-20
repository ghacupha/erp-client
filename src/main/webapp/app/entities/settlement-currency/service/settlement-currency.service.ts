import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISettlementCurrency, NewSettlementCurrency } from '../settlement-currency.model';

export type PartialUpdateSettlementCurrency = Partial<ISettlementCurrency> & Pick<ISettlementCurrency, 'id'>;

export type EntityResponseType = HttpResponse<ISettlementCurrency>;
export type EntityArrayResponseType = HttpResponse<ISettlementCurrency[]>;

@Injectable({ providedIn: 'root' })
export class SettlementCurrencyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/settlement-currencies');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/settlement-currencies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(settlementCurrency: NewSettlementCurrency): Observable<EntityResponseType> {
    return this.http.post<ISettlementCurrency>(this.resourceUrl, settlementCurrency, { observe: 'response' });
  }

  update(settlementCurrency: ISettlementCurrency): Observable<EntityResponseType> {
    return this.http.put<ISettlementCurrency>(
      `${this.resourceUrl}/${this.getSettlementCurrencyIdentifier(settlementCurrency)}`,
      settlementCurrency,
      { observe: 'response' }
    );
  }

  partialUpdate(settlementCurrency: PartialUpdateSettlementCurrency): Observable<EntityResponseType> {
    return this.http.patch<ISettlementCurrency>(
      `${this.resourceUrl}/${this.getSettlementCurrencyIdentifier(settlementCurrency)}`,
      settlementCurrency,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISettlementCurrency>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISettlementCurrency[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISettlementCurrency[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSettlementCurrencyIdentifier(settlementCurrency: Pick<ISettlementCurrency, 'id'>): number {
    return settlementCurrency.id;
  }

  compareSettlementCurrency(o1: Pick<ISettlementCurrency, 'id'> | null, o2: Pick<ISettlementCurrency, 'id'> | null): boolean {
    return o1 && o2 ? this.getSettlementCurrencyIdentifier(o1) === this.getSettlementCurrencyIdentifier(o2) : o1 === o2;
  }

  addSettlementCurrencyToCollectionIfMissing<Type extends Pick<ISettlementCurrency, 'id'>>(
    settlementCurrencyCollection: Type[],
    ...settlementCurrenciesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const settlementCurrencies: Type[] = settlementCurrenciesToCheck.filter(isPresent);
    if (settlementCurrencies.length > 0) {
      const settlementCurrencyCollectionIdentifiers = settlementCurrencyCollection.map(
        settlementCurrencyItem => this.getSettlementCurrencyIdentifier(settlementCurrencyItem)!
      );
      const settlementCurrenciesToAdd = settlementCurrencies.filter(settlementCurrencyItem => {
        const settlementCurrencyIdentifier = this.getSettlementCurrencyIdentifier(settlementCurrencyItem);
        if (settlementCurrencyCollectionIdentifiers.includes(settlementCurrencyIdentifier)) {
          return false;
        }
        settlementCurrencyCollectionIdentifiers.push(settlementCurrencyIdentifier);
        return true;
      });
      return [...settlementCurrenciesToAdd, ...settlementCurrencyCollection];
    }
    return settlementCurrencyCollection;
  }
}
