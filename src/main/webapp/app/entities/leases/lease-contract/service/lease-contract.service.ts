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
import { ILeaseContract, NewLeaseContract } from '../lease-contract.model';

export type PartialUpdateLeaseContract = Partial<ILeaseContract> & Pick<ILeaseContract, 'id'>;

type RestOf<T extends ILeaseContract | NewLeaseContract> = Omit<T, 'commencementDate' | 'terminalDate'> & {
  commencementDate?: string | null;
  terminalDate?: string | null;
};

export type RestLeaseContract = RestOf<ILeaseContract>;

export type NewRestLeaseContract = RestOf<NewLeaseContract>;

export type PartialUpdateRestLeaseContract = RestOf<PartialUpdateLeaseContract>;

export type EntityResponseType = HttpResponse<ILeaseContract>;
export type EntityArrayResponseType = HttpResponse<ILeaseContract[]>;

@Injectable({ providedIn: 'root' })
export class LeaseContractService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lease-contracts');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/lease-contracts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(leaseContract: NewLeaseContract): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseContract);
    return this.http
      .post<RestLeaseContract>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(leaseContract: ILeaseContract): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseContract);
    return this.http
      .put<RestLeaseContract>(`${this.resourceUrl}/${this.getLeaseContractIdentifier(leaseContract)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(leaseContract: PartialUpdateLeaseContract): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaseContract);
    return this.http
      .patch<RestLeaseContract>(`${this.resourceUrl}/${this.getLeaseContractIdentifier(leaseContract)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLeaseContract>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLeaseContract[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLeaseContract[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getLeaseContractIdentifier(leaseContract: Pick<ILeaseContract, 'id'>): number {
    return leaseContract.id;
  }

  compareLeaseContract(o1: Pick<ILeaseContract, 'id'> | null, o2: Pick<ILeaseContract, 'id'> | null): boolean {
    return o1 && o2 ? this.getLeaseContractIdentifier(o1) === this.getLeaseContractIdentifier(o2) : o1 === o2;
  }

  addLeaseContractToCollectionIfMissing<Type extends Pick<ILeaseContract, 'id'>>(
    leaseContractCollection: Type[],
    ...leaseContractsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const leaseContracts: Type[] = leaseContractsToCheck.filter(isPresent);
    if (leaseContracts.length > 0) {
      const leaseContractCollectionIdentifiers = leaseContractCollection.map(
        leaseContractItem => this.getLeaseContractIdentifier(leaseContractItem)!
      );
      const leaseContractsToAdd = leaseContracts.filter(leaseContractItem => {
        const leaseContractIdentifier = this.getLeaseContractIdentifier(leaseContractItem);
        if (leaseContractCollectionIdentifiers.includes(leaseContractIdentifier)) {
          return false;
        }
        leaseContractCollectionIdentifiers.push(leaseContractIdentifier);
        return true;
      });
      return [...leaseContractsToAdd, ...leaseContractCollection];
    }
    return leaseContractCollection;
  }

  protected convertDateFromClient<T extends ILeaseContract | NewLeaseContract | PartialUpdateLeaseContract>(leaseContract: T): RestOf<T> {
    return {
      ...leaseContract,
      commencementDate: leaseContract.commencementDate?.format(DATE_FORMAT) ?? null,
      terminalDate: leaseContract.terminalDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLeaseContract: RestLeaseContract): ILeaseContract {
    return {
      ...restLeaseContract,
      commencementDate: restLeaseContract.commencementDate ? dayjs(restLeaseContract.commencementDate) : undefined,
      terminalDate: restLeaseContract.terminalDate ? dayjs(restLeaseContract.terminalDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLeaseContract>): HttpResponse<ILeaseContract> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLeaseContract[]>): HttpResponse<ILeaseContract[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
