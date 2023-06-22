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
import { IAmortizationSequence, NewAmortizationSequence } from '../amortization-sequence.model';

export type PartialUpdateAmortizationSequence = Partial<IAmortizationSequence> & Pick<IAmortizationSequence, 'id'>;

type RestOf<T extends IAmortizationSequence | NewAmortizationSequence> = Omit<
  T,
  'currentAmortizationDate' | 'previousAmortizationDate' | 'nextAmortizationDate'
> & {
  currentAmortizationDate?: string | null;
  previousAmortizationDate?: string | null;
  nextAmortizationDate?: string | null;
};

export type RestAmortizationSequence = RestOf<IAmortizationSequence>;

export type NewRestAmortizationSequence = RestOf<NewAmortizationSequence>;

export type PartialUpdateRestAmortizationSequence = RestOf<PartialUpdateAmortizationSequence>;

export type EntityResponseType = HttpResponse<IAmortizationSequence>;
export type EntityArrayResponseType = HttpResponse<IAmortizationSequence[]>;

@Injectable({ providedIn: 'root' })
export class AmortizationSequenceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/amortization-sequences');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/amortization-sequences');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(amortizationSequence: NewAmortizationSequence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(amortizationSequence);
    return this.http
      .post<RestAmortizationSequence>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(amortizationSequence: IAmortizationSequence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(amortizationSequence);
    return this.http
      .put<RestAmortizationSequence>(`${this.resourceUrl}/${this.getAmortizationSequenceIdentifier(amortizationSequence)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(amortizationSequence: PartialUpdateAmortizationSequence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(amortizationSequence);
    return this.http
      .patch<RestAmortizationSequence>(`${this.resourceUrl}/${this.getAmortizationSequenceIdentifier(amortizationSequence)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAmortizationSequence>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAmortizationSequence[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAmortizationSequence[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getAmortizationSequenceIdentifier(amortizationSequence: Pick<IAmortizationSequence, 'id'>): number {
    return amortizationSequence.id;
  }

  compareAmortizationSequence(o1: Pick<IAmortizationSequence, 'id'> | null, o2: Pick<IAmortizationSequence, 'id'> | null): boolean {
    return o1 && o2 ? this.getAmortizationSequenceIdentifier(o1) === this.getAmortizationSequenceIdentifier(o2) : o1 === o2;
  }

  addAmortizationSequenceToCollectionIfMissing<Type extends Pick<IAmortizationSequence, 'id'>>(
    amortizationSequenceCollection: Type[],
    ...amortizationSequencesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const amortizationSequences: Type[] = amortizationSequencesToCheck.filter(isPresent);
    if (amortizationSequences.length > 0) {
      const amortizationSequenceCollectionIdentifiers = amortizationSequenceCollection.map(
        amortizationSequenceItem => this.getAmortizationSequenceIdentifier(amortizationSequenceItem)!
      );
      const amortizationSequencesToAdd = amortizationSequences.filter(amortizationSequenceItem => {
        const amortizationSequenceIdentifier = this.getAmortizationSequenceIdentifier(amortizationSequenceItem);
        if (amortizationSequenceCollectionIdentifiers.includes(amortizationSequenceIdentifier)) {
          return false;
        }
        amortizationSequenceCollectionIdentifiers.push(amortizationSequenceIdentifier);
        return true;
      });
      return [...amortizationSequencesToAdd, ...amortizationSequenceCollection];
    }
    return amortizationSequenceCollection;
  }

  protected convertDateFromClient<T extends IAmortizationSequence | NewAmortizationSequence | PartialUpdateAmortizationSequence>(
    amortizationSequence: T
  ): RestOf<T> {
    return {
      ...amortizationSequence,
      currentAmortizationDate: amortizationSequence.currentAmortizationDate?.format(DATE_FORMAT) ?? null,
      previousAmortizationDate: amortizationSequence.previousAmortizationDate?.format(DATE_FORMAT) ?? null,
      nextAmortizationDate: amortizationSequence.nextAmortizationDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAmortizationSequence: RestAmortizationSequence): IAmortizationSequence {
    return {
      ...restAmortizationSequence,
      currentAmortizationDate: restAmortizationSequence.currentAmortizationDate
        ? dayjs(restAmortizationSequence.currentAmortizationDate)
        : undefined,
      previousAmortizationDate: restAmortizationSequence.previousAmortizationDate
        ? dayjs(restAmortizationSequence.previousAmortizationDate)
        : undefined,
      nextAmortizationDate: restAmortizationSequence.nextAmortizationDate
        ? dayjs(restAmortizationSequence.nextAmortizationDate)
        : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAmortizationSequence>): HttpResponse<IAmortizationSequence> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAmortizationSequence[]>): HttpResponse<IAmortizationSequence[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
