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
import { IPaymentRequisition, NewPaymentRequisition } from '../payment-requisition.model';

export type PartialUpdatePaymentRequisition = Partial<IPaymentRequisition> & Pick<IPaymentRequisition, 'id'>;

type RestOf<T extends IPaymentRequisition | NewPaymentRequisition> = Omit<T, 'receptionDate'> & {
  receptionDate?: string | null;
};

export type RestPaymentRequisition = RestOf<IPaymentRequisition>;

export type NewRestPaymentRequisition = RestOf<NewPaymentRequisition>;

export type PartialUpdateRestPaymentRequisition = RestOf<PartialUpdatePaymentRequisition>;

export type EntityResponseType = HttpResponse<IPaymentRequisition>;
export type EntityArrayResponseType = HttpResponse<IPaymentRequisition[]>;

@Injectable({ providedIn: 'root' })
export class PaymentRequisitionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payment-requisitions');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/payment-requisitions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(paymentRequisition: NewPaymentRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paymentRequisition);
    return this.http
      .post<RestPaymentRequisition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(paymentRequisition: IPaymentRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paymentRequisition);
    return this.http
      .put<RestPaymentRequisition>(`${this.resourceUrl}/${this.getPaymentRequisitionIdentifier(paymentRequisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(paymentRequisition: PartialUpdatePaymentRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paymentRequisition);
    return this.http
      .patch<RestPaymentRequisition>(`${this.resourceUrl}/${this.getPaymentRequisitionIdentifier(paymentRequisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPaymentRequisition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPaymentRequisition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPaymentRequisition[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getPaymentRequisitionIdentifier(paymentRequisition: Pick<IPaymentRequisition, 'id'>): number {
    return paymentRequisition.id;
  }

  comparePaymentRequisition(o1: Pick<IPaymentRequisition, 'id'> | null, o2: Pick<IPaymentRequisition, 'id'> | null): boolean {
    return o1 && o2 ? this.getPaymentRequisitionIdentifier(o1) === this.getPaymentRequisitionIdentifier(o2) : o1 === o2;
  }

  addPaymentRequisitionToCollectionIfMissing<Type extends Pick<IPaymentRequisition, 'id'>>(
    paymentRequisitionCollection: Type[],
    ...paymentRequisitionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const paymentRequisitions: Type[] = paymentRequisitionsToCheck.filter(isPresent);
    if (paymentRequisitions.length > 0) {
      const paymentRequisitionCollectionIdentifiers = paymentRequisitionCollection.map(
        paymentRequisitionItem => this.getPaymentRequisitionIdentifier(paymentRequisitionItem)!
      );
      const paymentRequisitionsToAdd = paymentRequisitions.filter(paymentRequisitionItem => {
        const paymentRequisitionIdentifier = this.getPaymentRequisitionIdentifier(paymentRequisitionItem);
        if (paymentRequisitionCollectionIdentifiers.includes(paymentRequisitionIdentifier)) {
          return false;
        }
        paymentRequisitionCollectionIdentifiers.push(paymentRequisitionIdentifier);
        return true;
      });
      return [...paymentRequisitionsToAdd, ...paymentRequisitionCollection];
    }
    return paymentRequisitionCollection;
  }

  protected convertDateFromClient<T extends IPaymentRequisition | NewPaymentRequisition | PartialUpdatePaymentRequisition>(
    paymentRequisition: T
  ): RestOf<T> {
    return {
      ...paymentRequisition,
      receptionDate: paymentRequisition.receptionDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restPaymentRequisition: RestPaymentRequisition): IPaymentRequisition {
    return {
      ...restPaymentRequisition,
      receptionDate: restPaymentRequisition.receptionDate ? dayjs(restPaymentRequisition.receptionDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPaymentRequisition>): HttpResponse<IPaymentRequisition> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPaymentRequisition[]>): HttpResponse<IPaymentRequisition[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
