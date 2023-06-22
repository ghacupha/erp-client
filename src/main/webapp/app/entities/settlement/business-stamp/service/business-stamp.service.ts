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
import { IBusinessStamp, NewBusinessStamp } from '../business-stamp.model';

export type PartialUpdateBusinessStamp = Partial<IBusinessStamp> & Pick<IBusinessStamp, 'id'>;

type RestOf<T extends IBusinessStamp | NewBusinessStamp> = Omit<T, 'stampDate'> & {
  stampDate?: string | null;
};

export type RestBusinessStamp = RestOf<IBusinessStamp>;

export type NewRestBusinessStamp = RestOf<NewBusinessStamp>;

export type PartialUpdateRestBusinessStamp = RestOf<PartialUpdateBusinessStamp>;

export type EntityResponseType = HttpResponse<IBusinessStamp>;
export type EntityArrayResponseType = HttpResponse<IBusinessStamp[]>;

@Injectable({ providedIn: 'root' })
export class BusinessStampService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/business-stamps');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/business-stamps');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(businessStamp: NewBusinessStamp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(businessStamp);
    return this.http
      .post<RestBusinessStamp>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(businessStamp: IBusinessStamp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(businessStamp);
    return this.http
      .put<RestBusinessStamp>(`${this.resourceUrl}/${this.getBusinessStampIdentifier(businessStamp)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(businessStamp: PartialUpdateBusinessStamp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(businessStamp);
    return this.http
      .patch<RestBusinessStamp>(`${this.resourceUrl}/${this.getBusinessStampIdentifier(businessStamp)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestBusinessStamp>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestBusinessStamp[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestBusinessStamp[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getBusinessStampIdentifier(businessStamp: Pick<IBusinessStamp, 'id'>): number {
    return businessStamp.id;
  }

  compareBusinessStamp(o1: Pick<IBusinessStamp, 'id'> | null, o2: Pick<IBusinessStamp, 'id'> | null): boolean {
    return o1 && o2 ? this.getBusinessStampIdentifier(o1) === this.getBusinessStampIdentifier(o2) : o1 === o2;
  }

  addBusinessStampToCollectionIfMissing<Type extends Pick<IBusinessStamp, 'id'>>(
    businessStampCollection: Type[],
    ...businessStampsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const businessStamps: Type[] = businessStampsToCheck.filter(isPresent);
    if (businessStamps.length > 0) {
      const businessStampCollectionIdentifiers = businessStampCollection.map(
        businessStampItem => this.getBusinessStampIdentifier(businessStampItem)!
      );
      const businessStampsToAdd = businessStamps.filter(businessStampItem => {
        const businessStampIdentifier = this.getBusinessStampIdentifier(businessStampItem);
        if (businessStampCollectionIdentifiers.includes(businessStampIdentifier)) {
          return false;
        }
        businessStampCollectionIdentifiers.push(businessStampIdentifier);
        return true;
      });
      return [...businessStampsToAdd, ...businessStampCollection];
    }
    return businessStampCollection;
  }

  protected convertDateFromClient<T extends IBusinessStamp | NewBusinessStamp | PartialUpdateBusinessStamp>(businessStamp: T): RestOf<T> {
    return {
      ...businessStamp,
      stampDate: businessStamp.stampDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restBusinessStamp: RestBusinessStamp): IBusinessStamp {
    return {
      ...restBusinessStamp,
      stampDate: restBusinessStamp.stampDate ? dayjs(restBusinessStamp.stampDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestBusinessStamp>): HttpResponse<IBusinessStamp> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestBusinessStamp[]>): HttpResponse<IBusinessStamp[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
