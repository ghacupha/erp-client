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
import { ISettlement, NewSettlement } from '../settlement.model';

export type PartialUpdateSettlement = Partial<ISettlement> & Pick<ISettlement, 'id'>;

type RestOf<T extends ISettlement | NewSettlement> = Omit<T, 'paymentDate'> & {
  paymentDate?: string | null;
};

export type RestSettlement = RestOf<ISettlement>;

export type NewRestSettlement = RestOf<NewSettlement>;

export type PartialUpdateRestSettlement = RestOf<PartialUpdateSettlement>;

export type EntityResponseType = HttpResponse<ISettlement>;
export type EntityArrayResponseType = HttpResponse<ISettlement[]>;

@Injectable({ providedIn: 'root' })
export class SettlementService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payments/settlements');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/payments/_search/settlements');
  protected resourceSearchIndexUrl = this.applicationConfigService.getEndpointFor('api/payments/settlements/elasticsearch/re-index');
  protected resourceSystemIndexUrl = this.applicationConfigService.getEndpointFor('api/index/run-index');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(settlement: NewSettlement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(settlement);
    return this.http
      .post<RestSettlement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(settlement: ISettlement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(settlement);
    return this.http
      .put<RestSettlement>(`${this.resourceUrl}/${this.getSettlementIdentifier(settlement)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(settlement: PartialUpdateSettlement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(settlement);
    return this.http
      .patch<RestSettlement>(`${this.resourceUrl}/${this.getSettlementIdentifier(settlement)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSettlement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSettlement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSettlement[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getSettlementIdentifier(settlement: Pick<ISettlement, 'id'>): number {
    return settlement.id;
  }

  compareSettlement(o1: Pick<ISettlement, 'id'> | null, o2: Pick<ISettlement, 'id'> | null): boolean {
    return o1 && o2 ? this.getSettlementIdentifier(o1) === this.getSettlementIdentifier(o2) : o1 === o2;
  }

  addSettlementToCollectionIfMissing<Type extends Pick<ISettlement, 'id'>>(
    settlementCollection: Type[],
    ...settlementsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const settlements: Type[] = settlementsToCheck.filter(isPresent);
    if (settlements.length > 0) {
      const settlementCollectionIdentifiers = settlementCollection.map(settlementItem => this.getSettlementIdentifier(settlementItem)!);
      const settlementsToAdd = settlements.filter(settlementItem => {
        const settlementIdentifier = this.getSettlementIdentifier(settlementItem);
        if (settlementCollectionIdentifiers.includes(settlementIdentifier)) {
          return false;
        }
        settlementCollectionIdentifiers.push(settlementIdentifier);
        return true;
      });
      return [...settlementsToAdd, ...settlementCollection];
    }
    return settlementCollection;
  }

  protected convertDateFromClient<T extends ISettlement | NewSettlement | PartialUpdateSettlement>(settlement: T): RestOf<T> {
    return {
      ...settlement,
      paymentDate: settlement.paymentDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restSettlement: RestSettlement): ISettlement {
    return {
      ...restSettlement,
      paymentDate: restSettlement.paymentDate ? dayjs(restSettlement.paymentDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSettlement>): HttpResponse<ISettlement> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSettlement[]>): HttpResponse<ISettlement[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
