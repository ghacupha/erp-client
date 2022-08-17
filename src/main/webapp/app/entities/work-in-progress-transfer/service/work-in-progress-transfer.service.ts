///
/// Erp System - Mark II No 26 (Baruch Series) Client 0.1.3-SNAPSHOT
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

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IWorkInProgressTransfer, getWorkInProgressTransferIdentifier } from '../work-in-progress-transfer.model';

export type EntityResponseType = HttpResponse<IWorkInProgressTransfer>;
export type EntityArrayResponseType = HttpResponse<IWorkInProgressTransfer[]>;

@Injectable({ providedIn: 'root' })
export class WorkInProgressTransferService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/work-in-progress-transfers');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/work-in-progress-transfers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(workInProgressTransfer: IWorkInProgressTransfer): Observable<EntityResponseType> {
    return this.http.post<IWorkInProgressTransfer>(this.resourceUrl, workInProgressTransfer, { observe: 'response' });
  }

  update(workInProgressTransfer: IWorkInProgressTransfer): Observable<EntityResponseType> {
    return this.http.put<IWorkInProgressTransfer>(
      `${this.resourceUrl}/${getWorkInProgressTransferIdentifier(workInProgressTransfer) as number}`,
      workInProgressTransfer,
      { observe: 'response' }
    );
  }

  partialUpdate(workInProgressTransfer: IWorkInProgressTransfer): Observable<EntityResponseType> {
    return this.http.patch<IWorkInProgressTransfer>(
      `${this.resourceUrl}/${getWorkInProgressTransferIdentifier(workInProgressTransfer) as number}`,
      workInProgressTransfer,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWorkInProgressTransfer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorkInProgressTransfer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorkInProgressTransfer[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addWorkInProgressTransferToCollectionIfMissing(
    workInProgressTransferCollection: IWorkInProgressTransfer[],
    ...workInProgressTransfersToCheck: (IWorkInProgressTransfer | null | undefined)[]
  ): IWorkInProgressTransfer[] {
    const workInProgressTransfers: IWorkInProgressTransfer[] = workInProgressTransfersToCheck.filter(isPresent);
    if (workInProgressTransfers.length > 0) {
      const workInProgressTransferCollectionIdentifiers = workInProgressTransferCollection.map(
        workInProgressTransferItem => getWorkInProgressTransferIdentifier(workInProgressTransferItem)!
      );
      const workInProgressTransfersToAdd = workInProgressTransfers.filter(workInProgressTransferItem => {
        const workInProgressTransferIdentifier = getWorkInProgressTransferIdentifier(workInProgressTransferItem);
        if (
          workInProgressTransferIdentifier == null ||
          workInProgressTransferCollectionIdentifiers.includes(workInProgressTransferIdentifier)
        ) {
          return false;
        }
        workInProgressTransferCollectionIdentifiers.push(workInProgressTransferIdentifier);
        return true;
      });
      return [...workInProgressTransfersToAdd, ...workInProgressTransferCollection];
    }
    return workInProgressTransferCollection;
  }
}
