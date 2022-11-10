///
/// Erp System - Mark III No 3 (Caleb Series) Client 0.2.0-SNAPSHOT
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
import { Observable, of } from 'rxjs';
import { DropdownQuestion, DynamicQuestion, TextboxQuestion } from './dynamic-question.model';
import { QuestionBaseService } from '../question-base/service/question-base.service';
import { IQuestionBase } from '../question-base/question-base.model';
import { ControlTypes } from '../../erp-common/enumerations/control-types.model';

/**
 * @deprecated This is strictly a testing service and is here for demo purposes only.
 * It is a sample of a method that extracts data about a form from the backend
 */
@Injectable({providedIn: 'root'})
export class QuestionService {

  keyCounter = 0;

  constructor(private questionBaseService: QuestionBaseService) {
  }

  getQBQuestionS(req?: any): Observable<DynamicQuestion<string>[]> {
    const qns: DynamicQuestion<string>[] = [];

    this.questionBaseService.query(req).subscribe(questions => {
      ++this.keyCounter;
      questions.body?.forEach(question => {
        qns.push(this.mapQuestionToForm(question));
      });
    });

    return of(qns);
  }

  // TODO: get from a remote source of question metadata
  getQuestions(): Observable<DynamicQuestion<string>[]> {

    const questions: DynamicQuestion<string>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  private mapQuestionToForm(question: IQuestionBase): DynamicQuestion<string> {
    return {
      value: question.questionBaseValue ?? '',
      controlType: this.controlTypeToStringMapping(question.controlType ?? ControlTypes.TEXTBOX),
      key: question.questionBaseKey ?? `key # ${this.keyCounter}`,
      label: question.questionBaseLabel ?? `label # ${this.keyCounter}`,
      options: [],
      order: this.keyCounter,
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
