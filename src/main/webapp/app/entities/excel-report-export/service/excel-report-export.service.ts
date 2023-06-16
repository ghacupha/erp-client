import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IExcelReportExport, NewExcelReportExport } from '../excel-report-export.model';

export type PartialUpdateExcelReportExport = Partial<IExcelReportExport> & Pick<IExcelReportExport, 'id'>;

type RestOf<T extends IExcelReportExport | NewExcelReportExport> = Omit<T, 'reportTimeStamp'> & {
  reportTimeStamp?: string | null;
};

export type RestExcelReportExport = RestOf<IExcelReportExport>;

export type NewRestExcelReportExport = RestOf<NewExcelReportExport>;

export type PartialUpdateRestExcelReportExport = RestOf<PartialUpdateExcelReportExport>;

export type EntityResponseType = HttpResponse<IExcelReportExport>;
export type EntityArrayResponseType = HttpResponse<IExcelReportExport[]>;

@Injectable({ providedIn: 'root' })
export class ExcelReportExportService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/excel-report-exports');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/excel-report-exports');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(excelReportExport: NewExcelReportExport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(excelReportExport);
    return this.http
      .post<RestExcelReportExport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(excelReportExport: IExcelReportExport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(excelReportExport);
    return this.http
      .put<RestExcelReportExport>(`${this.resourceUrl}/${this.getExcelReportExportIdentifier(excelReportExport)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(excelReportExport: PartialUpdateExcelReportExport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(excelReportExport);
    return this.http
      .patch<RestExcelReportExport>(`${this.resourceUrl}/${this.getExcelReportExportIdentifier(excelReportExport)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestExcelReportExport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestExcelReportExport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestExcelReportExport[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getExcelReportExportIdentifier(excelReportExport: Pick<IExcelReportExport, 'id'>): number {
    return excelReportExport.id;
  }

  compareExcelReportExport(o1: Pick<IExcelReportExport, 'id'> | null, o2: Pick<IExcelReportExport, 'id'> | null): boolean {
    return o1 && o2 ? this.getExcelReportExportIdentifier(o1) === this.getExcelReportExportIdentifier(o2) : o1 === o2;
  }

  addExcelReportExportToCollectionIfMissing<Type extends Pick<IExcelReportExport, 'id'>>(
    excelReportExportCollection: Type[],
    ...excelReportExportsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const excelReportExports: Type[] = excelReportExportsToCheck.filter(isPresent);
    if (excelReportExports.length > 0) {
      const excelReportExportCollectionIdentifiers = excelReportExportCollection.map(
        excelReportExportItem => this.getExcelReportExportIdentifier(excelReportExportItem)!
      );
      const excelReportExportsToAdd = excelReportExports.filter(excelReportExportItem => {
        const excelReportExportIdentifier = this.getExcelReportExportIdentifier(excelReportExportItem);
        if (excelReportExportCollectionIdentifiers.includes(excelReportExportIdentifier)) {
          return false;
        }
        excelReportExportCollectionIdentifiers.push(excelReportExportIdentifier);
        return true;
      });
      return [...excelReportExportsToAdd, ...excelReportExportCollection];
    }
    return excelReportExportCollection;
  }

  protected convertDateFromClient<T extends IExcelReportExport | NewExcelReportExport | PartialUpdateExcelReportExport>(
    excelReportExport: T
  ): RestOf<T> {
    return {
      ...excelReportExport,
      reportTimeStamp: excelReportExport.reportTimeStamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restExcelReportExport: RestExcelReportExport): IExcelReportExport {
    return {
      ...restExcelReportExport,
      reportTimeStamp: restExcelReportExport.reportTimeStamp ? dayjs(restExcelReportExport.reportTimeStamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestExcelReportExport>): HttpResponse<IExcelReportExport> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestExcelReportExport[]>): HttpResponse<IExcelReportExport[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
