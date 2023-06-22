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
import { IAgencyNotice, NewAgencyNotice } from '../agency-notice.model';

export type PartialUpdateAgencyNotice = Partial<IAgencyNotice> & Pick<IAgencyNotice, 'id'>;

type RestOf<T extends IAgencyNotice | NewAgencyNotice> = Omit<T, 'referenceDate'> & {
  referenceDate?: string | null;
};

export type RestAgencyNotice = RestOf<IAgencyNotice>;

export type NewRestAgencyNotice = RestOf<NewAgencyNotice>;

export type PartialUpdateRestAgencyNotice = RestOf<PartialUpdateAgencyNotice>;

export type EntityResponseType = HttpResponse<IAgencyNotice>;
export type EntityArrayResponseType = HttpResponse<IAgencyNotice[]>;

@Injectable({ providedIn: 'root' })
export class AgencyNoticeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/agency-notices');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/agency-notices');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(agencyNotice: NewAgencyNotice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agencyNotice);
    return this.http
      .post<RestAgencyNotice>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(agencyNotice: IAgencyNotice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agencyNotice);
    return this.http
      .put<RestAgencyNotice>(`${this.resourceUrl}/${this.getAgencyNoticeIdentifier(agencyNotice)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(agencyNotice: PartialUpdateAgencyNotice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agencyNotice);
    return this.http
      .patch<RestAgencyNotice>(`${this.resourceUrl}/${this.getAgencyNoticeIdentifier(agencyNotice)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAgencyNotice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAgencyNotice[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAgencyNotice[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getAgencyNoticeIdentifier(agencyNotice: Pick<IAgencyNotice, 'id'>): number {
    return agencyNotice.id;
  }

  compareAgencyNotice(o1: Pick<IAgencyNotice, 'id'> | null, o2: Pick<IAgencyNotice, 'id'> | null): boolean {
    return o1 && o2 ? this.getAgencyNoticeIdentifier(o1) === this.getAgencyNoticeIdentifier(o2) : o1 === o2;
  }

  addAgencyNoticeToCollectionIfMissing<Type extends Pick<IAgencyNotice, 'id'>>(
    agencyNoticeCollection: Type[],
    ...agencyNoticesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const agencyNotices: Type[] = agencyNoticesToCheck.filter(isPresent);
    if (agencyNotices.length > 0) {
      const agencyNoticeCollectionIdentifiers = agencyNoticeCollection.map(
        agencyNoticeItem => this.getAgencyNoticeIdentifier(agencyNoticeItem)!
      );
      const agencyNoticesToAdd = agencyNotices.filter(agencyNoticeItem => {
        const agencyNoticeIdentifier = this.getAgencyNoticeIdentifier(agencyNoticeItem);
        if (agencyNoticeCollectionIdentifiers.includes(agencyNoticeIdentifier)) {
          return false;
        }
        agencyNoticeCollectionIdentifiers.push(agencyNoticeIdentifier);
        return true;
      });
      return [...agencyNoticesToAdd, ...agencyNoticeCollection];
    }
    return agencyNoticeCollection;
  }

  protected convertDateFromClient<T extends IAgencyNotice | NewAgencyNotice | PartialUpdateAgencyNotice>(agencyNotice: T): RestOf<T> {
    return {
      ...agencyNotice,
      referenceDate: agencyNotice.referenceDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAgencyNotice: RestAgencyNotice): IAgencyNotice {
    return {
      ...restAgencyNotice,
      referenceDate: restAgencyNotice.referenceDate ? dayjs(restAgencyNotice.referenceDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAgencyNotice>): HttpResponse<IAgencyNotice> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAgencyNotice[]>): HttpResponse<IAgencyNotice[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
