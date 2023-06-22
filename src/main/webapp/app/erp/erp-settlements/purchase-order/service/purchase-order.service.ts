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
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IPurchaseOrder, NewPurchaseOrder } from '../purchase-order.model';

export type PartialUpdatePurchaseOrder = Partial<IPurchaseOrder> & Pick<IPurchaseOrder, 'id'>;

type RestOf<T extends IPurchaseOrder | NewPurchaseOrder> = Omit<T, 'purchaseOrderDate'> & {
  purchaseOrderDate?: string | null;
};

export type RestPurchaseOrder = RestOf<IPurchaseOrder>;

export type NewRestPurchaseOrder = RestOf<NewPurchaseOrder>;

export type PartialUpdateRestPurchaseOrder = RestOf<PartialUpdatePurchaseOrder>;

export type EntityResponseType = HttpResponse<IPurchaseOrder>;
export type EntityArrayResponseType = HttpResponse<IPurchaseOrder[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payments/purchase-orders');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/payments/_search/purchase-orders');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(purchaseOrder: NewPurchaseOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchaseOrder);
    return this.http
      .post<RestPurchaseOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(purchaseOrder: IPurchaseOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchaseOrder);
    return this.http
      .put<RestPurchaseOrder>(`${this.resourceUrl}/${this.getPurchaseOrderIdentifier(purchaseOrder)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(purchaseOrder: PartialUpdatePurchaseOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchaseOrder);
    return this.http
      .patch<RestPurchaseOrder>(`${this.resourceUrl}/${this.getPurchaseOrderIdentifier(purchaseOrder)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPurchaseOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPurchaseOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPurchaseOrder[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getPurchaseOrderIdentifier(purchaseOrder: Pick<IPurchaseOrder, 'id'>): number {
    return purchaseOrder.id;
  }

  comparePurchaseOrder(o1: Pick<IPurchaseOrder, 'id'> | null, o2: Pick<IPurchaseOrder, 'id'> | null): boolean {
    return o1 && o2 ? this.getPurchaseOrderIdentifier(o1) === this.getPurchaseOrderIdentifier(o2) : o1 === o2;
  }

  addPurchaseOrderToCollectionIfMissing<Type extends Pick<IPurchaseOrder, 'id'>>(
    purchaseOrderCollection: Type[],
    ...purchaseOrdersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const purchaseOrders: Type[] = purchaseOrdersToCheck.filter(isPresent);
    if (purchaseOrders.length > 0) {
      const purchaseOrderCollectionIdentifiers = purchaseOrderCollection.map(
        purchaseOrderItem => this.getPurchaseOrderIdentifier(purchaseOrderItem)!
      );
      const purchaseOrdersToAdd = purchaseOrders.filter(purchaseOrderItem => {
        const purchaseOrderIdentifier = this.getPurchaseOrderIdentifier(purchaseOrderItem);
        if (purchaseOrderCollectionIdentifiers.includes(purchaseOrderIdentifier)) {
          return false;
        }
        purchaseOrderCollectionIdentifiers.push(purchaseOrderIdentifier);
        return true;
      });
      return [...purchaseOrdersToAdd, ...purchaseOrderCollection];
    }
    return purchaseOrderCollection;
  }

  protected convertDateFromClient<T extends IPurchaseOrder | NewPurchaseOrder | PartialUpdatePurchaseOrder>(purchaseOrder: T): RestOf<T> {
    return {
      ...purchaseOrder,
      purchaseOrderDate: purchaseOrder.purchaseOrderDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restPurchaseOrder: RestPurchaseOrder): IPurchaseOrder {
    return {
      ...restPurchaseOrder,
      purchaseOrderDate: restPurchaseOrder.purchaseOrderDate ? dayjs(restPurchaseOrder.purchaseOrderDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPurchaseOrder>): HttpResponse<IPurchaseOrder> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPurchaseOrder[]>): HttpResponse<IPurchaseOrder[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
