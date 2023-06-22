import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IUniversallyUniqueMapping, NewUniversallyUniqueMapping } from '../universally-unique-mapping.model';

export type PartialUpdateUniversallyUniqueMapping = Partial<IUniversallyUniqueMapping> & Pick<IUniversallyUniqueMapping, 'id'>;

export type EntityResponseType = HttpResponse<IUniversallyUniqueMapping>;
export type EntityArrayResponseType = HttpResponse<IUniversallyUniqueMapping[]>;

@Injectable({ providedIn: 'root' })
export class UniversallyUniqueMappingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/universally-unique-mappings');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/universally-unique-mappings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(universallyUniqueMapping: NewUniversallyUniqueMapping): Observable<EntityResponseType> {
    return this.http.post<IUniversallyUniqueMapping>(this.resourceUrl, universallyUniqueMapping, { observe: 'response' });
  }

  update(universallyUniqueMapping: IUniversallyUniqueMapping): Observable<EntityResponseType> {
    return this.http.put<IUniversallyUniqueMapping>(
      `${this.resourceUrl}/${this.getUniversallyUniqueMappingIdentifier(universallyUniqueMapping)}`,
      universallyUniqueMapping,
      { observe: 'response' }
    );
  }

  partialUpdate(universallyUniqueMapping: PartialUpdateUniversallyUniqueMapping): Observable<EntityResponseType> {
    return this.http.patch<IUniversallyUniqueMapping>(
      `${this.resourceUrl}/${this.getUniversallyUniqueMappingIdentifier(universallyUniqueMapping)}`,
      universallyUniqueMapping,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUniversallyUniqueMapping>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUniversallyUniqueMapping[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUniversallyUniqueMapping[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getUniversallyUniqueMappingIdentifier(universallyUniqueMapping: Pick<IUniversallyUniqueMapping, 'id'>): number {
    return universallyUniqueMapping.id;
  }

  compareUniversallyUniqueMapping(
    o1: Pick<IUniversallyUniqueMapping, 'id'> | null,
    o2: Pick<IUniversallyUniqueMapping, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getUniversallyUniqueMappingIdentifier(o1) === this.getUniversallyUniqueMappingIdentifier(o2) : o1 === o2;
  }

  addUniversallyUniqueMappingToCollectionIfMissing<Type extends Pick<IUniversallyUniqueMapping, 'id'>>(
    universallyUniqueMappingCollection: Type[],
    ...universallyUniqueMappingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const universallyUniqueMappings: Type[] = universallyUniqueMappingsToCheck.filter(isPresent);
    if (universallyUniqueMappings.length > 0) {
      const universallyUniqueMappingCollectionIdentifiers = universallyUniqueMappingCollection.map(
        universallyUniqueMappingItem => this.getUniversallyUniqueMappingIdentifier(universallyUniqueMappingItem)!
      );
      const universallyUniqueMappingsToAdd = universallyUniqueMappings.filter(universallyUniqueMappingItem => {
        const universallyUniqueMappingIdentifier = this.getUniversallyUniqueMappingIdentifier(universallyUniqueMappingItem);
        if (universallyUniqueMappingCollectionIdentifiers.includes(universallyUniqueMappingIdentifier)) {
          return false;
        }
        universallyUniqueMappingCollectionIdentifiers.push(universallyUniqueMappingIdentifier);
        return true;
      });
      return [...universallyUniqueMappingsToAdd, ...universallyUniqueMappingCollection];
    }
    return universallyUniqueMappingCollection;
  }
}
