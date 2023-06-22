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
import { ISignedPayment, NewSignedPayment } from '../signed-payment.model';

export type PartialUpdateSignedPayment = Partial<ISignedPayment> & Pick<ISignedPayment, 'id'>;

type RestOf<T extends ISignedPayment | NewSignedPayment> = Omit<T, 'transactionDate'> & {
  transactionDate?: string | null;
};

export type RestSignedPayment = RestOf<ISignedPayment>;

export type NewRestSignedPayment = RestOf<NewSignedPayment>;

export type PartialUpdateRestSignedPayment = RestOf<PartialUpdateSignedPayment>;

export type EntityResponseType = HttpResponse<ISignedPayment>;
export type EntityArrayResponseType = HttpResponse<ISignedPayment[]>;

@Injectable({ providedIn: 'root' })
export class SignedPaymentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/signed-payments');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/signed-payments');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(signedPayment: NewSignedPayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(signedPayment);
    return this.http
      .post<RestSignedPayment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(signedPayment: ISignedPayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(signedPayment);
    return this.http
      .put<RestSignedPayment>(`${this.resourceUrl}/${this.getSignedPaymentIdentifier(signedPayment)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(signedPayment: PartialUpdateSignedPayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(signedPayment);
    return this.http
      .patch<RestSignedPayment>(`${this.resourceUrl}/${this.getSignedPaymentIdentifier(signedPayment)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSignedPayment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSignedPayment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSignedPayment[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getSignedPaymentIdentifier(signedPayment: Pick<ISignedPayment, 'id'>): number {
    return signedPayment.id;
  }

  compareSignedPayment(o1: Pick<ISignedPayment, 'id'> | null, o2: Pick<ISignedPayment, 'id'> | null): boolean {
    return o1 && o2 ? this.getSignedPaymentIdentifier(o1) === this.getSignedPaymentIdentifier(o2) : o1 === o2;
  }

  addSignedPaymentToCollectionIfMissing<Type extends Pick<ISignedPayment, 'id'>>(
    signedPaymentCollection: Type[],
    ...signedPaymentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const signedPayments: Type[] = signedPaymentsToCheck.filter(isPresent);
    if (signedPayments.length > 0) {
      const signedPaymentCollectionIdentifiers = signedPaymentCollection.map(
        signedPaymentItem => this.getSignedPaymentIdentifier(signedPaymentItem)!
      );
      const signedPaymentsToAdd = signedPayments.filter(signedPaymentItem => {
        const signedPaymentIdentifier = this.getSignedPaymentIdentifier(signedPaymentItem);
        if (signedPaymentCollectionIdentifiers.includes(signedPaymentIdentifier)) {
          return false;
        }
        signedPaymentCollectionIdentifiers.push(signedPaymentIdentifier);
        return true;
      });
      return [...signedPaymentsToAdd, ...signedPaymentCollection];
    }
    return signedPaymentCollection;
  }

  protected convertDateFromClient<T extends ISignedPayment | NewSignedPayment | PartialUpdateSignedPayment>(signedPayment: T): RestOf<T> {
    return {
      ...signedPayment,
      transactionDate: signedPayment.transactionDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restSignedPayment: RestSignedPayment): ISignedPayment {
    return {
      ...restSignedPayment,
      transactionDate: restSignedPayment.transactionDate ? dayjs(restSignedPayment.transactionDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSignedPayment>): HttpResponse<ISignedPayment> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSignedPayment[]>): HttpResponse<ISignedPayment[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
