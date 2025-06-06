///
/// Erp System - Mark X No 10 (Jehoiada Series) Client 1.7.8
/// Copyright © 2021 - 2024 Edwin Njeru (mailnjeru@gmail.com)
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
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IWIPListReport, getWIPListReportIdentifier } from '../wip-list-report.model';

export type EntityResponseType = HttpResponse<IWIPListReport>;
export type EntityArrayResponseType = HttpResponse<IWIPListReport[]>;

@Injectable({ providedIn: 'root' })
export class WIPListReportService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/wip-list-reports');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/wip-list-reports');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(wIPListReport: IWIPListReport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wIPListReport);
    return this.http
      .post<IWIPListReport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(wIPListReport: IWIPListReport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wIPListReport);
    return this.http
      .put<IWIPListReport>(`${this.resourceUrl}/${getWIPListReportIdentifier(wIPListReport) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(wIPListReport: IWIPListReport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wIPListReport);
    return this.http
      .patch<IWIPListReport>(`${this.resourceUrl}/${getWIPListReportIdentifier(wIPListReport) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWIPListReport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWIPListReport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWIPListReport[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addWIPListReportToCollectionIfMissing(
    wIPListReportCollection: IWIPListReport[],
    ...wIPListReportsToCheck: (IWIPListReport | null | undefined)[]
  ): IWIPListReport[] {
    const wIPListReports: IWIPListReport[] = wIPListReportsToCheck.filter(isPresent);
    if (wIPListReports.length > 0) {
      const wIPListReportCollectionIdentifiers = wIPListReportCollection.map(
        wIPListReportItem => getWIPListReportIdentifier(wIPListReportItem)!
      );
      const wIPListReportsToAdd = wIPListReports.filter(wIPListReportItem => {
        const wIPListReportIdentifier = getWIPListReportIdentifier(wIPListReportItem);
        if (wIPListReportIdentifier == null || wIPListReportCollectionIdentifiers.includes(wIPListReportIdentifier)) {
          return false;
        }
        wIPListReportCollectionIdentifiers.push(wIPListReportIdentifier);
        return true;
      });
      return [...wIPListReportsToAdd, ...wIPListReportCollection];
    }
    return wIPListReportCollection;
  }

  protected convertDateFromClient(wIPListReport: IWIPListReport): IWIPListReport {
    return Object.assign({}, wIPListReport, {
      timeOfRequest: wIPListReport.timeOfRequest?.isValid() ? wIPListReport.timeOfRequest.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timeOfRequest = res.body.timeOfRequest ? dayjs(res.body.timeOfRequest) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((wIPListReport: IWIPListReport) => {
        wIPListReport.timeOfRequest = wIPListReport.timeOfRequest ? dayjs(wIPListReport.timeOfRequest) : undefined;
      });
    }
    return res;
  }
}
