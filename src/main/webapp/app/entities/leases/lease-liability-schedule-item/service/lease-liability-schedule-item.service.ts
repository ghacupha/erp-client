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
import { ILeaseLiabilityScheduleItem, NewLeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';

export type PartialUpdateLeaseLiabilityScheduleItem = Partial<ILeaseLiabilityScheduleItem> & Pick<ILeaseLiabilityScheduleItem, 'id'>;

type RestOf<T extends ILeaseLiabilityScheduleItem | NewLeaseLiabilityScheduleItem> = Omit<T, 'periodStartDate' | 'periodEndDate'> & {
  periodStartDate?: string | null;
  periodEndDate?: string | null;
};

export type RestLeaseLiabilityScheduleItem = RestOf<ILeaseLiabilityScheduleItem>;

export type NewRestLeaseLiabilityScheduleItem = RestOf<NewLeaseLiabilityScheduleItem>;

export type PartialUpdateRestLeaseLiabilityScheduleItem = RestOf<PartialUpdateLeaseLiabilityScheduleItem>;

export type EntityResponseType = HttpResponse<ILeaseLiabilityScheduleItem>;
export type EntityArrayResponseType = HttpResponse<ILeaseLiabilityScheduleItem[]>;

@Injectable({ providedIn: 'root' })
export class LeaseLiabilityScheduleItemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lease-liability-schedule-items');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/lease-liability-schedule-items');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(leaseLiabilityScheduleItem: NewLeaseLiabilityScheduleItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseLiabilityScheduleItem);
    return this.http
      .post<RestLeaseLiabilityScheduleItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseLiabilityScheduleItem);
    return this.http
      .put<RestLeaseLiabilityScheduleItem>(
        `${this.resourceUrl}/${this.getLeaseLiabilityScheduleItemIdentifier(leaseLiabilityScheduleItem)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(leaseLiabilityScheduleItem: PartialUpdateLeaseLiabilityScheduleItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseLiabilityScheduleItem);
    return this.http
      .patch<RestLeaseLiabilityScheduleItem>(
        `${this.resourceUrl}/${this.getLeaseLiabilityScheduleItemIdentifier(leaseLiabilityScheduleItem)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLeaseLiabilityScheduleItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLeaseLiabilityScheduleItem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLeaseLiabilityScheduleItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getLeaseLiabilityScheduleItemIdentifier(leaseLiabilityScheduleItem: Pick<ILeaseLiabilityScheduleItem, 'id'>): number {
    return leaseLiabilityScheduleItem.id;
  }

  compareLeaseLiabilityScheduleItem(
    o1: Pick<ILeaseLiabilityScheduleItem, 'id'> | null,
    o2: Pick<ILeaseLiabilityScheduleItem, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getLeaseLiabilityScheduleItemIdentifier(o1) === this.getLeaseLiabilityScheduleItemIdentifier(o2) : o1 === o2;
  }

  addLeaseLiabilityScheduleItemToCollectionIfMissing<Type extends Pick<ILeaseLiabilityScheduleItem, 'id'>>(
    leaseLiabilityScheduleItemCollection: Type[],
    ...leaseLiabilityScheduleItemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const leaseLiabilityScheduleItems: Type[] = leaseLiabilityScheduleItemsToCheck.filter(isPresent);
    if (leaseLiabilityScheduleItems.length > 0) {
      const leaseLiabilityScheduleItemCollectionIdentifiers = leaseLiabilityScheduleItemCollection.map(
        leaseLiabilityScheduleItemItem => this.getLeaseLiabilityScheduleItemIdentifier(leaseLiabilityScheduleItemItem)!
      );
      const leaseLiabilityScheduleItemsToAdd = leaseLiabilityScheduleItems.filter(leaseLiabilityScheduleItemItem => {
        const leaseLiabilityScheduleItemIdentifier = this.getLeaseLiabilityScheduleItemIdentifier(leaseLiabilityScheduleItemItem);
        if (leaseLiabilityScheduleItemCollectionIdentifiers.includes(leaseLiabilityScheduleItemIdentifier)) {
          return false;
        }
        leaseLiabilityScheduleItemCollectionIdentifiers.push(leaseLiabilityScheduleItemIdentifier);
        return true;
      });
      return [...leaseLiabilityScheduleItemsToAdd, ...leaseLiabilityScheduleItemCollection];
    }
    return leaseLiabilityScheduleItemCollection;
  }

  protected convertDateFromClient<
    T extends ILeaseLiabilityScheduleItem | NewLeaseLiabilityScheduleItem | PartialUpdateLeaseLiabilityScheduleItem
  >(leaseLiabilityScheduleItem: T): RestOf<T> {
    return {
      ...leaseLiabilityScheduleItem,
      periodStartDate: leaseLiabilityScheduleItem.periodStartDate?.format(DATE_FORMAT) ?? null,
      periodEndDate: leaseLiabilityScheduleItem.periodEndDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLeaseLiabilityScheduleItem: RestLeaseLiabilityScheduleItem): ILeaseLiabilityScheduleItem {
    return {
      ...restLeaseLiabilityScheduleItem,
      periodStartDate: restLeaseLiabilityScheduleItem.periodStartDate ? dayjs(restLeaseLiabilityScheduleItem.periodStartDate) : undefined,
      periodEndDate: restLeaseLiabilityScheduleItem.periodEndDate ? dayjs(restLeaseLiabilityScheduleItem.periodEndDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLeaseLiabilityScheduleItem>): HttpResponse<ILeaseLiabilityScheduleItem> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestLeaseLiabilityScheduleItem[]>
  ): HttpResponse<ILeaseLiabilityScheduleItem[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
