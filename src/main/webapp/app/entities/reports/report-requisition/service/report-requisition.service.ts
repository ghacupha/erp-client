import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IReportRequisition, NewReportRequisition } from '../report-requisition.model';

export type PartialUpdateReportRequisition = Partial<IReportRequisition> & Pick<IReportRequisition, 'id'>;

type RestOf<T extends IReportRequisition | NewReportRequisition> = Omit<T, 'reportRequestTime'> & {
  reportRequestTime?: string | null;
};

export type RestReportRequisition = RestOf<IReportRequisition>;

export type NewRestReportRequisition = RestOf<NewReportRequisition>;

export type PartialUpdateRestReportRequisition = RestOf<PartialUpdateReportRequisition>;

export type EntityResponseType = HttpResponse<IReportRequisition>;
export type EntityArrayResponseType = HttpResponse<IReportRequisition[]>;

@Injectable({ providedIn: 'root' })
export class ReportRequisitionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/report-requisitions');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/report-requisitions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reportRequisition: NewReportRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reportRequisition);
    return this.http
      .post<RestReportRequisition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(reportRequisition: IReportRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reportRequisition);
    return this.http
      .put<RestReportRequisition>(`${this.resourceUrl}/${this.getReportRequisitionIdentifier(reportRequisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(reportRequisition: PartialUpdateReportRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reportRequisition);
    return this.http
      .patch<RestReportRequisition>(`${this.resourceUrl}/${this.getReportRequisitionIdentifier(reportRequisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestReportRequisition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestReportRequisition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestReportRequisition[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getReportRequisitionIdentifier(reportRequisition: Pick<IReportRequisition, 'id'>): number {
    return reportRequisition.id;
  }

  compareReportRequisition(o1: Pick<IReportRequisition, 'id'> | null, o2: Pick<IReportRequisition, 'id'> | null): boolean {
    return o1 && o2 ? this.getReportRequisitionIdentifier(o1) === this.getReportRequisitionIdentifier(o2) : o1 === o2;
  }

  addReportRequisitionToCollectionIfMissing<Type extends Pick<IReportRequisition, 'id'>>(
    reportRequisitionCollection: Type[],
    ...reportRequisitionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const reportRequisitions: Type[] = reportRequisitionsToCheck.filter(isPresent);
    if (reportRequisitions.length > 0) {
      const reportRequisitionCollectionIdentifiers = reportRequisitionCollection.map(
        reportRequisitionItem => this.getReportRequisitionIdentifier(reportRequisitionItem)!
      );
      const reportRequisitionsToAdd = reportRequisitions.filter(reportRequisitionItem => {
        const reportRequisitionIdentifier = this.getReportRequisitionIdentifier(reportRequisitionItem);
        if (reportRequisitionCollectionIdentifiers.includes(reportRequisitionIdentifier)) {
          return false;
        }
        reportRequisitionCollectionIdentifiers.push(reportRequisitionIdentifier);
        return true;
      });
      return [...reportRequisitionsToAdd, ...reportRequisitionCollection];
    }
    return reportRequisitionCollection;
  }

  protected convertDateFromClient<T extends IReportRequisition | NewReportRequisition | PartialUpdateReportRequisition>(
    reportRequisition: T
  ): RestOf<T> {
    return {
      ...reportRequisition,
      reportRequestTime: reportRequisition.reportRequestTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restReportRequisition: RestReportRequisition): IReportRequisition {
    return {
      ...restReportRequisition,
      reportRequestTime: restReportRequisition.reportRequestTime ? dayjs(restReportRequisition.reportRequestTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestReportRequisition>): HttpResponse<IReportRequisition> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestReportRequisition[]>): HttpResponse<IReportRequisition[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
