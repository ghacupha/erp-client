///
/// Erp System - Mark II No 20 (Baruch Series) Client v 0.0.9-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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
import { IPrepaymentMarshalling, getPrepaymentMarshallingIdentifier } from '../prepayment-marshalling.model';

export type EntityResponseType = HttpResponse<IPrepaymentMarshalling>;
export type EntityArrayResponseType = HttpResponse<IPrepaymentMarshalling[]>;

@Injectable({ providedIn: 'root' })
export class PrepaymentMarshallingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/prepayment-marshallings');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/prepayment-marshallings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(prepaymentMarshalling: IPrepaymentMarshalling): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentMarshalling);
    return this.http
      .post<IPrepaymentMarshalling>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(prepaymentMarshalling: IPrepaymentMarshalling): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentMarshalling);
    return this.http
      .put<IPrepaymentMarshalling>(`${this.resourceUrl}/${getPrepaymentMarshallingIdentifier(prepaymentMarshalling) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(prepaymentMarshalling: IPrepaymentMarshalling): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentMarshalling);
    return this.http
      .patch<IPrepaymentMarshalling>(`${this.resourceUrl}/${getPrepaymentMarshallingIdentifier(prepaymentMarshalling) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPrepaymentMarshalling>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPrepaymentMarshalling[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPrepaymentMarshalling[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addPrepaymentMarshallingToCollectionIfMissing(
    prepaymentMarshallingCollection: IPrepaymentMarshalling[],
    ...prepaymentMarshallingsToCheck: (IPrepaymentMarshalling | null | undefined)[]
  ): IPrepaymentMarshalling[] {
    const prepaymentMarshallings: IPrepaymentMarshalling[] = prepaymentMarshallingsToCheck.filter(isPresent);
    if (prepaymentMarshallings.length > 0) {
      const prepaymentMarshallingCollectionIdentifiers = prepaymentMarshallingCollection.map(
        prepaymentMarshallingItem => getPrepaymentMarshallingIdentifier(prepaymentMarshallingItem)!
      );
      const prepaymentMarshallingsToAdd = prepaymentMarshallings.filter(prepaymentMarshallingItem => {
        const prepaymentMarshallingIdentifier = getPrepaymentMarshallingIdentifier(prepaymentMarshallingItem);
        if (
          prepaymentMarshallingIdentifier == null ||
          prepaymentMarshallingCollectionIdentifiers.includes(prepaymentMarshallingIdentifier)
        ) {
          return false;
        }
        prepaymentMarshallingCollectionIdentifiers.push(prepaymentMarshallingIdentifier);
        return true;
      });
      return [...prepaymentMarshallingsToAdd, ...prepaymentMarshallingCollection];
    }
    return prepaymentMarshallingCollection;
  }

  protected convertDateFromClient(prepaymentMarshalling: IPrepaymentMarshalling): IPrepaymentMarshalling {
    return Object.assign({}, prepaymentMarshalling, {
      amortizationCommencementDate: prepaymentMarshalling.amortizationCommencementDate?.isValid()
        ? prepaymentMarshalling.amortizationCommencementDate.format(DATE_FORMAT)
        : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.amortizationCommencementDate = res.body.amortizationCommencementDate
        ? dayjs(res.body.amortizationCommencementDate)
        : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((prepaymentMarshalling: IPrepaymentMarshalling) => {
        prepaymentMarshalling.amortizationCommencementDate = prepaymentMarshalling.amortizationCommencementDate
          ? dayjs(prepaymentMarshalling.amortizationCommencementDate)
          : undefined;
      });
    }
    return res;
  }
}
