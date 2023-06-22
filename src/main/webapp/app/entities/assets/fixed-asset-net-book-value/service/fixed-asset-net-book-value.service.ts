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
import { IFixedAssetNetBookValue, NewFixedAssetNetBookValue } from '../fixed-asset-net-book-value.model';

export type PartialUpdateFixedAssetNetBookValue = Partial<IFixedAssetNetBookValue> & Pick<IFixedAssetNetBookValue, 'id'>;

type RestOf<T extends IFixedAssetNetBookValue | NewFixedAssetNetBookValue> = Omit<T, 'netBookValueDate'> & {
  netBookValueDate?: string | null;
};

export type RestFixedAssetNetBookValue = RestOf<IFixedAssetNetBookValue>;

export type NewRestFixedAssetNetBookValue = RestOf<NewFixedAssetNetBookValue>;

export type PartialUpdateRestFixedAssetNetBookValue = RestOf<PartialUpdateFixedAssetNetBookValue>;

export type EntityResponseType = HttpResponse<IFixedAssetNetBookValue>;
export type EntityArrayResponseType = HttpResponse<IFixedAssetNetBookValue[]>;

@Injectable({ providedIn: 'root' })
export class FixedAssetNetBookValueService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset-net-book-values');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fixed-asset-net-book-values');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fixedAssetNetBookValue: NewFixedAssetNetBookValue): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fixedAssetNetBookValue);
    return this.http
      .post<RestFixedAssetNetBookValue>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fixedAssetNetBookValue: IFixedAssetNetBookValue): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fixedAssetNetBookValue);
    return this.http
      .put<RestFixedAssetNetBookValue>(`${this.resourceUrl}/${this.getFixedAssetNetBookValueIdentifier(fixedAssetNetBookValue)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fixedAssetNetBookValue: PartialUpdateFixedAssetNetBookValue): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fixedAssetNetBookValue);
    return this.http
      .patch<RestFixedAssetNetBookValue>(`${this.resourceUrl}/${this.getFixedAssetNetBookValueIdentifier(fixedAssetNetBookValue)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFixedAssetNetBookValue>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFixedAssetNetBookValue[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFixedAssetNetBookValue[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getFixedAssetNetBookValueIdentifier(fixedAssetNetBookValue: Pick<IFixedAssetNetBookValue, 'id'>): number {
    return fixedAssetNetBookValue.id;
  }

  compareFixedAssetNetBookValue(o1: Pick<IFixedAssetNetBookValue, 'id'> | null, o2: Pick<IFixedAssetNetBookValue, 'id'> | null): boolean {
    return o1 && o2 ? this.getFixedAssetNetBookValueIdentifier(o1) === this.getFixedAssetNetBookValueIdentifier(o2) : o1 === o2;
  }

  addFixedAssetNetBookValueToCollectionIfMissing<Type extends Pick<IFixedAssetNetBookValue, 'id'>>(
    fixedAssetNetBookValueCollection: Type[],
    ...fixedAssetNetBookValuesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fixedAssetNetBookValues: Type[] = fixedAssetNetBookValuesToCheck.filter(isPresent);
    if (fixedAssetNetBookValues.length > 0) {
      const fixedAssetNetBookValueCollectionIdentifiers = fixedAssetNetBookValueCollection.map(
        fixedAssetNetBookValueItem => this.getFixedAssetNetBookValueIdentifier(fixedAssetNetBookValueItem)!
      );
      const fixedAssetNetBookValuesToAdd = fixedAssetNetBookValues.filter(fixedAssetNetBookValueItem => {
        const fixedAssetNetBookValueIdentifier = this.getFixedAssetNetBookValueIdentifier(fixedAssetNetBookValueItem);
        if (fixedAssetNetBookValueCollectionIdentifiers.includes(fixedAssetNetBookValueIdentifier)) {
          return false;
        }
        fixedAssetNetBookValueCollectionIdentifiers.push(fixedAssetNetBookValueIdentifier);
        return true;
      });
      return [...fixedAssetNetBookValuesToAdd, ...fixedAssetNetBookValueCollection];
    }
    return fixedAssetNetBookValueCollection;
  }

  protected convertDateFromClient<T extends IFixedAssetNetBookValue | NewFixedAssetNetBookValue | PartialUpdateFixedAssetNetBookValue>(
    fixedAssetNetBookValue: T
  ): RestOf<T> {
    return {
      ...fixedAssetNetBookValue,
      netBookValueDate: fixedAssetNetBookValue.netBookValueDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFixedAssetNetBookValue: RestFixedAssetNetBookValue): IFixedAssetNetBookValue {
    return {
      ...restFixedAssetNetBookValue,
      netBookValueDate: restFixedAssetNetBookValue.netBookValueDate ? dayjs(restFixedAssetNetBookValue.netBookValueDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFixedAssetNetBookValue>): HttpResponse<IFixedAssetNetBookValue> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFixedAssetNetBookValue[]>): HttpResponse<IFixedAssetNetBookValue[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
