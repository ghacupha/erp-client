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
import { IFileUpload, NewFileUpload } from '../file-upload.model';

export type PartialUpdateFileUpload = Partial<IFileUpload> & Pick<IFileUpload, 'id'>;

type RestOf<T extends IFileUpload | NewFileUpload> = Omit<T, 'periodFrom' | 'periodTo'> & {
  periodFrom?: string | null;
  periodTo?: string | null;
};

export type RestFileUpload = RestOf<IFileUpload>;

export type NewRestFileUpload = RestOf<NewFileUpload>;

export type PartialUpdateRestFileUpload = RestOf<PartialUpdateFileUpload>;

export type EntityResponseType = HttpResponse<IFileUpload>;
export type EntityArrayResponseType = HttpResponse<IFileUpload[]>;

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/file-uploads');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/file-uploads');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fileUpload: NewFileUpload): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fileUpload);
    return this.http
      .post<RestFileUpload>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fileUpload: IFileUpload): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fileUpload);
    return this.http
      .put<RestFileUpload>(`${this.resourceUrl}/${this.getFileUploadIdentifier(fileUpload)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fileUpload: PartialUpdateFileUpload): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fileUpload);
    return this.http
      .patch<RestFileUpload>(`${this.resourceUrl}/${this.getFileUploadIdentifier(fileUpload)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFileUpload>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFileUpload[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFileUpload[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getFileUploadIdentifier(fileUpload: Pick<IFileUpload, 'id'>): number {
    return fileUpload.id;
  }

  compareFileUpload(o1: Pick<IFileUpload, 'id'> | null, o2: Pick<IFileUpload, 'id'> | null): boolean {
    return o1 && o2 ? this.getFileUploadIdentifier(o1) === this.getFileUploadIdentifier(o2) : o1 === o2;
  }

  addFileUploadToCollectionIfMissing<Type extends Pick<IFileUpload, 'id'>>(
    fileUploadCollection: Type[],
    ...fileUploadsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fileUploads: Type[] = fileUploadsToCheck.filter(isPresent);
    if (fileUploads.length > 0) {
      const fileUploadCollectionIdentifiers = fileUploadCollection.map(fileUploadItem => this.getFileUploadIdentifier(fileUploadItem)!);
      const fileUploadsToAdd = fileUploads.filter(fileUploadItem => {
        const fileUploadIdentifier = this.getFileUploadIdentifier(fileUploadItem);
        if (fileUploadCollectionIdentifiers.includes(fileUploadIdentifier)) {
          return false;
        }
        fileUploadCollectionIdentifiers.push(fileUploadIdentifier);
        return true;
      });
      return [...fileUploadsToAdd, ...fileUploadCollection];
    }
    return fileUploadCollection;
  }

  protected convertDateFromClient<T extends IFileUpload | NewFileUpload | PartialUpdateFileUpload>(fileUpload: T): RestOf<T> {
    return {
      ...fileUpload,
      periodFrom: fileUpload.periodFrom?.format(DATE_FORMAT) ?? null,
      periodTo: fileUpload.periodTo?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFileUpload: RestFileUpload): IFileUpload {
    return {
      ...restFileUpload,
      periodFrom: restFileUpload.periodFrom ? dayjs(restFileUpload.periodFrom) : undefined,
      periodTo: restFileUpload.periodTo ? dayjs(restFileUpload.periodTo) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFileUpload>): HttpResponse<IFileUpload> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFileUpload[]>): HttpResponse<IFileUpload[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
