import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICreditNote, getCreditNoteIdentifier } from '../credit-note.model';

export type EntityResponseType = HttpResponse<ICreditNote>;
export type EntityArrayResponseType = HttpResponse<ICreditNote[]>;

@Injectable({ providedIn: 'root' })
export class CreditNoteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/credit-notes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/credit-notes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(creditNote: ICreditNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditNote);
    return this.http
      .post<ICreditNote>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(creditNote: ICreditNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditNote);
    return this.http
      .put<ICreditNote>(`${this.resourceUrl}/${getCreditNoteIdentifier(creditNote) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(creditNote: ICreditNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditNote);
    return this.http
      .patch<ICreditNote>(`${this.resourceUrl}/${getCreditNoteIdentifier(creditNote) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICreditNote>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICreditNote[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICreditNote[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addCreditNoteToCollectionIfMissing(
    creditNoteCollection: ICreditNote[],
    ...creditNotesToCheck: (ICreditNote | null | undefined)[]
  ): ICreditNote[] {
    const creditNotes: ICreditNote[] = creditNotesToCheck.filter(isPresent);
    if (creditNotes.length > 0) {
      const creditNoteCollectionIdentifiers = creditNoteCollection.map(creditNoteItem => getCreditNoteIdentifier(creditNoteItem)!);
      const creditNotesToAdd = creditNotes.filter(creditNoteItem => {
        const creditNoteIdentifier = getCreditNoteIdentifier(creditNoteItem);
        if (creditNoteIdentifier == null || creditNoteCollectionIdentifiers.includes(creditNoteIdentifier)) {
          return false;
        }
        creditNoteCollectionIdentifiers.push(creditNoteIdentifier);
        return true;
      });
      return [...creditNotesToAdd, ...creditNoteCollection];
    }
    return creditNoteCollection;
  }

  protected convertDateFromClient(creditNote: ICreditNote): ICreditNote {
    return Object.assign({}, creditNote, {
      creditNoteDate: creditNote.creditNoteDate?.isValid() ? creditNote.creditNoteDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creditNoteDate = res.body.creditNoteDate ? dayjs(res.body.creditNoteDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((creditNote: ICreditNote) => {
        creditNote.creditNoteDate = creditNote.creditNoteDate ? dayjs(creditNote.creditNoteDate) : undefined;
      });
    }
    return res;
  }
}
