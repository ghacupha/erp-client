import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITaxReference, getTaxReferenceIdentifier } from '../models/tax-reference.model';
import { ErpCommonModule } from '../erp-common.module';

export type EntityResponseType = HttpResponse<ITaxReference>;
export type EntityArrayResponseType = HttpResponse<ITaxReference[]>;

@Injectable({ providedIn: ErpCommonModule })
export class TaxReferenceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payments/tax-references');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/payments/_search/tax-references');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(taxReference: ITaxReference): Observable<EntityResponseType> {
    return this.http.post<ITaxReference>(this.resourceUrl, taxReference, { observe: 'response' });
  }

  update(taxReference: ITaxReference): Observable<EntityResponseType> {
    return this.http.put<ITaxReference>(`${this.resourceUrl}/${getTaxReferenceIdentifier(taxReference) as number}`, taxReference, {
      observe: 'response',
    });
  }

  partialUpdate(taxReference: ITaxReference): Observable<EntityResponseType> {
    return this.http.patch<ITaxReference>(`${this.resourceUrl}/${getTaxReferenceIdentifier(taxReference) as number}`, taxReference, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaxReference>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaxReference[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaxReference[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addTaxReferenceToCollectionIfMissing(
    taxReferenceCollection: ITaxReference[],
    ...taxReferencesToCheck: (ITaxReference | null | undefined)[]
  ): ITaxReference[] {
    const taxReferences: ITaxReference[] = taxReferencesToCheck.filter(isPresent);
    if (taxReferences.length > 0) {
      const taxReferenceCollectionIdentifiers = taxReferenceCollection.map(
        taxReferenceItem => getTaxReferenceIdentifier(taxReferenceItem)!
      );
      const taxReferencesToAdd = taxReferences.filter(taxReferenceItem => {
        const taxReferenceIdentifier = getTaxReferenceIdentifier(taxReferenceItem);
        if (taxReferenceIdentifier == null || taxReferenceCollectionIdentifiers.includes(taxReferenceIdentifier)) {
          return false;
        }
        taxReferenceCollectionIdentifiers.push(taxReferenceIdentifier);
        return true;
      });
      return [...taxReferencesToAdd, ...taxReferenceCollection];
    }
    return taxReferenceCollection;
  }
}
