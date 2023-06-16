import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IExcelReportExport, getExcelReportExportIdentifier } from '../excel-report-export.model';

export type EntityResponseType = HttpResponse<IExcelReportExport>;
export type EntityArrayResponseType = HttpResponse<IExcelReportExport[]>;

@Injectable({ providedIn: 'root' })
export class ExcelReportExportService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/excel-report-exports');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/excel-report-exports');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(excelReportExport: IExcelReportExport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(excelReportExport);
    return this.http
      .post<IExcelReportExport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(excelReportExport: IExcelReportExport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(excelReportExport);
    return this.http
      .put<IExcelReportExport>(`${this.resourceUrl}/${getExcelReportExportIdentifier(excelReportExport) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(excelReportExport: IExcelReportExport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(excelReportExport);
    return this.http
      .patch<IExcelReportExport>(`${this.resourceUrl}/${getExcelReportExportIdentifier(excelReportExport) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExcelReportExport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExcelReportExport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExcelReportExport[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addExcelReportExportToCollectionIfMissing(
    excelReportExportCollection: IExcelReportExport[],
    ...excelReportExportsToCheck: (IExcelReportExport | null | undefined)[]
  ): IExcelReportExport[] {
    const excelReportExports: IExcelReportExport[] = excelReportExportsToCheck.filter(isPresent);
    if (excelReportExports.length > 0) {
      const excelReportExportCollectionIdentifiers = excelReportExportCollection.map(
        excelReportExportItem => getExcelReportExportIdentifier(excelReportExportItem)!
      );
      const excelReportExportsToAdd = excelReportExports.filter(excelReportExportItem => {
        const excelReportExportIdentifier = getExcelReportExportIdentifier(excelReportExportItem);
        if (excelReportExportIdentifier == null || excelReportExportCollectionIdentifiers.includes(excelReportExportIdentifier)) {
          return false;
        }
        excelReportExportCollectionIdentifiers.push(excelReportExportIdentifier);
        return true;
      });
      return [...excelReportExportsToAdd, ...excelReportExportCollection];
    }
    return excelReportExportCollection;
  }

  protected convertDateFromClient(excelReportExport: IExcelReportExport): IExcelReportExport {
    return Object.assign({}, excelReportExport, {
      reportTimeStamp: excelReportExport.reportTimeStamp?.isValid() ? excelReportExport.reportTimeStamp.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.reportTimeStamp = res.body.reportTimeStamp ? dayjs(res.body.reportTimeStamp) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((excelReportExport: IExcelReportExport) => {
        excelReportExport.reportTimeStamp = excelReportExport.reportTimeStamp ? dayjs(excelReportExport.reportTimeStamp) : undefined;
      });
    }
    return res;
  }
}
