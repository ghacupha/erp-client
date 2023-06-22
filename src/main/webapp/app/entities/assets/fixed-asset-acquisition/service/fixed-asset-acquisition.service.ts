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
import { IFixedAssetAcquisition, NewFixedAssetAcquisition } from '../fixed-asset-acquisition.model';

export type PartialUpdateFixedAssetAcquisition = Partial<IFixedAssetAcquisition> & Pick<IFixedAssetAcquisition, 'id'>;

type RestOf<T extends IFixedAssetAcquisition | NewFixedAssetAcquisition> = Omit<T, 'purchaseDate'> & {
  purchaseDate?: string | null;
};

export type RestFixedAssetAcquisition = RestOf<IFixedAssetAcquisition>;

export type NewRestFixedAssetAcquisition = RestOf<NewFixedAssetAcquisition>;

export type PartialUpdateRestFixedAssetAcquisition = RestOf<PartialUpdateFixedAssetAcquisition>;

export type EntityResponseType = HttpResponse<IFixedAssetAcquisition>;
export type EntityArrayResponseType = HttpResponse<IFixedAssetAcquisition[]>;

@Injectable({ providedIn: 'root' })
export class FixedAssetAcquisitionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset-acquisitions');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fixed-asset-acquisitions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fixedAssetAcquisition: NewFixedAssetAcquisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fixedAssetAcquisition);
    return this.http
      .post<RestFixedAssetAcquisition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fixedAssetAcquisition: IFixedAssetAcquisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fixedAssetAcquisition);
    return this.http
      .put<RestFixedAssetAcquisition>(`${this.resourceUrl}/${this.getFixedAssetAcquisitionIdentifier(fixedAssetAcquisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fixedAssetAcquisition: PartialUpdateFixedAssetAcquisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fixedAssetAcquisition);
    return this.http
      .patch<RestFixedAssetAcquisition>(`${this.resourceUrl}/${this.getFixedAssetAcquisitionIdentifier(fixedAssetAcquisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFixedAssetAcquisition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFixedAssetAcquisition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFixedAssetAcquisition[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getFixedAssetAcquisitionIdentifier(fixedAssetAcquisition: Pick<IFixedAssetAcquisition, 'id'>): number {
    return fixedAssetAcquisition.id;
  }

  compareFixedAssetAcquisition(o1: Pick<IFixedAssetAcquisition, 'id'> | null, o2: Pick<IFixedAssetAcquisition, 'id'> | null): boolean {
    return o1 && o2 ? this.getFixedAssetAcquisitionIdentifier(o1) === this.getFixedAssetAcquisitionIdentifier(o2) : o1 === o2;
  }

  addFixedAssetAcquisitionToCollectionIfMissing<Type extends Pick<IFixedAssetAcquisition, 'id'>>(
    fixedAssetAcquisitionCollection: Type[],
    ...fixedAssetAcquisitionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fixedAssetAcquisitions: Type[] = fixedAssetAcquisitionsToCheck.filter(isPresent);
    if (fixedAssetAcquisitions.length > 0) {
      const fixedAssetAcquisitionCollectionIdentifiers = fixedAssetAcquisitionCollection.map(
        fixedAssetAcquisitionItem => this.getFixedAssetAcquisitionIdentifier(fixedAssetAcquisitionItem)!
      );
      const fixedAssetAcquisitionsToAdd = fixedAssetAcquisitions.filter(fixedAssetAcquisitionItem => {
        const fixedAssetAcquisitionIdentifier = this.getFixedAssetAcquisitionIdentifier(fixedAssetAcquisitionItem);
        if (fixedAssetAcquisitionCollectionIdentifiers.includes(fixedAssetAcquisitionIdentifier)) {
          return false;
        }
        fixedAssetAcquisitionCollectionIdentifiers.push(fixedAssetAcquisitionIdentifier);
        return true;
      });
      return [...fixedAssetAcquisitionsToAdd, ...fixedAssetAcquisitionCollection];
    }
    return fixedAssetAcquisitionCollection;
  }

  protected convertDateFromClient<T extends IFixedAssetAcquisition | NewFixedAssetAcquisition | PartialUpdateFixedAssetAcquisition>(
    fixedAssetAcquisition: T
  ): RestOf<T> {
    return {
      ...fixedAssetAcquisition,
      purchaseDate: fixedAssetAcquisition.purchaseDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFixedAssetAcquisition: RestFixedAssetAcquisition): IFixedAssetAcquisition {
    return {
      ...restFixedAssetAcquisition,
      purchaseDate: restFixedAssetAcquisition.purchaseDate ? dayjs(restFixedAssetAcquisition.purchaseDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFixedAssetAcquisition>): HttpResponse<IFixedAssetAcquisition> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFixedAssetAcquisition[]>): HttpResponse<IFixedAssetAcquisition[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
