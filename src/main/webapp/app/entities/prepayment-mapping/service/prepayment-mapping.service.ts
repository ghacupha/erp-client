import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IPrepaymentMapping, NewPrepaymentMapping } from '../prepayment-mapping.model';

export type PartialUpdatePrepaymentMapping = Partial<IPrepaymentMapping> & Pick<IPrepaymentMapping, 'id'>;

export type EntityResponseType = HttpResponse<IPrepaymentMapping>;
export type EntityArrayResponseType = HttpResponse<IPrepaymentMapping[]>;

@Injectable({ providedIn: 'root' })
export class PrepaymentMappingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/prepayment-mappings');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/prepayment-mappings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(prepaymentMapping: NewPrepaymentMapping): Observable<EntityResponseType> {
    return this.http.post<IPrepaymentMapping>(this.resourceUrl, prepaymentMapping, { observe: 'response' });
  }

  update(prepaymentMapping: IPrepaymentMapping): Observable<EntityResponseType> {
    return this.http.put<IPrepaymentMapping>(
      `${this.resourceUrl}/${this.getPrepaymentMappingIdentifier(prepaymentMapping)}`,
      prepaymentMapping,
      { observe: 'response' }
    );
  }

  partialUpdate(prepaymentMapping: PartialUpdatePrepaymentMapping): Observable<EntityResponseType> {
    return this.http.patch<IPrepaymentMapping>(
      `${this.resourceUrl}/${this.getPrepaymentMappingIdentifier(prepaymentMapping)}`,
      prepaymentMapping,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrepaymentMapping>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrepaymentMapping[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrepaymentMapping[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getPrepaymentMappingIdentifier(prepaymentMapping: Pick<IPrepaymentMapping, 'id'>): number {
    return prepaymentMapping.id;
  }

  comparePrepaymentMapping(o1: Pick<IPrepaymentMapping, 'id'> | null, o2: Pick<IPrepaymentMapping, 'id'> | null): boolean {
    return o1 && o2 ? this.getPrepaymentMappingIdentifier(o1) === this.getPrepaymentMappingIdentifier(o2) : o1 === o2;
  }

  addPrepaymentMappingToCollectionIfMissing<Type extends Pick<IPrepaymentMapping, 'id'>>(
    prepaymentMappingCollection: Type[],
    ...prepaymentMappingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const prepaymentMappings: Type[] = prepaymentMappingsToCheck.filter(isPresent);
    if (prepaymentMappings.length > 0) {
      const prepaymentMappingCollectionIdentifiers = prepaymentMappingCollection.map(
        prepaymentMappingItem => this.getPrepaymentMappingIdentifier(prepaymentMappingItem)!
      );
      const prepaymentMappingsToAdd = prepaymentMappings.filter(prepaymentMappingItem => {
        const prepaymentMappingIdentifier = this.getPrepaymentMappingIdentifier(prepaymentMappingItem);
        if (prepaymentMappingCollectionIdentifiers.includes(prepaymentMappingIdentifier)) {
          return false;
        }
        prepaymentMappingCollectionIdentifiers.push(prepaymentMappingIdentifier);
        return true;
      });
      return [...prepaymentMappingsToAdd, ...prepaymentMappingCollection];
    }
    return prepaymentMappingCollection;
  }
}
