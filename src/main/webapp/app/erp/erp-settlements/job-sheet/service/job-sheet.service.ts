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
import { IJobSheet, NewJobSheet } from '../job-sheet.model';

export type PartialUpdateJobSheet = Partial<IJobSheet> & Pick<IJobSheet, 'id'>;

type RestOf<T extends IJobSheet | NewJobSheet> = Omit<T, 'jobSheetDate'> & {
  jobSheetDate?: string | null;
};

export type RestJobSheet = RestOf<IJobSheet>;

export type NewRestJobSheet = RestOf<NewJobSheet>;

export type PartialUpdateRestJobSheet = RestOf<PartialUpdateJobSheet>;

export type EntityResponseType = HttpResponse<IJobSheet>;
export type EntityArrayResponseType = HttpResponse<IJobSheet[]>;

@Injectable({ providedIn: 'root' })
export class JobSheetService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payments/job-sheets');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/payments/_search/job-sheets');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(jobSheet: NewJobSheet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobSheet);
    return this.http
      .post<RestJobSheet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(jobSheet: IJobSheet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobSheet);
    return this.http
      .put<RestJobSheet>(`${this.resourceUrl}/${this.getJobSheetIdentifier(jobSheet)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(jobSheet: PartialUpdateJobSheet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobSheet);
    return this.http
      .patch<RestJobSheet>(`${this.resourceUrl}/${this.getJobSheetIdentifier(jobSheet)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestJobSheet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestJobSheet[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestJobSheet[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getJobSheetIdentifier(jobSheet: Pick<IJobSheet, 'id'>): number {
    return jobSheet.id;
  }

  compareJobSheet(o1: Pick<IJobSheet, 'id'> | null, o2: Pick<IJobSheet, 'id'> | null): boolean {
    return o1 && o2 ? this.getJobSheetIdentifier(o1) === this.getJobSheetIdentifier(o2) : o1 === o2;
  }

  addJobSheetToCollectionIfMissing<Type extends Pick<IJobSheet, 'id'>>(
    jobSheetCollection: Type[],
    ...jobSheetsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const jobSheets: Type[] = jobSheetsToCheck.filter(isPresent);
    if (jobSheets.length > 0) {
      const jobSheetCollectionIdentifiers = jobSheetCollection.map(jobSheetItem => this.getJobSheetIdentifier(jobSheetItem)!);
      const jobSheetsToAdd = jobSheets.filter(jobSheetItem => {
        const jobSheetIdentifier = this.getJobSheetIdentifier(jobSheetItem);
        if (jobSheetCollectionIdentifiers.includes(jobSheetIdentifier)) {
          return false;
        }
        jobSheetCollectionIdentifiers.push(jobSheetIdentifier);
        return true;
      });
      return [...jobSheetsToAdd, ...jobSheetCollection];
    }
    return jobSheetCollection;
  }

  protected convertDateFromClient<T extends IJobSheet | NewJobSheet | PartialUpdateJobSheet>(jobSheet: T): RestOf<T> {
    return {
      ...jobSheet,
      jobSheetDate: jobSheet.jobSheetDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restJobSheet: RestJobSheet): IJobSheet {
    return {
      ...restJobSheet,
      jobSheetDate: restJobSheet.jobSheetDate ? dayjs(restJobSheet.jobSheetDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestJobSheet>): HttpResponse<IJobSheet> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestJobSheet[]>): HttpResponse<IJobSheet[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
