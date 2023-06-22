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

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITaxReference, NewTaxReference } from '../tax-reference.model';

export type PartialUpdateTaxReference = Partial<ITaxReference> & Pick<ITaxReference, 'id'>;

export type EntityResponseType = HttpResponse<ITaxReference>;
export type EntityArrayResponseType = HttpResponse<ITaxReference[]>;

@Injectable({ providedIn: 'root' })
export class TaxReferenceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tax-references');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/tax-references');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(taxReference: NewTaxReference): Observable<EntityResponseType> {
    return this.http.post<ITaxReference>(this.resourceUrl, taxReference, { observe: 'response' });
  }

  update(taxReference: ITaxReference): Observable<EntityResponseType> {
    return this.http.put<ITaxReference>(`${this.resourceUrl}/${this.getTaxReferenceIdentifier(taxReference)}`, taxReference, {
      observe: 'response',
    });
  }

  partialUpdate(taxReference: PartialUpdateTaxReference): Observable<EntityResponseType> {
    return this.http.patch<ITaxReference>(`${this.resourceUrl}/${this.getTaxReferenceIdentifier(taxReference)}`, taxReference, {
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

  getTaxReferenceIdentifier(taxReference: Pick<ITaxReference, 'id'>): number {
    return taxReference.id;
  }

  compareTaxReference(o1: Pick<ITaxReference, 'id'> | null, o2: Pick<ITaxReference, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaxReferenceIdentifier(o1) === this.getTaxReferenceIdentifier(o2) : o1 === o2;
  }

  addTaxReferenceToCollectionIfMissing<Type extends Pick<ITaxReference, 'id'>>(
    taxReferenceCollection: Type[],
    ...taxReferencesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taxReferences: Type[] = taxReferencesToCheck.filter(isPresent);
    if (taxReferences.length > 0) {
      const taxReferenceCollectionIdentifiers = taxReferenceCollection.map(
        taxReferenceItem => this.getTaxReferenceIdentifier(taxReferenceItem)!
      );
      const taxReferencesToAdd = taxReferences.filter(taxReferenceItem => {
        const taxReferenceIdentifier = this.getTaxReferenceIdentifier(taxReferenceItem);
        if (taxReferenceCollectionIdentifiers.includes(taxReferenceIdentifier)) {
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
