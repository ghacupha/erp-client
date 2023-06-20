import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IDealer, NewDealer } from '../dealer.model';

export type PartialUpdateDealer = Partial<IDealer> & Pick<IDealer, 'id'>;

export type EntityResponseType = HttpResponse<IDealer>;
export type EntityArrayResponseType = HttpResponse<IDealer[]>;

@Injectable({ providedIn: 'root' })
export class DealerService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dealers');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/dealers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(dealer: NewDealer): Observable<EntityResponseType> {
    return this.http.post<IDealer>(this.resourceUrl, dealer, { observe: 'response' });
  }

  update(dealer: IDealer): Observable<EntityResponseType> {
    return this.http.put<IDealer>(`${this.resourceUrl}/${this.getDealerIdentifier(dealer)}`, dealer, { observe: 'response' });
  }

  partialUpdate(dealer: PartialUpdateDealer): Observable<EntityResponseType> {
    return this.http.patch<IDealer>(`${this.resourceUrl}/${this.getDealerIdentifier(dealer)}`, dealer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDealer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDealer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDealer[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getDealerIdentifier(dealer: Pick<IDealer, 'id'>): number {
    return dealer.id;
  }

  compareDealer(o1: Pick<IDealer, 'id'> | null, o2: Pick<IDealer, 'id'> | null): boolean {
    return o1 && o2 ? this.getDealerIdentifier(o1) === this.getDealerIdentifier(o2) : o1 === o2;
  }

  addDealerToCollectionIfMissing<Type extends Pick<IDealer, 'id'>>(
    dealerCollection: Type[],
    ...dealersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dealers: Type[] = dealersToCheck.filter(isPresent);
    if (dealers.length > 0) {
      const dealerCollectionIdentifiers = dealerCollection.map(dealerItem => this.getDealerIdentifier(dealerItem)!);
      const dealersToAdd = dealers.filter(dealerItem => {
        const dealerIdentifier = this.getDealerIdentifier(dealerItem);
        if (dealerCollectionIdentifiers.includes(dealerIdentifier)) {
          return false;
        }
        dealerCollectionIdentifiers.push(dealerIdentifier);
        return true;
      });
      return [...dealersToAdd, ...dealerCollection];
    }
    return dealerCollection;
  }
}
