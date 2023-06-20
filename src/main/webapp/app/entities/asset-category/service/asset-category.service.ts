import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAssetCategory, NewAssetCategory } from '../asset-category.model';

export type PartialUpdateAssetCategory = Partial<IAssetCategory> & Pick<IAssetCategory, 'id'>;

export type EntityResponseType = HttpResponse<IAssetCategory>;
export type EntityArrayResponseType = HttpResponse<IAssetCategory[]>;

@Injectable({ providedIn: 'root' })
export class AssetCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/asset-categories');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/asset-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(assetCategory: NewAssetCategory): Observable<EntityResponseType> {
    return this.http.post<IAssetCategory>(this.resourceUrl, assetCategory, { observe: 'response' });
  }

  update(assetCategory: IAssetCategory): Observable<EntityResponseType> {
    return this.http.put<IAssetCategory>(`${this.resourceUrl}/${this.getAssetCategoryIdentifier(assetCategory)}`, assetCategory, {
      observe: 'response',
    });
  }

  partialUpdate(assetCategory: PartialUpdateAssetCategory): Observable<EntityResponseType> {
    return this.http.patch<IAssetCategory>(`${this.resourceUrl}/${this.getAssetCategoryIdentifier(assetCategory)}`, assetCategory, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAssetCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAssetCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAssetCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getAssetCategoryIdentifier(assetCategory: Pick<IAssetCategory, 'id'>): number {
    return assetCategory.id;
  }

  compareAssetCategory(o1: Pick<IAssetCategory, 'id'> | null, o2: Pick<IAssetCategory, 'id'> | null): boolean {
    return o1 && o2 ? this.getAssetCategoryIdentifier(o1) === this.getAssetCategoryIdentifier(o2) : o1 === o2;
  }

  addAssetCategoryToCollectionIfMissing<Type extends Pick<IAssetCategory, 'id'>>(
    assetCategoryCollection: Type[],
    ...assetCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const assetCategories: Type[] = assetCategoriesToCheck.filter(isPresent);
    if (assetCategories.length > 0) {
      const assetCategoryCollectionIdentifiers = assetCategoryCollection.map(
        assetCategoryItem => this.getAssetCategoryIdentifier(assetCategoryItem)!
      );
      const assetCategoriesToAdd = assetCategories.filter(assetCategoryItem => {
        const assetCategoryIdentifier = this.getAssetCategoryIdentifier(assetCategoryItem);
        if (assetCategoryCollectionIdentifiers.includes(assetCategoryIdentifier)) {
          return false;
        }
        assetCategoryCollectionIdentifiers.push(assetCategoryIdentifier);
        return true;
      });
      return [...assetCategoriesToAdd, ...assetCategoryCollection];
    }
    return assetCategoryCollection;
  }
}
