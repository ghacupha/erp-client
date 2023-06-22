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
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISettlementRequisition, NewSettlementRequisition } from '../settlement-requisition.model';

export type PartialUpdateSettlementRequisition = Partial<ISettlementRequisition> & Pick<ISettlementRequisition, 'id'>;

type RestOf<T extends ISettlementRequisition | NewSettlementRequisition> = Omit<T, 'timeOfRequisition'> & {
  timeOfRequisition?: string | null;
};

export type RestSettlementRequisition = RestOf<ISettlementRequisition>;

export type NewRestSettlementRequisition = RestOf<NewSettlementRequisition>;

export type PartialUpdateRestSettlementRequisition = RestOf<PartialUpdateSettlementRequisition>;

export type EntityResponseType = HttpResponse<ISettlementRequisition>;
export type EntityArrayResponseType = HttpResponse<ISettlementRequisition[]>;

@Injectable({ providedIn: 'root' })
export class SettlementRequisitionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/requisition/settlement-requisitions');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/requisition/_search/settlement-requisitions');
  protected resourceSearchIndexUrl = this.applicationConfigService.getEndpointFor('api/requisition/elasticsearch/re-index');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(settlementRequisition: NewSettlementRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(settlementRequisition);
    return this.http
      .post<RestSettlementRequisition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(settlementRequisition: ISettlementRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(settlementRequisition);
    return this.http
      .put<RestSettlementRequisition>(`${this.resourceUrl}/${this.getSettlementRequisitionIdentifier(settlementRequisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(settlementRequisition: PartialUpdateSettlementRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(settlementRequisition);
    return this.http
      .patch<RestSettlementRequisition>(`${this.resourceUrl}/${this.getSettlementRequisitionIdentifier(settlementRequisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSettlementRequisition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSettlementRequisition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSettlementRequisition[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getSettlementRequisitionIdentifier(settlementRequisition: Pick<ISettlementRequisition, 'id'>): number {
    return settlementRequisition.id;
  }

  compareSettlementRequisition(o1: Pick<ISettlementRequisition, 'id'> | null, o2: Pick<ISettlementRequisition, 'id'> | null): boolean {
    return o1 && o2 ? this.getSettlementRequisitionIdentifier(o1) === this.getSettlementRequisitionIdentifier(o2) : o1 === o2;
  }

  addSettlementRequisitionToCollectionIfMissing<Type extends Pick<ISettlementRequisition, 'id'>>(
    settlementRequisitionCollection: Type[],
    ...settlementRequisitionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const settlementRequisitions: Type[] = settlementRequisitionsToCheck.filter(isPresent);
    if (settlementRequisitions.length > 0) {
      const settlementRequisitionCollectionIdentifiers = settlementRequisitionCollection.map(
        settlementRequisitionItem => this.getSettlementRequisitionIdentifier(settlementRequisitionItem)!
      );
      const settlementRequisitionsToAdd = settlementRequisitions.filter(settlementRequisitionItem => {
        const settlementRequisitionIdentifier = this.getSettlementRequisitionIdentifier(settlementRequisitionItem);
        if (settlementRequisitionCollectionIdentifiers.includes(settlementRequisitionIdentifier)) {
          return false;
        }
        settlementRequisitionCollectionIdentifiers.push(settlementRequisitionIdentifier);
        return true;
      });
      return [...settlementRequisitionsToAdd, ...settlementRequisitionCollection];
    }
    return settlementRequisitionCollection;
  }

  protected convertDateFromClient<T extends ISettlementRequisition | NewSettlementRequisition | PartialUpdateSettlementRequisition>(
    settlementRequisition: T
  ): RestOf<T> {
    return {
      ...settlementRequisition,
      timeOfRequisition: settlementRequisition.timeOfRequisition?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restSettlementRequisition: RestSettlementRequisition): ISettlementRequisition {
    return {
      ...restSettlementRequisition,
      timeOfRequisition: restSettlementRequisition.timeOfRequisition ? dayjs(restSettlementRequisition.timeOfRequisition) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSettlementRequisition>): HttpResponse<ISettlementRequisition> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSettlementRequisition[]>): HttpResponse<ISettlementRequisition[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
