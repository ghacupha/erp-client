///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.3
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
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ILeaseLiabilityScheduleItem, getLeaseLiabilityScheduleItemIdentifier } from '../lease-liability-schedule-item.model';

export type EntityResponseType = HttpResponse<ILeaseLiabilityScheduleItem>;
export type EntityArrayResponseType = HttpResponse<ILeaseLiabilityScheduleItem[]>;

@Injectable({ providedIn: 'root' })
export class LeaseLiabilityScheduleItemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lease-liability-schedule-items');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/lease-liability-schedule-items');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseLiabilityScheduleItem);
    return this.http
      .post<ILeaseLiabilityScheduleItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseLiabilityScheduleItem);
    return this.http
      .put<ILeaseLiabilityScheduleItem>(
        `${this.resourceUrl}/${getLeaseLiabilityScheduleItemIdentifier(leaseLiabilityScheduleItem) as number}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseLiabilityScheduleItem);
    return this.http
      .patch<ILeaseLiabilityScheduleItem>(
        `${this.resourceUrl}/${getLeaseLiabilityScheduleItemIdentifier(leaseLiabilityScheduleItem) as number}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILeaseLiabilityScheduleItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILeaseLiabilityScheduleItem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILeaseLiabilityScheduleItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addLeaseLiabilityScheduleItemToCollectionIfMissing(
    leaseLiabilityScheduleItemCollection: ILeaseLiabilityScheduleItem[],
    ...leaseLiabilityScheduleItemsToCheck: (ILeaseLiabilityScheduleItem | null | undefined)[]
  ): ILeaseLiabilityScheduleItem[] {
    const leaseLiabilityScheduleItems: ILeaseLiabilityScheduleItem[] = leaseLiabilityScheduleItemsToCheck.filter(isPresent);
    if (leaseLiabilityScheduleItems.length > 0) {
      const leaseLiabilityScheduleItemCollectionIdentifiers = leaseLiabilityScheduleItemCollection.map(
        leaseLiabilityScheduleItemItem => getLeaseLiabilityScheduleItemIdentifier(leaseLiabilityScheduleItemItem)!
      );
      const leaseLiabilityScheduleItemsToAdd = leaseLiabilityScheduleItems.filter(leaseLiabilityScheduleItemItem => {
        const leaseLiabilityScheduleItemIdentifier = getLeaseLiabilityScheduleItemIdentifier(leaseLiabilityScheduleItemItem);
        if (
          leaseLiabilityScheduleItemIdentifier == null ||
          leaseLiabilityScheduleItemCollectionIdentifiers.includes(leaseLiabilityScheduleItemIdentifier)
        ) {
          return false;
        }
        leaseLiabilityScheduleItemCollectionIdentifiers.push(leaseLiabilityScheduleItemIdentifier);
        return true;
      });
      return [...leaseLiabilityScheduleItemsToAdd, ...leaseLiabilityScheduleItemCollection];
    }
    return leaseLiabilityScheduleItemCollection;
  }

  protected convertDateFromClient(leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem): ILeaseLiabilityScheduleItem {
    return Object.assign({}, leaseLiabilityScheduleItem, {
      periodStartDate: leaseLiabilityScheduleItem.periodStartDate?.isValid()
        ? leaseLiabilityScheduleItem.periodStartDate.format(DATE_FORMAT)
        : undefined,
      periodEndDate: leaseLiabilityScheduleItem.periodEndDate?.isValid()
        ? leaseLiabilityScheduleItem.periodEndDate.format(DATE_FORMAT)
        : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.periodStartDate = res.body.periodStartDate ? dayjs(res.body.periodStartDate) : undefined;
      res.body.periodEndDate = res.body.periodEndDate ? dayjs(res.body.periodEndDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem) => {
        leaseLiabilityScheduleItem.periodStartDate = leaseLiabilityScheduleItem.periodStartDate
          ? dayjs(leaseLiabilityScheduleItem.periodStartDate)
          : undefined;
        leaseLiabilityScheduleItem.periodEndDate = leaseLiabilityScheduleItem.periodEndDate
          ? dayjs(leaseLiabilityScheduleItem.periodEndDate)
          : undefined;
      });
    }
    return res;
  }
}
