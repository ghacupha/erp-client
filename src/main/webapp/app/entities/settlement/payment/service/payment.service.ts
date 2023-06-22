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
import { IPayment, NewPayment } from '../payment.model';

export type PartialUpdatePayment = Partial<IPayment> & Pick<IPayment, 'id'>;

type RestOf<T extends IPayment | NewPayment> = Omit<T, 'paymentDate'> & {
  paymentDate?: string | null;
};

export type RestPayment = RestOf<IPayment>;

export type NewRestPayment = RestOf<NewPayment>;

export type PartialUpdateRestPayment = RestOf<PartialUpdatePayment>;

export type EntityResponseType = HttpResponse<IPayment>;
export type EntityArrayResponseType = HttpResponse<IPayment[]>;

@Injectable({ providedIn: 'root' })
export class PaymentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payments');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/payments');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(payment: NewPayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payment);
    return this.http
      .post<RestPayment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(payment: IPayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payment);
    return this.http
      .put<RestPayment>(`${this.resourceUrl}/${this.getPaymentIdentifier(payment)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(payment: PartialUpdatePayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(payment);
    return this.http
      .patch<RestPayment>(`${this.resourceUrl}/${this.getPaymentIdentifier(payment)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPayment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPayment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPayment[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getPaymentIdentifier(payment: Pick<IPayment, 'id'>): number {
    return payment.id;
  }

  comparePayment(o1: Pick<IPayment, 'id'> | null, o2: Pick<IPayment, 'id'> | null): boolean {
    return o1 && o2 ? this.getPaymentIdentifier(o1) === this.getPaymentIdentifier(o2) : o1 === o2;
  }

  addPaymentToCollectionIfMissing<Type extends Pick<IPayment, 'id'>>(
    paymentCollection: Type[],
    ...paymentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const payments: Type[] = paymentsToCheck.filter(isPresent);
    if (payments.length > 0) {
      const paymentCollectionIdentifiers = paymentCollection.map(paymentItem => this.getPaymentIdentifier(paymentItem)!);
      const paymentsToAdd = payments.filter(paymentItem => {
        const paymentIdentifier = this.getPaymentIdentifier(paymentItem);
        if (paymentCollectionIdentifiers.includes(paymentIdentifier)) {
          return false;
        }
        paymentCollectionIdentifiers.push(paymentIdentifier);
        return true;
      });
      return [...paymentsToAdd, ...paymentCollection];
    }
    return paymentCollection;
  }

  protected convertDateFromClient<T extends IPayment | NewPayment | PartialUpdatePayment>(payment: T): RestOf<T> {
    return {
      ...payment,
      paymentDate: payment.paymentDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restPayment: RestPayment): IPayment {
    return {
      ...restPayment,
      paymentDate: restPayment.paymentDate ? dayjs(restPayment.paymentDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPayment>): HttpResponse<IPayment> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPayment[]>): HttpResponse<IPayment[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
