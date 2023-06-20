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
import { IXlsxReportRequisition, NewXlsxReportRequisition } from '../xlsx-report-requisition.model';

export type PartialUpdateXlsxReportRequisition = Partial<IXlsxReportRequisition> & Pick<IXlsxReportRequisition, 'id'>;

type RestOf<T extends IXlsxReportRequisition | NewXlsxReportRequisition> = Omit<T, 'reportDate'> & {
  reportDate?: string | null;
};

export type RestXlsxReportRequisition = RestOf<IXlsxReportRequisition>;

export type NewRestXlsxReportRequisition = RestOf<NewXlsxReportRequisition>;

export type PartialUpdateRestXlsxReportRequisition = RestOf<PartialUpdateXlsxReportRequisition>;

export type EntityResponseType = HttpResponse<IXlsxReportRequisition>;
export type EntityArrayResponseType = HttpResponse<IXlsxReportRequisition[]>;

@Injectable({ providedIn: 'root' })
export class XlsxReportRequisitionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/xlsx-report-requisitions');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/xlsx-report-requisitions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(xlsxReportRequisition: NewXlsxReportRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(xlsxReportRequisition);
    return this.http
      .post<RestXlsxReportRequisition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(xlsxReportRequisition: IXlsxReportRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(xlsxReportRequisition);
    return this.http
      .put<RestXlsxReportRequisition>(`${this.resourceUrl}/${this.getXlsxReportRequisitionIdentifier(xlsxReportRequisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(xlsxReportRequisition: PartialUpdateXlsxReportRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(xlsxReportRequisition);
    return this.http
      .patch<RestXlsxReportRequisition>(`${this.resourceUrl}/${this.getXlsxReportRequisitionIdentifier(xlsxReportRequisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestXlsxReportRequisition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestXlsxReportRequisition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestXlsxReportRequisition[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getXlsxReportRequisitionIdentifier(xlsxReportRequisition: Pick<IXlsxReportRequisition, 'id'>): number {
    return xlsxReportRequisition.id;
  }

  compareXlsxReportRequisition(o1: Pick<IXlsxReportRequisition, 'id'> | null, o2: Pick<IXlsxReportRequisition, 'id'> | null): boolean {
    return o1 && o2 ? this.getXlsxReportRequisitionIdentifier(o1) === this.getXlsxReportRequisitionIdentifier(o2) : o1 === o2;
  }

  addXlsxReportRequisitionToCollectionIfMissing<Type extends Pick<IXlsxReportRequisition, 'id'>>(
    xlsxReportRequisitionCollection: Type[],
    ...xlsxReportRequisitionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const xlsxReportRequisitions: Type[] = xlsxReportRequisitionsToCheck.filter(isPresent);
    if (xlsxReportRequisitions.length > 0) {
      const xlsxReportRequisitionCollectionIdentifiers = xlsxReportRequisitionCollection.map(
        xlsxReportRequisitionItem => this.getXlsxReportRequisitionIdentifier(xlsxReportRequisitionItem)!
      );
      const xlsxReportRequisitionsToAdd = xlsxReportRequisitions.filter(xlsxReportRequisitionItem => {
        const xlsxReportRequisitionIdentifier = this.getXlsxReportRequisitionIdentifier(xlsxReportRequisitionItem);
        if (xlsxReportRequisitionCollectionIdentifiers.includes(xlsxReportRequisitionIdentifier)) {
          return false;
        }
        xlsxReportRequisitionCollectionIdentifiers.push(xlsxReportRequisitionIdentifier);
        return true;
      });
      return [...xlsxReportRequisitionsToAdd, ...xlsxReportRequisitionCollection];
    }
    return xlsxReportRequisitionCollection;
  }

  protected convertDateFromClient<T extends IXlsxReportRequisition | NewXlsxReportRequisition | PartialUpdateXlsxReportRequisition>(
    xlsxReportRequisition: T
  ): RestOf<T> {
    return {
      ...xlsxReportRequisition,
      reportDate: xlsxReportRequisition.reportDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restXlsxReportRequisition: RestXlsxReportRequisition): IXlsxReportRequisition {
    return {
      ...restXlsxReportRequisition,
      reportDate: restXlsxReportRequisition.reportDate ? dayjs(restXlsxReportRequisition.reportDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestXlsxReportRequisition>): HttpResponse<IXlsxReportRequisition> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestXlsxReportRequisition[]>): HttpResponse<IXlsxReportRequisition[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
