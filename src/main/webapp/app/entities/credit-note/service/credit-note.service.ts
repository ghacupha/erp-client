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
import { ICreditNote, NewCreditNote } from '../credit-note.model';

export type PartialUpdateCreditNote = Partial<ICreditNote> & Pick<ICreditNote, 'id'>;

type RestOf<T extends ICreditNote | NewCreditNote> = Omit<T, 'creditNoteDate'> & {
  creditNoteDate?: string | null;
};

export type RestCreditNote = RestOf<ICreditNote>;

export type NewRestCreditNote = RestOf<NewCreditNote>;

export type PartialUpdateRestCreditNote = RestOf<PartialUpdateCreditNote>;

export type EntityResponseType = HttpResponse<ICreditNote>;
export type EntityArrayResponseType = HttpResponse<ICreditNote[]>;

@Injectable({ providedIn: 'root' })
export class CreditNoteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/credit-notes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/credit-notes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(creditNote: NewCreditNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditNote);
    return this.http
      .post<RestCreditNote>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(creditNote: ICreditNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditNote);
    return this.http
      .put<RestCreditNote>(`${this.resourceUrl}/${this.getCreditNoteIdentifier(creditNote)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(creditNote: PartialUpdateCreditNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditNote);
    return this.http
      .patch<RestCreditNote>(`${this.resourceUrl}/${this.getCreditNoteIdentifier(creditNote)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCreditNote>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCreditNote[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCreditNote[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getCreditNoteIdentifier(creditNote: Pick<ICreditNote, 'id'>): number {
    return creditNote.id;
  }

  compareCreditNote(o1: Pick<ICreditNote, 'id'> | null, o2: Pick<ICreditNote, 'id'> | null): boolean {
    return o1 && o2 ? this.getCreditNoteIdentifier(o1) === this.getCreditNoteIdentifier(o2) : o1 === o2;
  }

  addCreditNoteToCollectionIfMissing<Type extends Pick<ICreditNote, 'id'>>(
    creditNoteCollection: Type[],
    ...creditNotesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const creditNotes: Type[] = creditNotesToCheck.filter(isPresent);
    if (creditNotes.length > 0) {
      const creditNoteCollectionIdentifiers = creditNoteCollection.map(creditNoteItem => this.getCreditNoteIdentifier(creditNoteItem)!);
      const creditNotesToAdd = creditNotes.filter(creditNoteItem => {
        const creditNoteIdentifier = this.getCreditNoteIdentifier(creditNoteItem);
        if (creditNoteCollectionIdentifiers.includes(creditNoteIdentifier)) {
          return false;
        }
        creditNoteCollectionIdentifiers.push(creditNoteIdentifier);
        return true;
      });
      return [...creditNotesToAdd, ...creditNoteCollection];
    }
    return creditNoteCollection;
  }

  protected convertDateFromClient<T extends ICreditNote | NewCreditNote | PartialUpdateCreditNote>(creditNote: T): RestOf<T> {
    return {
      ...creditNote,
      creditNoteDate: creditNote.creditNoteDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCreditNote: RestCreditNote): ICreditNote {
    return {
      ...restCreditNote,
      creditNoteDate: restCreditNote.creditNoteDate ? dayjs(restCreditNote.creditNoteDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCreditNote>): HttpResponse<ICreditNote> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCreditNote[]>): HttpResponse<ICreditNote[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
