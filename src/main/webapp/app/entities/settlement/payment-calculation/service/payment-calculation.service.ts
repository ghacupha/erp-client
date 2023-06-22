import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IPaymentCalculation, NewPaymentCalculation } from '../payment-calculation.model';

export type PartialUpdatePaymentCalculation = Partial<IPaymentCalculation> & Pick<IPaymentCalculation, 'id'>;

export type EntityResponseType = HttpResponse<IPaymentCalculation>;
export type EntityArrayResponseType = HttpResponse<IPaymentCalculation[]>;

@Injectable({ providedIn: 'root' })
export class PaymentCalculationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payment-calculations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/payment-calculations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(paymentCalculation: NewPaymentCalculation): Observable<EntityResponseType> {
    return this.http.post<IPaymentCalculation>(this.resourceUrl, paymentCalculation, { observe: 'response' });
  }

  update(paymentCalculation: IPaymentCalculation): Observable<EntityResponseType> {
    return this.http.put<IPaymentCalculation>(
      `${this.resourceUrl}/${this.getPaymentCalculationIdentifier(paymentCalculation)}`,
      paymentCalculation,
      { observe: 'response' }
    );
  }

  partialUpdate(paymentCalculation: PartialUpdatePaymentCalculation): Observable<EntityResponseType> {
    return this.http.patch<IPaymentCalculation>(
      `${this.resourceUrl}/${this.getPaymentCalculationIdentifier(paymentCalculation)}`,
      paymentCalculation,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaymentCalculation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentCalculation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentCalculation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getPaymentCalculationIdentifier(paymentCalculation: Pick<IPaymentCalculation, 'id'>): number {
    return paymentCalculation.id;
  }

  comparePaymentCalculation(o1: Pick<IPaymentCalculation, 'id'> | null, o2: Pick<IPaymentCalculation, 'id'> | null): boolean {
    return o1 && o2 ? this.getPaymentCalculationIdentifier(o1) === this.getPaymentCalculationIdentifier(o2) : o1 === o2;
  }

  addPaymentCalculationToCollectionIfMissing<Type extends Pick<IPaymentCalculation, 'id'>>(
    paymentCalculationCollection: Type[],
    ...paymentCalculationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const paymentCalculations: Type[] = paymentCalculationsToCheck.filter(isPresent);
    if (paymentCalculations.length > 0) {
      const paymentCalculationCollectionIdentifiers = paymentCalculationCollection.map(
        paymentCalculationItem => this.getPaymentCalculationIdentifier(paymentCalculationItem)!
      );
      const paymentCalculationsToAdd = paymentCalculations.filter(paymentCalculationItem => {
        const paymentCalculationIdentifier = this.getPaymentCalculationIdentifier(paymentCalculationItem);
        if (paymentCalculationCollectionIdentifiers.includes(paymentCalculationIdentifier)) {
          return false;
        }
        paymentCalculationCollectionIdentifiers.push(paymentCalculationIdentifier);
        return true;
      });
      return [...paymentCalculationsToAdd, ...paymentCalculationCollection];
    }
    return paymentCalculationCollection;
  }
}
