import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IPaymentCategory, NewPaymentCategory } from '../payment-category.model';

export type PartialUpdatePaymentCategory = Partial<IPaymentCategory> & Pick<IPaymentCategory, 'id'>;

export type EntityResponseType = HttpResponse<IPaymentCategory>;
export type EntityArrayResponseType = HttpResponse<IPaymentCategory[]>;

@Injectable({ providedIn: 'root' })
export class PaymentCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payment-categories');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/payment-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(paymentCategory: NewPaymentCategory): Observable<EntityResponseType> {
    return this.http.post<IPaymentCategory>(this.resourceUrl, paymentCategory, { observe: 'response' });
  }

  update(paymentCategory: IPaymentCategory): Observable<EntityResponseType> {
    return this.http.put<IPaymentCategory>(`${this.resourceUrl}/${this.getPaymentCategoryIdentifier(paymentCategory)}`, paymentCategory, {
      observe: 'response',
    });
  }

  partialUpdate(paymentCategory: PartialUpdatePaymentCategory): Observable<EntityResponseType> {
    return this.http.patch<IPaymentCategory>(`${this.resourceUrl}/${this.getPaymentCategoryIdentifier(paymentCategory)}`, paymentCategory, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaymentCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getPaymentCategoryIdentifier(paymentCategory: Pick<IPaymentCategory, 'id'>): number {
    return paymentCategory.id;
  }

  comparePaymentCategory(o1: Pick<IPaymentCategory, 'id'> | null, o2: Pick<IPaymentCategory, 'id'> | null): boolean {
    return o1 && o2 ? this.getPaymentCategoryIdentifier(o1) === this.getPaymentCategoryIdentifier(o2) : o1 === o2;
  }

  addPaymentCategoryToCollectionIfMissing<Type extends Pick<IPaymentCategory, 'id'>>(
    paymentCategoryCollection: Type[],
    ...paymentCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const paymentCategories: Type[] = paymentCategoriesToCheck.filter(isPresent);
    if (paymentCategories.length > 0) {
      const paymentCategoryCollectionIdentifiers = paymentCategoryCollection.map(
        paymentCategoryItem => this.getPaymentCategoryIdentifier(paymentCategoryItem)!
      );
      const paymentCategoriesToAdd = paymentCategories.filter(paymentCategoryItem => {
        const paymentCategoryIdentifier = this.getPaymentCategoryIdentifier(paymentCategoryItem);
        if (paymentCategoryCollectionIdentifiers.includes(paymentCategoryIdentifier)) {
          return false;
        }
        paymentCategoryCollectionIdentifiers.push(paymentCategoryIdentifier);
        return true;
      });
      return [...paymentCategoriesToAdd, ...paymentCategoryCollection];
    }
    return paymentCategoryCollection;
  }
}
