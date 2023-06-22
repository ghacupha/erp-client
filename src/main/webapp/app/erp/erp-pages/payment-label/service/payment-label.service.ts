import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IPaymentLabel, NewPaymentLabel } from '../payment-label.model';

export type PartialUpdatePaymentLabel = Partial<IPaymentLabel> & Pick<IPaymentLabel, 'id'>;

export type EntityResponseType = HttpResponse<IPaymentLabel>;
export type EntityArrayResponseType = HttpResponse<IPaymentLabel[]>;

@Injectable({ providedIn: 'root' })
export class PaymentLabelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payments/payment-labels');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/payments/_search/payment-labels');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(paymentLabel: NewPaymentLabel): Observable<EntityResponseType> {
    return this.http.post<IPaymentLabel>(this.resourceUrl, paymentLabel, { observe: 'response' });
  }

  update(paymentLabel: IPaymentLabel): Observable<EntityResponseType> {
    return this.http.put<IPaymentLabel>(`${this.resourceUrl}/${this.getPaymentLabelIdentifier(paymentLabel)}`, paymentLabel, {
      observe: 'response',
    });
  }

  partialUpdate(paymentLabel: PartialUpdatePaymentLabel): Observable<EntityResponseType> {
    return this.http.patch<IPaymentLabel>(`${this.resourceUrl}/${this.getPaymentLabelIdentifier(paymentLabel)}`, paymentLabel, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaymentLabel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentLabel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentLabel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getPaymentLabelIdentifier(paymentLabel: Pick<IPaymentLabel, 'id'>): number {
    return paymentLabel.id;
  }

  comparePaymentLabel(o1: Pick<IPaymentLabel, 'id'> | null, o2: Pick<IPaymentLabel, 'id'> | null): boolean {
    return o1 && o2 ? this.getPaymentLabelIdentifier(o1) === this.getPaymentLabelIdentifier(o2) : o1 === o2;
  }

  addPaymentLabelToCollectionIfMissing<Type extends Pick<IPaymentLabel, 'id'>>(
    paymentLabelCollection: Type[],
    ...paymentLabelsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const paymentLabels: Type[] = paymentLabelsToCheck.filter(isPresent);
    if (paymentLabels.length > 0) {
      const paymentLabelCollectionIdentifiers = paymentLabelCollection.map(
        paymentLabelItem => this.getPaymentLabelIdentifier(paymentLabelItem)!
      );
      const paymentLabelsToAdd = paymentLabels.filter(paymentLabelItem => {
        const paymentLabelIdentifier = this.getPaymentLabelIdentifier(paymentLabelItem);
        if (paymentLabelCollectionIdentifiers.includes(paymentLabelIdentifier)) {
          return false;
        }
        paymentLabelCollectionIdentifiers.push(paymentLabelIdentifier);
        return true;
      });
      return [...paymentLabelsToAdd, ...paymentLabelCollection];
    }
    return paymentLabelCollection;
  }
}
