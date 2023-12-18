///
/// Erp System - Mark IX No 3 (Iddo Series) Client 1.6.4
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
import {
  IWorkInProgressOutstandingReport,
  getWorkInProgressOutstandingReportIdentifier,
} from '../work-in-progress-outstanding-report.model';

export type EntityResponseType = HttpResponse<IWorkInProgressOutstandingReport>;
export type EntityArrayResponseType = HttpResponse<IWorkInProgressOutstandingReport[]>;

@Injectable({ providedIn: 'root' })
export class WorkInProgressOutstandingReportService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/work-in-progress-outstanding-reports');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/work-in-progress-outstanding-reports');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWorkInProgressOutstandingReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorkInProgressOutstandingReport[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorkInProgressOutstandingReport[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addWorkInProgressOutstandingReportToCollectionIfMissing(
    workInProgressOutstandingReportCollection: IWorkInProgressOutstandingReport[],
    ...workInProgressOutstandingReportsToCheck: (IWorkInProgressOutstandingReport | null | undefined)[]
  ): IWorkInProgressOutstandingReport[] {
    const workInProgressOutstandingReports: IWorkInProgressOutstandingReport[] = workInProgressOutstandingReportsToCheck.filter(isPresent);
    if (workInProgressOutstandingReports.length > 0) {
      const workInProgressOutstandingReportCollectionIdentifiers = workInProgressOutstandingReportCollection.map(
        workInProgressOutstandingReportItem => getWorkInProgressOutstandingReportIdentifier(workInProgressOutstandingReportItem)!
      );
      const workInProgressOutstandingReportsToAdd = workInProgressOutstandingReports.filter(workInProgressOutstandingReportItem => {
        const workInProgressOutstandingReportIdentifier = getWorkInProgressOutstandingReportIdentifier(workInProgressOutstandingReportItem);
        if (
          workInProgressOutstandingReportIdentifier == null ||
          workInProgressOutstandingReportCollectionIdentifiers.includes(workInProgressOutstandingReportIdentifier)
        ) {
          return false;
        }
        workInProgressOutstandingReportCollectionIdentifiers.push(workInProgressOutstandingReportIdentifier);
        return true;
      });
      return [...workInProgressOutstandingReportsToAdd, ...workInProgressOutstandingReportCollection];
    }
    return workInProgressOutstandingReportCollection;
  }
}
