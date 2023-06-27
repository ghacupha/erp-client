///
/// Erp System - Mark III No 17 (Caleb Series) Client 1.3.9
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
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
import { Observable } from 'rxjs';
import { IQuestionBase} from '../../../question-base/question-base.model';
import { ControlTypes } from '../../../../erp-common/enumerations/control-types.model';
import { DynamicQuestion } from '../../dynamic-question.model';
import { map } from 'rxjs/operators';
import { EntityArrayResponseType } from '../../../question-base/service/question-base.service';
import { HttpClient} from '@angular/common/http';
import { createRequestOption } from '../../../../../core/request/request-util';

/**
 * Among other things we set out to create a service that would really fetch data from an external
 * resource, in this case a random file containing configurations for a form. This framework of configuration
 * of forms does not look so bad either, if only we could find out why only one item is picked from the entire
 * list of questions
 */
@Injectable({providedIn: 'root'})
export class MockQuestionBaseService {

  protected resourceUrl = 'content/json/question-base.json';

  constructor(protected http: HttpClient) {}

  getQuestions(req?: any): Observable<DynamicQuestion<string>[]> {
    const options = createRequestOption(req);
    return this.http.get<IQuestionBase[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertQuestionsFromServer(res)))
      .pipe(map(questions => this.sortQuestionsFromServer(questions)));
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
