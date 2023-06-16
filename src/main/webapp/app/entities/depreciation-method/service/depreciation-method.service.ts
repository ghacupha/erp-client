import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IDepreciationMethod, NewDepreciationMethod } from '../depreciation-method.model';

export type PartialUpdateDepreciationMethod = Partial<IDepreciationMethod> & Pick<IDepreciationMethod, 'id'>;

export type EntityResponseType = HttpResponse<IDepreciationMethod>;
export type EntityArrayResponseType = HttpResponse<IDepreciationMethod[]>;

@Injectable({ providedIn: 'root' })
export class DepreciationMethodService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/depreciation-methods');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/depreciation-methods');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(depreciationMethod: NewDepreciationMethod): Observable<EntityResponseType> {
    return this.http.post<IDepreciationMethod>(this.resourceUrl, depreciationMethod, { observe: 'response' });
  }

  update(depreciationMethod: IDepreciationMethod): Observable<EntityResponseType> {
    return this.http.put<IDepreciationMethod>(
      `${this.resourceUrl}/${this.getDepreciationMethodIdentifier(depreciationMethod)}`,
      depreciationMethod,
      { observe: 'response' }
    );
  }

  partialUpdate(depreciationMethod: PartialUpdateDepreciationMethod): Observable<EntityResponseType> {
    return this.http.patch<IDepreciationMethod>(
      `${this.resourceUrl}/${this.getDepreciationMethodIdentifier(depreciationMethod)}`,
      depreciationMethod,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepreciationMethod>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepreciationMethod[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepreciationMethod[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getDepreciationMethodIdentifier(depreciationMethod: Pick<IDepreciationMethod, 'id'>): number {
    return depreciationMethod.id;
  }

  compareDepreciationMethod(o1: Pick<IDepreciationMethod, 'id'> | null, o2: Pick<IDepreciationMethod, 'id'> | null): boolean {
    return o1 && o2 ? this.getDepreciationMethodIdentifier(o1) === this.getDepreciationMethodIdentifier(o2) : o1 === o2;
  }

  addDepreciationMethodToCollectionIfMissing<Type extends Pick<IDepreciationMethod, 'id'>>(
    depreciationMethodCollection: Type[],
    ...depreciationMethodsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const depreciationMethods: Type[] = depreciationMethodsToCheck.filter(isPresent);
    if (depreciationMethods.length > 0) {
      const depreciationMethodCollectionIdentifiers = depreciationMethodCollection.map(
        depreciationMethodItem => this.getDepreciationMethodIdentifier(depreciationMethodItem)!
      );
      const depreciationMethodsToAdd = depreciationMethods.filter(depreciationMethodItem => {
        const depreciationMethodIdentifier = this.getDepreciationMethodIdentifier(depreciationMethodItem);
        if (depreciationMethodCollectionIdentifiers.includes(depreciationMethodIdentifier)) {
          return false;
        }
        depreciationMethodCollectionIdentifiers.push(depreciationMethodIdentifier);
        return true;
      });
      return [...depreciationMethodsToAdd, ...depreciationMethodCollection];
    }
    return depreciationMethodCollection;
  }
}
