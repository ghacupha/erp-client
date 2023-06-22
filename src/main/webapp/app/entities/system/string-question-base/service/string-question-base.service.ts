import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IStringQuestionBase, NewStringQuestionBase } from '../string-question-base.model';

export type PartialUpdateStringQuestionBase = Partial<IStringQuestionBase> & Pick<IStringQuestionBase, 'id'>;

export type EntityResponseType = HttpResponse<IStringQuestionBase>;
export type EntityArrayResponseType = HttpResponse<IStringQuestionBase[]>;

@Injectable({ providedIn: 'root' })
export class StringQuestionBaseService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/string-question-bases');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/string-question-bases');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(stringQuestionBase: NewStringQuestionBase): Observable<EntityResponseType> {
    return this.http.post<IStringQuestionBase>(this.resourceUrl, stringQuestionBase, { observe: 'response' });
  }

  update(stringQuestionBase: IStringQuestionBase): Observable<EntityResponseType> {
    return this.http.put<IStringQuestionBase>(
      `${this.resourceUrl}/${this.getStringQuestionBaseIdentifier(stringQuestionBase)}`,
      stringQuestionBase,
      { observe: 'response' }
    );
  }

  partialUpdate(stringQuestionBase: PartialUpdateStringQuestionBase): Observable<EntityResponseType> {
    return this.http.patch<IStringQuestionBase>(
      `${this.resourceUrl}/${this.getStringQuestionBaseIdentifier(stringQuestionBase)}`,
      stringQuestionBase,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStringQuestionBase>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStringQuestionBase[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStringQuestionBase[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getStringQuestionBaseIdentifier(stringQuestionBase: Pick<IStringQuestionBase, 'id'>): number {
    return stringQuestionBase.id;
  }

  compareStringQuestionBase(o1: Pick<IStringQuestionBase, 'id'> | null, o2: Pick<IStringQuestionBase, 'id'> | null): boolean {
    return o1 && o2 ? this.getStringQuestionBaseIdentifier(o1) === this.getStringQuestionBaseIdentifier(o2) : o1 === o2;
  }

  addStringQuestionBaseToCollectionIfMissing<Type extends Pick<IStringQuestionBase, 'id'>>(
    stringQuestionBaseCollection: Type[],
    ...stringQuestionBasesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const stringQuestionBases: Type[] = stringQuestionBasesToCheck.filter(isPresent);
    if (stringQuestionBases.length > 0) {
      const stringQuestionBaseCollectionIdentifiers = stringQuestionBaseCollection.map(
        stringQuestionBaseItem => this.getStringQuestionBaseIdentifier(stringQuestionBaseItem)!
      );
      const stringQuestionBasesToAdd = stringQuestionBases.filter(stringQuestionBaseItem => {
        const stringQuestionBaseIdentifier = this.getStringQuestionBaseIdentifier(stringQuestionBaseItem);
        if (stringQuestionBaseCollectionIdentifiers.includes(stringQuestionBaseIdentifier)) {
          return false;
        }
        stringQuestionBaseCollectionIdentifiers.push(stringQuestionBaseIdentifier);
        return true;
      });
      return [...stringQuestionBasesToAdd, ...stringQuestionBaseCollection];
    }
    return stringQuestionBaseCollection;
  }
}
