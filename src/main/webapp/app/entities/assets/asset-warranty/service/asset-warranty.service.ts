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
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAssetWarranty, NewAssetWarranty } from '../asset-warranty.model';

export type PartialUpdateAssetWarranty = Partial<IAssetWarranty> & Pick<IAssetWarranty, 'id'>;

type RestOf<T extends IAssetWarranty | NewAssetWarranty> = Omit<T, 'expiryDate'> & {
  expiryDate?: string | null;
};

export type RestAssetWarranty = RestOf<IAssetWarranty>;

export type NewRestAssetWarranty = RestOf<NewAssetWarranty>;

export type PartialUpdateRestAssetWarranty = RestOf<PartialUpdateAssetWarranty>;

export type EntityResponseType = HttpResponse<IAssetWarranty>;
export type EntityArrayResponseType = HttpResponse<IAssetWarranty[]>;

@Injectable({ providedIn: 'root' })
export class AssetWarrantyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/asset-warranties');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/asset-warranties');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(assetWarranty: NewAssetWarranty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assetWarranty);
    return this.http
      .post<RestAssetWarranty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(assetWarranty: IAssetWarranty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assetWarranty);
    return this.http
      .put<RestAssetWarranty>(`${this.resourceUrl}/${this.getAssetWarrantyIdentifier(assetWarranty)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(assetWarranty: PartialUpdateAssetWarranty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assetWarranty);
    return this.http
      .patch<RestAssetWarranty>(`${this.resourceUrl}/${this.getAssetWarrantyIdentifier(assetWarranty)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAssetWarranty>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAssetWarranty[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAssetWarranty[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getAssetWarrantyIdentifier(assetWarranty: Pick<IAssetWarranty, 'id'>): number {
    return assetWarranty.id;
  }

  compareAssetWarranty(o1: Pick<IAssetWarranty, 'id'> | null, o2: Pick<IAssetWarranty, 'id'> | null): boolean {
    return o1 && o2 ? this.getAssetWarrantyIdentifier(o1) === this.getAssetWarrantyIdentifier(o2) : o1 === o2;
  }

  addAssetWarrantyToCollectionIfMissing<Type extends Pick<IAssetWarranty, 'id'>>(
    assetWarrantyCollection: Type[],
    ...assetWarrantiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const assetWarranties: Type[] = assetWarrantiesToCheck.filter(isPresent);
    if (assetWarranties.length > 0) {
      const assetWarrantyCollectionIdentifiers = assetWarrantyCollection.map(
        assetWarrantyItem => this.getAssetWarrantyIdentifier(assetWarrantyItem)!
      );
      const assetWarrantiesToAdd = assetWarranties.filter(assetWarrantyItem => {
        const assetWarrantyIdentifier = this.getAssetWarrantyIdentifier(assetWarrantyItem);
        if (assetWarrantyCollectionIdentifiers.includes(assetWarrantyIdentifier)) {
          return false;
        }
        assetWarrantyCollectionIdentifiers.push(assetWarrantyIdentifier);
        return true;
      });
      return [...assetWarrantiesToAdd, ...assetWarrantyCollection];
    }
    return assetWarrantyCollection;
  }

  protected convertDateFromClient<T extends IAssetWarranty | NewAssetWarranty | PartialUpdateAssetWarranty>(assetWarranty: T): RestOf<T> {
    return {
      ...assetWarranty,
      expiryDate: assetWarranty.expiryDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAssetWarranty: RestAssetWarranty): IAssetWarranty {
    return {
      ...restAssetWarranty,
      expiryDate: restAssetWarranty.expiryDate ? dayjs(restAssetWarranty.expiryDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAssetWarranty>): HttpResponse<IAssetWarranty> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAssetWarranty[]>): HttpResponse<IAssetWarranty[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
