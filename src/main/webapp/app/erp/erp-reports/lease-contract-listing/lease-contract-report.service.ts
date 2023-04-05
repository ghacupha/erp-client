///
/// Erp System - Mark III No 12 (Caleb Series) Client 1.2.7
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
import * as dayjs from 'dayjs';
import { map } from 'rxjs/operators';
import { ILeaseContract, ILeaseContractQuery } from './lease-contract-report.model';

type EntityArrayResponseType = HttpResponse<ILeaseContract[]>;

@Injectable({ providedIn: 'root' })
export class LeaseContractReportService {
  public resourceUrl = SERVER_API_URL + 'api/leases/contract-listing';

  constructor(protected http: HttpClient) {}

  query(reportQuery: ILeaseContractQuery): Observable<EntityArrayResponseType> {
    return this.http.post<ILeaseContract[]>(this.resourceUrl, reportQuery, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((listItem: ILeaseContract) => {
        listItem.timeOfRequisition = listItem.timeOfRequisition ? dayjs(listItem.timeOfRequisition): undefined;
      });
    }
    return res;
  }
}
