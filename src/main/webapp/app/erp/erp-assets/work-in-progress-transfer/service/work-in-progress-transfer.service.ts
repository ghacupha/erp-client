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
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset/work-in-progress-transfers');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset/_search/work-in-progress-transfers');

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
