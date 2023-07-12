///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.5.1
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

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IDepreciationBatchSequence, getDepreciationBatchSequenceIdentifier } from '../depreciation-batch-sequence.model';

export type EntityResponseType = HttpResponse<IDepreciationBatchSequence>;
export type EntityArrayResponseType = HttpResponse<IDepreciationBatchSequence[]>;

@Injectable({ providedIn: 'root' })
export class DepreciationBatchSequenceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/depreciation-batch-sequences');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/depreciation-batch-sequences');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(depreciationBatchSequence: IDepreciationBatchSequence): Observable<EntityResponseType> {
    return this.http.post<IDepreciationBatchSequence>(this.resourceUrl, depreciationBatchSequence, { observe: 'response' });
  }

  update(depreciationBatchSequence: IDepreciationBatchSequence): Observable<EntityResponseType> {
    return this.http.put<IDepreciationBatchSequence>(
      `${this.resourceUrl}/${getDepreciationBatchSequenceIdentifier(depreciationBatchSequence) as number}`,
      depreciationBatchSequence,
      { observe: 'response' }
    );
  }

  partialUpdate(depreciationBatchSequence: IDepreciationBatchSequence): Observable<EntityResponseType> {
    return this.http.patch<IDepreciationBatchSequence>(
      `${this.resourceUrl}/${getDepreciationBatchSequenceIdentifier(depreciationBatchSequence) as number}`,
      depreciationBatchSequence,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepreciationBatchSequence>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepreciationBatchSequence[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepreciationBatchSequence[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addDepreciationBatchSequenceToCollectionIfMissing(
    depreciationBatchSequenceCollection: IDepreciationBatchSequence[],
    ...depreciationBatchSequencesToCheck: (IDepreciationBatchSequence | null | undefined)[]
  ): IDepreciationBatchSequence[] {
    const depreciationBatchSequences: IDepreciationBatchSequence[] = depreciationBatchSequencesToCheck.filter(isPresent);
    if (depreciationBatchSequences.length > 0) {
      const depreciationBatchSequenceCollectionIdentifiers = depreciationBatchSequenceCollection.map(
        depreciationBatchSequenceItem => getDepreciationBatchSequenceIdentifier(depreciationBatchSequenceItem)!
      );
      const depreciationBatchSequencesToAdd = depreciationBatchSequences.filter(depreciationBatchSequenceItem => {
        const depreciationBatchSequenceIdentifier = getDepreciationBatchSequenceIdentifier(depreciationBatchSequenceItem);
        if (
          depreciationBatchSequenceIdentifier == null ||
          depreciationBatchSequenceCollectionIdentifiers.includes(depreciationBatchSequenceIdentifier)
        ) {
          return false;
        }
        depreciationBatchSequenceCollectionIdentifiers.push(depreciationBatchSequenceIdentifier);
        return true;
      });
      return [...depreciationBatchSequencesToAdd, ...depreciationBatchSequenceCollection];
    }
    return depreciationBatchSequenceCollection;
  }
}
