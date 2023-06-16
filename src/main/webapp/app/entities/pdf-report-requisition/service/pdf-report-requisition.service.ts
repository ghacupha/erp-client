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
import { IPdfReportRequisition, NewPdfReportRequisition } from '../pdf-report-requisition.model';

export type PartialUpdatePdfReportRequisition = Partial<IPdfReportRequisition> & Pick<IPdfReportRequisition, 'id'>;

type RestOf<T extends IPdfReportRequisition | NewPdfReportRequisition> = Omit<T, 'reportDate'> & {
  reportDate?: string | null;
};

export type RestPdfReportRequisition = RestOf<IPdfReportRequisition>;

export type NewRestPdfReportRequisition = RestOf<NewPdfReportRequisition>;

export type PartialUpdateRestPdfReportRequisition = RestOf<PartialUpdatePdfReportRequisition>;

export type EntityResponseType = HttpResponse<IPdfReportRequisition>;
export type EntityArrayResponseType = HttpResponse<IPdfReportRequisition[]>;

@Injectable({ providedIn: 'root' })
export class PdfReportRequisitionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pdf-report-requisitions');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/pdf-report-requisitions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pdfReportRequisition: NewPdfReportRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pdfReportRequisition);
    return this.http
      .post<RestPdfReportRequisition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(pdfReportRequisition: IPdfReportRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pdfReportRequisition);
    return this.http
      .put<RestPdfReportRequisition>(`${this.resourceUrl}/${this.getPdfReportRequisitionIdentifier(pdfReportRequisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(pdfReportRequisition: PartialUpdatePdfReportRequisition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pdfReportRequisition);
    return this.http
      .patch<RestPdfReportRequisition>(`${this.resourceUrl}/${this.getPdfReportRequisitionIdentifier(pdfReportRequisition)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPdfReportRequisition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPdfReportRequisition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPdfReportRequisition[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getPdfReportRequisitionIdentifier(pdfReportRequisition: Pick<IPdfReportRequisition, 'id'>): number {
    return pdfReportRequisition.id;
  }

  comparePdfReportRequisition(o1: Pick<IPdfReportRequisition, 'id'> | null, o2: Pick<IPdfReportRequisition, 'id'> | null): boolean {
    return o1 && o2 ? this.getPdfReportRequisitionIdentifier(o1) === this.getPdfReportRequisitionIdentifier(o2) : o1 === o2;
  }

  addPdfReportRequisitionToCollectionIfMissing<Type extends Pick<IPdfReportRequisition, 'id'>>(
    pdfReportRequisitionCollection: Type[],
    ...pdfReportRequisitionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const pdfReportRequisitions: Type[] = pdfReportRequisitionsToCheck.filter(isPresent);
    if (pdfReportRequisitions.length > 0) {
      const pdfReportRequisitionCollectionIdentifiers = pdfReportRequisitionCollection.map(
        pdfReportRequisitionItem => this.getPdfReportRequisitionIdentifier(pdfReportRequisitionItem)!
      );
      const pdfReportRequisitionsToAdd = pdfReportRequisitions.filter(pdfReportRequisitionItem => {
        const pdfReportRequisitionIdentifier = this.getPdfReportRequisitionIdentifier(pdfReportRequisitionItem);
        if (pdfReportRequisitionCollectionIdentifiers.includes(pdfReportRequisitionIdentifier)) {
          return false;
        }
        pdfReportRequisitionCollectionIdentifiers.push(pdfReportRequisitionIdentifier);
        return true;
      });
      return [...pdfReportRequisitionsToAdd, ...pdfReportRequisitionCollection];
    }
    return pdfReportRequisitionCollection;
  }

  protected convertDateFromClient<T extends IPdfReportRequisition | NewPdfReportRequisition | PartialUpdatePdfReportRequisition>(
    pdfReportRequisition: T
  ): RestOf<T> {
    return {
      ...pdfReportRequisition,
      reportDate: pdfReportRequisition.reportDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restPdfReportRequisition: RestPdfReportRequisition): IPdfReportRequisition {
    return {
      ...restPdfReportRequisition,
      reportDate: restPdfReportRequisition.reportDate ? dayjs(restPdfReportRequisition.reportDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPdfReportRequisition>): HttpResponse<IPdfReportRequisition> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPdfReportRequisition[]>): HttpResponse<IPdfReportRequisition[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
