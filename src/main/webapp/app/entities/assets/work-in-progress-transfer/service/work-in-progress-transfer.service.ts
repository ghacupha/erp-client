import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IWorkInProgressTransfer, NewWorkInProgressTransfer } from '../work-in-progress-transfer.model';

export type PartialUpdateWorkInProgressTransfer = Partial<IWorkInProgressTransfer> & Pick<IWorkInProgressTransfer, 'id'>;

export type EntityResponseType = HttpResponse<IWorkInProgressTransfer>;
export type EntityArrayResponseType = HttpResponse<IWorkInProgressTransfer[]>;

@Injectable({ providedIn: 'root' })
export class WorkInProgressTransferService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/work-in-progress-transfers');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/work-in-progress-transfers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(workInProgressTransfer: NewWorkInProgressTransfer): Observable<EntityResponseType> {
    return this.http.post<IWorkInProgressTransfer>(this.resourceUrl, workInProgressTransfer, { observe: 'response' });
  }

  update(workInProgressTransfer: IWorkInProgressTransfer): Observable<EntityResponseType> {
    return this.http.put<IWorkInProgressTransfer>(
      `${this.resourceUrl}/${this.getWorkInProgressTransferIdentifier(workInProgressTransfer)}`,
      workInProgressTransfer,
      { observe: 'response' }
    );
  }

  partialUpdate(workInProgressTransfer: PartialUpdateWorkInProgressTransfer): Observable<EntityResponseType> {
    return this.http.patch<IWorkInProgressTransfer>(
      `${this.resourceUrl}/${this.getWorkInProgressTransferIdentifier(workInProgressTransfer)}`,
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

  getWorkInProgressTransferIdentifier(workInProgressTransfer: Pick<IWorkInProgressTransfer, 'id'>): number {
    return workInProgressTransfer.id;
  }

  compareWorkInProgressTransfer(o1: Pick<IWorkInProgressTransfer, 'id'> | null, o2: Pick<IWorkInProgressTransfer, 'id'> | null): boolean {
    return o1 && o2 ? this.getWorkInProgressTransferIdentifier(o1) === this.getWorkInProgressTransferIdentifier(o2) : o1 === o2;
  }

  addWorkInProgressTransferToCollectionIfMissing<Type extends Pick<IWorkInProgressTransfer, 'id'>>(
    workInProgressTransferCollection: Type[],
    ...workInProgressTransfersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const workInProgressTransfers: Type[] = workInProgressTransfersToCheck.filter(isPresent);
    if (workInProgressTransfers.length > 0) {
      const workInProgressTransferCollectionIdentifiers = workInProgressTransferCollection.map(
        workInProgressTransferItem => this.getWorkInProgressTransferIdentifier(workInProgressTransferItem)!
      );
      const workInProgressTransfersToAdd = workInProgressTransfers.filter(workInProgressTransferItem => {
        const workInProgressTransferIdentifier = this.getWorkInProgressTransferIdentifier(workInProgressTransferItem);
        if (workInProgressTransferCollectionIdentifiers.includes(workInProgressTransferIdentifier)) {
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
