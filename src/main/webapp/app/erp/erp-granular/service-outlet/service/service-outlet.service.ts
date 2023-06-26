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
import { IServiceOutlet, NewServiceOutlet } from '../service-outlet.model';

export type PartialUpdateServiceOutlet = Partial<IServiceOutlet> & Pick<IServiceOutlet, 'id'>;

type RestOf<T extends IServiceOutlet | NewServiceOutlet> = Omit<
  T,
  'outletOpeningDate' | 'regulatorApprovalDate' | 'outletClosureDate' | 'dateLastModified'
> & {
  outletOpeningDate?: string | null;
  regulatorApprovalDate?: string | null;
  outletClosureDate?: string | null;
  dateLastModified?: string | null;
};

export type RestServiceOutlet = RestOf<IServiceOutlet>;

export type NewRestServiceOutlet = RestOf<NewServiceOutlet>;

export type PartialUpdateRestServiceOutlet = RestOf<PartialUpdateServiceOutlet>;

export type EntityResponseType = HttpResponse<IServiceOutlet>;
export type EntityArrayResponseType = HttpResponse<IServiceOutlet[]>;

@Injectable({ providedIn: 'root' })
export class ServiceOutletService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/service-outlets');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/service-outlets');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(serviceOutlet: NewServiceOutlet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceOutlet);
    return this.http
      .post<RestServiceOutlet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(serviceOutlet: IServiceOutlet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceOutlet);
    return this.http
      .put<RestServiceOutlet>(`${this.resourceUrl}/${this.getServiceOutletIdentifier(serviceOutlet)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(serviceOutlet: PartialUpdateServiceOutlet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceOutlet);
    return this.http
      .patch<RestServiceOutlet>(`${this.resourceUrl}/${this.getServiceOutletIdentifier(serviceOutlet)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestServiceOutlet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestServiceOutlet[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestServiceOutlet[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getServiceOutletIdentifier(serviceOutlet: Pick<IServiceOutlet, 'id'>): number {
    return serviceOutlet.id;
  }

  compareServiceOutlet(o1: Pick<IServiceOutlet, 'id'> | null, o2: Pick<IServiceOutlet, 'id'> | null): boolean {
    return o1 && o2 ? this.getServiceOutletIdentifier(o1) === this.getServiceOutletIdentifier(o2) : o1 === o2;
  }

  addServiceOutletToCollectionIfMissing<Type extends Pick<IServiceOutlet, 'id'>>(
    serviceOutletCollection: Type[],
    ...serviceOutletsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const serviceOutlets: Type[] = serviceOutletsToCheck.filter(isPresent);
    if (serviceOutlets.length > 0) {
      const serviceOutletCollectionIdentifiers = serviceOutletCollection.map(
        serviceOutletItem => this.getServiceOutletIdentifier(serviceOutletItem)!
      );
      const serviceOutletsToAdd = serviceOutlets.filter(serviceOutletItem => {
        const serviceOutletIdentifier = this.getServiceOutletIdentifier(serviceOutletItem);
        if (serviceOutletCollectionIdentifiers.includes(serviceOutletIdentifier)) {
          return false;
        }
        serviceOutletCollectionIdentifiers.push(serviceOutletIdentifier);
        return true;
      });
      return [...serviceOutletsToAdd, ...serviceOutletCollection];
    }
    return serviceOutletCollection;
  }

  protected convertDateFromClient<T extends IServiceOutlet | NewServiceOutlet | PartialUpdateServiceOutlet>(serviceOutlet: T): RestOf<T> {
    return {
      ...serviceOutlet,
      outletOpeningDate: serviceOutlet.outletOpeningDate?.format(DATE_FORMAT) ?? null,
      regulatorApprovalDate: serviceOutlet.regulatorApprovalDate?.format(DATE_FORMAT) ?? null,
      outletClosureDate: serviceOutlet.outletClosureDate?.format(DATE_FORMAT) ?? null,
      dateLastModified: serviceOutlet.dateLastModified?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restServiceOutlet: RestServiceOutlet): IServiceOutlet {
    return {
      ...restServiceOutlet,
      outletOpeningDate: restServiceOutlet.outletOpeningDate ? dayjs(restServiceOutlet.outletOpeningDate) : undefined,
      regulatorApprovalDate: restServiceOutlet.regulatorApprovalDate ? dayjs(restServiceOutlet.regulatorApprovalDate) : undefined,
      outletClosureDate: restServiceOutlet.outletClosureDate ? dayjs(restServiceOutlet.outletClosureDate) : undefined,
      dateLastModified: restServiceOutlet.dateLastModified ? dayjs(restServiceOutlet.dateLastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestServiceOutlet>): HttpResponse<IServiceOutlet> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestServiceOutlet[]>): HttpResponse<IServiceOutlet[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
