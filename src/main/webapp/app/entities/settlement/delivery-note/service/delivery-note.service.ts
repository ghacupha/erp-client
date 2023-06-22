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
import { IDeliveryNote, NewDeliveryNote } from '../delivery-note.model';

export type PartialUpdateDeliveryNote = Partial<IDeliveryNote> & Pick<IDeliveryNote, 'id'>;

type RestOf<T extends IDeliveryNote | NewDeliveryNote> = Omit<T, 'documentDate'> & {
  documentDate?: string | null;
};

export type RestDeliveryNote = RestOf<IDeliveryNote>;

export type NewRestDeliveryNote = RestOf<NewDeliveryNote>;

export type PartialUpdateRestDeliveryNote = RestOf<PartialUpdateDeliveryNote>;

export type EntityResponseType = HttpResponse<IDeliveryNote>;
export type EntityArrayResponseType = HttpResponse<IDeliveryNote[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryNoteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/delivery-notes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/delivery-notes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(deliveryNote: NewDeliveryNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliveryNote);
    return this.http
      .post<RestDeliveryNote>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(deliveryNote: IDeliveryNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliveryNote);
    return this.http
      .put<RestDeliveryNote>(`${this.resourceUrl}/${this.getDeliveryNoteIdentifier(deliveryNote)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(deliveryNote: PartialUpdateDeliveryNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliveryNote);
    return this.http
      .patch<RestDeliveryNote>(`${this.resourceUrl}/${this.getDeliveryNoteIdentifier(deliveryNote)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDeliveryNote>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDeliveryNote[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDeliveryNote[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getDeliveryNoteIdentifier(deliveryNote: Pick<IDeliveryNote, 'id'>): number {
    return deliveryNote.id;
  }

  compareDeliveryNote(o1: Pick<IDeliveryNote, 'id'> | null, o2: Pick<IDeliveryNote, 'id'> | null): boolean {
    return o1 && o2 ? this.getDeliveryNoteIdentifier(o1) === this.getDeliveryNoteIdentifier(o2) : o1 === o2;
  }

  addDeliveryNoteToCollectionIfMissing<Type extends Pick<IDeliveryNote, 'id'>>(
    deliveryNoteCollection: Type[],
    ...deliveryNotesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const deliveryNotes: Type[] = deliveryNotesToCheck.filter(isPresent);
    if (deliveryNotes.length > 0) {
      const deliveryNoteCollectionIdentifiers = deliveryNoteCollection.map(
        deliveryNoteItem => this.getDeliveryNoteIdentifier(deliveryNoteItem)!
      );
      const deliveryNotesToAdd = deliveryNotes.filter(deliveryNoteItem => {
        const deliveryNoteIdentifier = this.getDeliveryNoteIdentifier(deliveryNoteItem);
        if (deliveryNoteCollectionIdentifiers.includes(deliveryNoteIdentifier)) {
          return false;
        }
        deliveryNoteCollectionIdentifiers.push(deliveryNoteIdentifier);
        return true;
      });
      return [...deliveryNotesToAdd, ...deliveryNoteCollection];
    }
    return deliveryNoteCollection;
  }

  protected convertDateFromClient<T extends IDeliveryNote | NewDeliveryNote | PartialUpdateDeliveryNote>(deliveryNote: T): RestOf<T> {
    return {
      ...deliveryNote,
      documentDate: deliveryNote.documentDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDeliveryNote: RestDeliveryNote): IDeliveryNote {
    return {
      ...restDeliveryNote,
      documentDate: restDeliveryNote.documentDate ? dayjs(restDeliveryNote.documentDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDeliveryNote>): HttpResponse<IDeliveryNote> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDeliveryNote[]>): HttpResponse<IDeliveryNote[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
