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
import { IFixedAssetDepreciation, NewFixedAssetDepreciation } from '../fixed-asset-depreciation.model';

export type PartialUpdateFixedAssetDepreciation = Partial<IFixedAssetDepreciation> & Pick<IFixedAssetDepreciation, 'id'>;

type RestOf<T extends IFixedAssetDepreciation | NewFixedAssetDepreciation> = Omit<T, 'depreciationDate'> & {
  depreciationDate?: string | null;
};

export type RestFixedAssetDepreciation = RestOf<IFixedAssetDepreciation>;

export type NewRestFixedAssetDepreciation = RestOf<NewFixedAssetDepreciation>;

export type PartialUpdateRestFixedAssetDepreciation = RestOf<PartialUpdateFixedAssetDepreciation>;

export type EntityResponseType = HttpResponse<IFixedAssetDepreciation>;
export type EntityArrayResponseType = HttpResponse<IFixedAssetDepreciation[]>;

@Injectable({ providedIn: 'root' })
export class FixedAssetDepreciationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset-depreciations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/fixed-asset-depreciations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fixedAssetDepreciation: NewFixedAssetDepreciation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fixedAssetDepreciation);
    return this.http
      .post<RestFixedAssetDepreciation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fixedAssetDepreciation: IFixedAssetDepreciation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fixedAssetDepreciation);
    return this.http
      .put<RestFixedAssetDepreciation>(`${this.resourceUrl}/${this.getFixedAssetDepreciationIdentifier(fixedAssetDepreciation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fixedAssetDepreciation: PartialUpdateFixedAssetDepreciation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fixedAssetDepreciation);
    return this.http
      .patch<RestFixedAssetDepreciation>(`${this.resourceUrl}/${this.getFixedAssetDepreciationIdentifier(fixedAssetDepreciation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFixedAssetDepreciation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFixedAssetDepreciation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFixedAssetDepreciation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getFixedAssetDepreciationIdentifier(fixedAssetDepreciation: Pick<IFixedAssetDepreciation, 'id'>): number {
    return fixedAssetDepreciation.id;
  }

  compareFixedAssetDepreciation(o1: Pick<IFixedAssetDepreciation, 'id'> | null, o2: Pick<IFixedAssetDepreciation, 'id'> | null): boolean {
    return o1 && o2 ? this.getFixedAssetDepreciationIdentifier(o1) === this.getFixedAssetDepreciationIdentifier(o2) : o1 === o2;
  }

  addFixedAssetDepreciationToCollectionIfMissing<Type extends Pick<IFixedAssetDepreciation, 'id'>>(
    fixedAssetDepreciationCollection: Type[],
    ...fixedAssetDepreciationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fixedAssetDepreciations: Type[] = fixedAssetDepreciationsToCheck.filter(isPresent);
    if (fixedAssetDepreciations.length > 0) {
      const fixedAssetDepreciationCollectionIdentifiers = fixedAssetDepreciationCollection.map(
        fixedAssetDepreciationItem => this.getFixedAssetDepreciationIdentifier(fixedAssetDepreciationItem)!
      );
      const fixedAssetDepreciationsToAdd = fixedAssetDepreciations.filter(fixedAssetDepreciationItem => {
        const fixedAssetDepreciationIdentifier = this.getFixedAssetDepreciationIdentifier(fixedAssetDepreciationItem);
        if (fixedAssetDepreciationCollectionIdentifiers.includes(fixedAssetDepreciationIdentifier)) {
          return false;
        }
        fixedAssetDepreciationCollectionIdentifiers.push(fixedAssetDepreciationIdentifier);
        return true;
      });
      return [...fixedAssetDepreciationsToAdd, ...fixedAssetDepreciationCollection];
    }
    return fixedAssetDepreciationCollection;
  }

  protected convertDateFromClient<T extends IFixedAssetDepreciation | NewFixedAssetDepreciation | PartialUpdateFixedAssetDepreciation>(
    fixedAssetDepreciation: T
  ): RestOf<T> {
    return {
      ...fixedAssetDepreciation,
      depreciationDate: fixedAssetDepreciation.depreciationDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFixedAssetDepreciation: RestFixedAssetDepreciation): IFixedAssetDepreciation {
    return {
      ...restFixedAssetDepreciation,
      depreciationDate: restFixedAssetDepreciation.depreciationDate ? dayjs(restFixedAssetDepreciation.depreciationDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFixedAssetDepreciation>): HttpResponse<IFixedAssetDepreciation> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFixedAssetDepreciation[]>): HttpResponse<IFixedAssetDepreciation[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
