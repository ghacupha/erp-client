import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IBusinessDocument, NewBusinessDocument } from '../business-document.model';

export type PartialUpdateBusinessDocument = Partial<IBusinessDocument> & Pick<IBusinessDocument, 'id'>;

type RestOf<T extends IBusinessDocument | NewBusinessDocument> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestBusinessDocument = RestOf<IBusinessDocument>;

export type NewRestBusinessDocument = RestOf<NewBusinessDocument>;

export type PartialUpdateRestBusinessDocument = RestOf<PartialUpdateBusinessDocument>;

export type EntityResponseType = HttpResponse<IBusinessDocument>;
export type EntityArrayResponseType = HttpResponse<IBusinessDocument[]>;

@Injectable({ providedIn: 'root' })
export class BusinessDocumentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/business-documents');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/business-documents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(businessDocument: NewBusinessDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(businessDocument);
    return this.http
      .post<RestBusinessDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(businessDocument: IBusinessDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(businessDocument);
    return this.http
      .put<RestBusinessDocument>(`${this.resourceUrl}/${this.getBusinessDocumentIdentifier(businessDocument)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(businessDocument: PartialUpdateBusinessDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(businessDocument);
    return this.http
      .patch<RestBusinessDocument>(`${this.resourceUrl}/${this.getBusinessDocumentIdentifier(businessDocument)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestBusinessDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestBusinessDocument[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestBusinessDocument[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getBusinessDocumentIdentifier(businessDocument: Pick<IBusinessDocument, 'id'>): number {
    return businessDocument.id;
  }

  compareBusinessDocument(o1: Pick<IBusinessDocument, 'id'> | null, o2: Pick<IBusinessDocument, 'id'> | null): boolean {
    return o1 && o2 ? this.getBusinessDocumentIdentifier(o1) === this.getBusinessDocumentIdentifier(o2) : o1 === o2;
  }

  addBusinessDocumentToCollectionIfMissing<Type extends Pick<IBusinessDocument, 'id'>>(
    businessDocumentCollection: Type[],
    ...businessDocumentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const businessDocuments: Type[] = businessDocumentsToCheck.filter(isPresent);
    if (businessDocuments.length > 0) {
      const businessDocumentCollectionIdentifiers = businessDocumentCollection.map(
        businessDocumentItem => this.getBusinessDocumentIdentifier(businessDocumentItem)!
      );
      const businessDocumentsToAdd = businessDocuments.filter(businessDocumentItem => {
        const businessDocumentIdentifier = this.getBusinessDocumentIdentifier(businessDocumentItem);
        if (businessDocumentCollectionIdentifiers.includes(businessDocumentIdentifier)) {
          return false;
        }
        businessDocumentCollectionIdentifiers.push(businessDocumentIdentifier);
        return true;
      });
      return [...businessDocumentsToAdd, ...businessDocumentCollection];
    }
    return businessDocumentCollection;
  }

  protected convertDateFromClient<T extends IBusinessDocument | NewBusinessDocument | PartialUpdateBusinessDocument>(
    businessDocument: T
  ): RestOf<T> {
    return {
      ...businessDocument,
      lastModified: businessDocument.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restBusinessDocument: RestBusinessDocument): IBusinessDocument {
    return {
      ...restBusinessDocument,
      lastModified: restBusinessDocument.lastModified ? dayjs(restBusinessDocument.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestBusinessDocument>): HttpResponse<IBusinessDocument> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestBusinessDocument[]>): HttpResponse<IBusinessDocument[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
