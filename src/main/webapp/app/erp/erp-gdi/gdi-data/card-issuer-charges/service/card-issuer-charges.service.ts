///
/// Erp System - Mark VII No 5 (Gideon Series) Client 1.5.7
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
import { ICardIssuerCharges, getCardIssuerChargesIdentifier } from '../card-issuer-charges.model';

export type EntityResponseType = HttpResponse<ICardIssuerCharges>;
export type EntityArrayResponseType = HttpResponse<ICardIssuerCharges[]>;

@Injectable({ providedIn: 'root' })
export class CardIssuerChargesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-issuer-charges');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-issuer-charges');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardIssuerCharges: ICardIssuerCharges): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardIssuerCharges);
    return this.http
      .post<ICardIssuerCharges>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cardIssuerCharges: ICardIssuerCharges): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardIssuerCharges);
    return this.http
      .put<ICardIssuerCharges>(`${this.resourceUrl}/${getCardIssuerChargesIdentifier(cardIssuerCharges) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(cardIssuerCharges: ICardIssuerCharges): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardIssuerCharges);
    return this.http
      .patch<ICardIssuerCharges>(`${this.resourceUrl}/${getCardIssuerChargesIdentifier(cardIssuerCharges) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICardIssuerCharges>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICardIssuerCharges[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICardIssuerCharges[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addCardIssuerChargesToCollectionIfMissing(
    cardIssuerChargesCollection: ICardIssuerCharges[],
    ...cardIssuerChargesToCheck: (ICardIssuerCharges | null | undefined)[]
  ): ICardIssuerCharges[] {
    const cardIssuerCharges: ICardIssuerCharges[] = cardIssuerChargesToCheck.filter(isPresent);
    if (cardIssuerCharges.length > 0) {
      const cardIssuerChargesCollectionIdentifiers = cardIssuerChargesCollection.map(
        cardIssuerChargesItem => getCardIssuerChargesIdentifier(cardIssuerChargesItem)!
      );
      const cardIssuerChargesToAdd = cardIssuerCharges.filter(cardIssuerChargesItem => {
        const cardIssuerChargesIdentifier = getCardIssuerChargesIdentifier(cardIssuerChargesItem);
        if (cardIssuerChargesIdentifier == null || cardIssuerChargesCollectionIdentifiers.includes(cardIssuerChargesIdentifier)) {
          return false;
        }
        cardIssuerChargesCollectionIdentifiers.push(cardIssuerChargesIdentifier);
        return true;
      });
      return [...cardIssuerChargesToAdd, ...cardIssuerChargesCollection];
    }
    return cardIssuerChargesCollection;
  }

  protected convertDateFromClient(cardIssuerCharges: ICardIssuerCharges): ICardIssuerCharges {
    return Object.assign({}, cardIssuerCharges, {
      reportingDate: cardIssuerCharges.reportingDate?.isValid() ? cardIssuerCharges.reportingDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.reportingDate = res.body.reportingDate ? dayjs(res.body.reportingDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cardIssuerCharges: ICardIssuerCharges) => {
        cardIssuerCharges.reportingDate = cardIssuerCharges.reportingDate ? dayjs(cardIssuerCharges.reportingDate) : undefined;
      });
    }
    return res;
  }
}
