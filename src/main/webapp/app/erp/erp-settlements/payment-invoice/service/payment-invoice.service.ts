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
import { IPaymentInvoice, NewPaymentInvoice } from '../payment-invoice.model';

export type PartialUpdatePaymentInvoice = Partial<IPaymentInvoice> & Pick<IPaymentInvoice, 'id'>;

type RestOf<T extends IPaymentInvoice | NewPaymentInvoice> = Omit<T, 'invoiceDate'> & {
  invoiceDate?: string | null;
};

export type RestPaymentInvoice = RestOf<IPaymentInvoice>;

export type NewRestPaymentInvoice = RestOf<NewPaymentInvoice>;

export type PartialUpdateRestPaymentInvoice = RestOf<PartialUpdatePaymentInvoice>;

export type EntityResponseType = HttpResponse<IPaymentInvoice>;
export type EntityArrayResponseType = HttpResponse<IPaymentInvoice[]>;

@Injectable({ providedIn: 'root' })
export class PaymentInvoiceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payments/payment-invoices');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/payments/_search/payment-invoices');
  protected resourceSearchIndexUrl = this.applicationConfigService.getEndpointFor('api/payments/payment-invoices/elasticsearch/re-index');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(paymentInvoice: NewPaymentInvoice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paymentInvoice);
    return this.http
      .post<RestPaymentInvoice>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(paymentInvoice: IPaymentInvoice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paymentInvoice);
    return this.http
      .put<RestPaymentInvoice>(`${this.resourceUrl}/${this.getPaymentInvoiceIdentifier(paymentInvoice)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(paymentInvoice: PartialUpdatePaymentInvoice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paymentInvoice);
    return this.http
      .patch<RestPaymentInvoice>(`${this.resourceUrl}/${this.getPaymentInvoiceIdentifier(paymentInvoice)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPaymentInvoice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPaymentInvoice[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPaymentInvoice[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getPaymentInvoiceIdentifier(paymentInvoice: Pick<IPaymentInvoice, 'id'>): number {
    return paymentInvoice.id;
  }

  comparePaymentInvoice(o1: Pick<IPaymentInvoice, 'id'> | null, o2: Pick<IPaymentInvoice, 'id'> | null): boolean {
    return o1 && o2 ? this.getPaymentInvoiceIdentifier(o1) === this.getPaymentInvoiceIdentifier(o2) : o1 === o2;
  }

  addPaymentInvoiceToCollectionIfMissing<Type extends Pick<IPaymentInvoice, 'id'>>(
    paymentInvoiceCollection: Type[],
    ...paymentInvoicesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const paymentInvoices: Type[] = paymentInvoicesToCheck.filter(isPresent);
    if (paymentInvoices.length > 0) {
      const paymentInvoiceCollectionIdentifiers = paymentInvoiceCollection.map(
        paymentInvoiceItem => this.getPaymentInvoiceIdentifier(paymentInvoiceItem)!
      );
      const paymentInvoicesToAdd = paymentInvoices.filter(paymentInvoiceItem => {
        const paymentInvoiceIdentifier = this.getPaymentInvoiceIdentifier(paymentInvoiceItem);
        if (paymentInvoiceCollectionIdentifiers.includes(paymentInvoiceIdentifier)) {
          return false;
        }
        paymentInvoiceCollectionIdentifiers.push(paymentInvoiceIdentifier);
        return true;
      });
      return [...paymentInvoicesToAdd, ...paymentInvoiceCollection];
    }
    return paymentInvoiceCollection;
  }

  protected convertDateFromClient<T extends IPaymentInvoice | NewPaymentInvoice | PartialUpdatePaymentInvoice>(
    paymentInvoice: T
  ): RestOf<T> {
    return {
      ...paymentInvoice,
      invoiceDate: paymentInvoice.invoiceDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restPaymentInvoice: RestPaymentInvoice): IPaymentInvoice {
    return {
      ...restPaymentInvoice,
      invoiceDate: restPaymentInvoice.invoiceDate ? dayjs(restPaymentInvoice.invoiceDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPaymentInvoice>): HttpResponse<IPaymentInvoice> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPaymentInvoice[]>): HttpResponse<IPaymentInvoice[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
