///
/// Erp System - Mark III No 6 (Caleb Series) Client 0.7.0
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IQuestionBase, getQuestionBaseIdentifier } from '../question-base.model';
import { DynamicQuestion } from '../../Questionnaire/dynamic-question.model';
import { ControlTypes } from '../../../erp-common/enumerations/control-types.model';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<IQuestionBase>;
export type EntityArrayResponseType = HttpResponse<IQuestionBase[]>;

@Injectable({ providedIn: 'root' })
export class QuestionBaseService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/design-report/question-bases');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/design-report/_search/question-bases');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(questionBase: IQuestionBase): Observable<EntityResponseType> {
    return this.http.post<IQuestionBase>(this.resourceUrl, questionBase, { observe: 'response' });
  }

  update(questionBase: IQuestionBase): Observable<EntityResponseType> {
    return this.http.put<IQuestionBase>(`${this.resourceUrl}/${getQuestionBaseIdentifier(questionBase) as number}`, questionBase, {
      observe: 'response',
    });
  }

  partialUpdate(questionBase: IQuestionBase): Observable<EntityResponseType> {
    return this.http.patch<IQuestionBase>(`${this.resourceUrl}/${getQuestionBaseIdentifier(questionBase) as number}`, questionBase, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuestionBase>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuestionBase[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getQuestions(req?: any): Observable<DynamicQuestion<string>[]> | undefined {
    return this.query(req)
      .pipe(map((res: EntityArrayResponseType) => this.convertQuestionsFromServer(res)))
      .pipe(map(questions => this.sortQuestionsFromServer(questions)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuestionBase[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addQuestionBaseToCollectionIfMissing(
    questionBaseCollection: IQuestionBase[],
    ...questionBasesToCheck: (IQuestionBase | null | undefined)[]
  ): IQuestionBase[] {
    const questionBases: IQuestionBase[] = questionBasesToCheck.filter(isPresent);
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

  private sortQuestionsFromServer(questions: DynamicQuestion<string>[]): DynamicQuestion<string>[] {
     return questions.sort((a, b) => a.order - b.order)
  }

  private convertQuestionsFromServer(res: EntityArrayResponseType): DynamicQuestion<string>[] {
    let keyCounter = 0;
    const questions: DynamicQuestion<string>[] = [];
    if (res.body) {
      res.body.forEach(question => {
        ++keyCounter;
        questions.push(this.mapQuestionToForm(question, keyCounter));
      })
    }
    return questions;
  }


  private mapQuestionToForm(question: IQuestionBase, keyCounter: number): DynamicQuestion<string> {
    return {
      value: question.questionBaseValue ?? '',
      controlType: this.controlTypeToStringMapping(question.controlType ?? ControlTypes.TEXTBOX),
      key: question.questionBaseKey ?? `key # ${keyCounter}`,
      label: question.questionBaseLabel ?? `label # ${keyCounter}`,
      options: [],
      order: question.order ?? keyCounter,
      required: question.required ?? false,
      type: this.controlTypeToStringMapping(question.controlType ?? ControlTypes.TEXTBOX),
    };
  }

  private controlTypeToStringMapping(controlType: ControlTypes): string {
    switch (controlType) {
      case ControlTypes.TEXTBOX: {
        return 'textbox';
      }
      case ControlTypes.DATETIME_LOCAL: {
        return 'datetime-local';
      }
      case ControlTypes.DATE: {
        return 'date';
      }
      case ControlTypes.PASSWORD: {
        return 'password';
      }
      case ControlTypes.NUMBER: {
        return 'number';
      }
      case ControlTypes.SEARCH: {
        return 'search';
      }
      case ControlTypes.EMAIL: {
        return 'email';
      }
      case ControlTypes.MONTH: {
        return 'month';
      }
      case ControlTypes.WEEK: {
        return 'week';
      }
      case ControlTypes.TEL: {
        return 'tel';
      }
      case ControlTypes.TEXTAREA: {
        return 'textarea';
      }
      default: {
        return 'textbox';
      }
    }
  }
}
