import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IQuestionBase, getQuestionBaseIdentifier } from '../question-base.model';

export type EntityResponseType = HttpResponse<IQuestionBase<any>>;
export type EntityArrayResponseType = HttpResponse<IQuestionBase<any>[]>;

@Injectable({ providedIn: 'root' })
export class QuestionBaseService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/question-bases');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/question-bases');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(questionBase: IQuestionBase<any>): Observable<EntityResponseType> {
    return this.http.post<IQuestionBase<any>>(this.resourceUrl, questionBase, { observe: 'response' });
  }

  update(questionBase: IQuestionBase<any>): Observable<EntityResponseType> {
    return this.http.put<IQuestionBase<any>>(`${this.resourceUrl}/${getQuestionBaseIdentifier(questionBase) as number}`, questionBase, {
      observe: 'response',
    });
  }

  partialUpdate(questionBase: IQuestionBase<any>): Observable<EntityResponseType> {
    return this.http.patch<IQuestionBase<any>>(`${this.resourceUrl}/${getQuestionBaseIdentifier(questionBase) as number}`, questionBase, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuestionBase<any>>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuestionBase<any>[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuestionBase<any>[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addQuestionBaseToCollectionIfMissing(
    questionBaseCollection: IQuestionBase<any>[],
    ...questionBasesToCheck: (IQuestionBase<any> | null | undefined)[]
  ): IQuestionBase<any>[] {
    const questionBases: IQuestionBase<any>[] = questionBasesToCheck.filter(isPresent);
    if (questionBases.length > 0) {
      const questionBaseCollectionIdentifiers = questionBaseCollection.map(
        questionBaseItem => getQuestionBaseIdentifier(questionBaseItem)!
      );
      const questionBasesToAdd = questionBases.filter(questionBaseItem => {
        const questionBaseIdentifier = getQuestionBaseIdentifier(questionBaseItem);
        if (questionBaseIdentifier == null || questionBaseCollectionIdentifiers.includes(questionBaseIdentifier)) {
          return false;
        }
        questionBaseCollectionIdentifiers.push(questionBaseIdentifier);
        return true;
      });
      return [...questionBasesToAdd, ...questionBaseCollection];
    }
    return questionBaseCollection;
  }
}