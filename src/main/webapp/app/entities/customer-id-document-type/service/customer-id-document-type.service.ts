import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICustomerIDDocumentType, NewCustomerIDDocumentType } from '../customer-id-document-type.model';

export type PartialUpdateCustomerIDDocumentType = Partial<ICustomerIDDocumentType> & Pick<ICustomerIDDocumentType, 'id'>;

export type EntityResponseType = HttpResponse<ICustomerIDDocumentType>;
export type EntityArrayResponseType = HttpResponse<ICustomerIDDocumentType[]>;

@Injectable({ providedIn: 'root' })
export class CustomerIDDocumentTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/customer-id-document-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/customer-id-document-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(customerIDDocumentType: NewCustomerIDDocumentType): Observable<EntityResponseType> {
    return this.http.post<ICustomerIDDocumentType>(this.resourceUrl, customerIDDocumentType, { observe: 'response' });
  }

  update(customerIDDocumentType: ICustomerIDDocumentType): Observable<EntityResponseType> {
    return this.http.put<ICustomerIDDocumentType>(
      `${this.resourceUrl}/${this.getCustomerIDDocumentTypeIdentifier(customerIDDocumentType)}`,
      customerIDDocumentType,
      { observe: 'response' }
    );
  }

  partialUpdate(customerIDDocumentType: PartialUpdateCustomerIDDocumentType): Observable<EntityResponseType> {
    return this.http.patch<ICustomerIDDocumentType>(
      `${this.resourceUrl}/${this.getCustomerIDDocumentTypeIdentifier(customerIDDocumentType)}`,
      customerIDDocumentType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerIDDocumentType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerIDDocumentType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerIDDocumentType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCustomerIDDocumentTypeIdentifier(customerIDDocumentType: Pick<ICustomerIDDocumentType, 'id'>): number {
    return customerIDDocumentType.id;
  }

  compareCustomerIDDocumentType(o1: Pick<ICustomerIDDocumentType, 'id'> | null, o2: Pick<ICustomerIDDocumentType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCustomerIDDocumentTypeIdentifier(o1) === this.getCustomerIDDocumentTypeIdentifier(o2) : o1 === o2;
  }

  addCustomerIDDocumentTypeToCollectionIfMissing<Type extends Pick<ICustomerIDDocumentType, 'id'>>(
    customerIDDocumentTypeCollection: Type[],
    ...customerIDDocumentTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const customerIDDocumentTypes: Type[] = customerIDDocumentTypesToCheck.filter(isPresent);
    if (customerIDDocumentTypes.length > 0) {
      const customerIDDocumentTypeCollectionIdentifiers = customerIDDocumentTypeCollection.map(
        customerIDDocumentTypeItem => this.getCustomerIDDocumentTypeIdentifier(customerIDDocumentTypeItem)!
      );
      const customerIDDocumentTypesToAdd = customerIDDocumentTypes.filter(customerIDDocumentTypeItem => {
        const customerIDDocumentTypeIdentifier = this.getCustomerIDDocumentTypeIdentifier(customerIDDocumentTypeItem);
        if (customerIDDocumentTypeCollectionIdentifiers.includes(customerIDDocumentTypeIdentifier)) {
          return false;
        }
        customerIDDocumentTypeCollectionIdentifiers.push(customerIDDocumentTypeIdentifier);
        return true;
      });
      return [...customerIDDocumentTypesToAdd, ...customerIDDocumentTypeCollection];
    }
    return customerIDDocumentTypeCollection;
  }
}
