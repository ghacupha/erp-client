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
import { IPrepaymentAmortization, NewPrepaymentAmortization } from '../prepayment-amortization.model';

export type PartialUpdatePrepaymentAmortization = Partial<IPrepaymentAmortization> & Pick<IPrepaymentAmortization, 'id'>;

type RestOf<T extends IPrepaymentAmortization | NewPrepaymentAmortization> = Omit<T, 'prepaymentPeriod'> & {
  prepaymentPeriod?: string | null;
};

export type RestPrepaymentAmortization = RestOf<IPrepaymentAmortization>;

export type NewRestPrepaymentAmortization = RestOf<NewPrepaymentAmortization>;

export type PartialUpdateRestPrepaymentAmortization = RestOf<PartialUpdatePrepaymentAmortization>;

export type EntityResponseType = HttpResponse<IPrepaymentAmortization>;
export type EntityArrayResponseType = HttpResponse<IPrepaymentAmortization[]>;

@Injectable({ providedIn: 'root' })
export class PrepaymentAmortizationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/prepayment-amortizations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/prepayment-amortizations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(prepaymentAmortization: NewPrepaymentAmortization): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentAmortization);
    return this.http
      .post<RestPrepaymentAmortization>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(prepaymentAmortization: IPrepaymentAmortization): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentAmortization);
    return this.http
      .put<RestPrepaymentAmortization>(`${this.resourceUrl}/${this.getPrepaymentAmortizationIdentifier(prepaymentAmortization)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(prepaymentAmortization: PartialUpdatePrepaymentAmortization): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentAmortization);
    return this.http
      .patch<RestPrepaymentAmortization>(`${this.resourceUrl}/${this.getPrepaymentAmortizationIdentifier(prepaymentAmortization)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPrepaymentAmortization>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPrepaymentAmortization[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPrepaymentAmortization[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getPrepaymentAmortizationIdentifier(prepaymentAmortization: Pick<IPrepaymentAmortization, 'id'>): number {
    return prepaymentAmortization.id;
  }

  comparePrepaymentAmortization(o1: Pick<IPrepaymentAmortization, 'id'> | null, o2: Pick<IPrepaymentAmortization, 'id'> | null): boolean {
    return o1 && o2 ? this.getPrepaymentAmortizationIdentifier(o1) === this.getPrepaymentAmortizationIdentifier(o2) : o1 === o2;
  }

  addPrepaymentAmortizationToCollectionIfMissing<Type extends Pick<IPrepaymentAmortization, 'id'>>(
    prepaymentAmortizationCollection: Type[],
    ...prepaymentAmortizationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const prepaymentAmortizations: Type[] = prepaymentAmortizationsToCheck.filter(isPresent);
    if (prepaymentAmortizations.length > 0) {
      const prepaymentAmortizationCollectionIdentifiers = prepaymentAmortizationCollection.map(
        prepaymentAmortizationItem => this.getPrepaymentAmortizationIdentifier(prepaymentAmortizationItem)!
      );
      const prepaymentAmortizationsToAdd = prepaymentAmortizations.filter(prepaymentAmortizationItem => {
        const prepaymentAmortizationIdentifier = this.getPrepaymentAmortizationIdentifier(prepaymentAmortizationItem);
        if (prepaymentAmortizationCollectionIdentifiers.includes(prepaymentAmortizationIdentifier)) {
          return false;
        }
        prepaymentAmortizationCollectionIdentifiers.push(prepaymentAmortizationIdentifier);
        return true;
      });
      return [...prepaymentAmortizationsToAdd, ...prepaymentAmortizationCollection];
    }
    return prepaymentAmortizationCollection;
  }

  protected convertDateFromClient<T extends IPrepaymentAmortization | NewPrepaymentAmortization | PartialUpdatePrepaymentAmortization>(
    prepaymentAmortization: T
  ): RestOf<T> {
    return {
      ...prepaymentAmortization,
      prepaymentPeriod: prepaymentAmortization.prepaymentPeriod?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restPrepaymentAmortization: RestPrepaymentAmortization): IPrepaymentAmortization {
    return {
      ...restPrepaymentAmortization,
      prepaymentPeriod: restPrepaymentAmortization.prepaymentPeriod ? dayjs(restPrepaymentAmortization.prepaymentPeriod) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPrepaymentAmortization>): HttpResponse<IPrepaymentAmortization> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPrepaymentAmortization[]>): HttpResponse<IPrepaymentAmortization[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
