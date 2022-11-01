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
import {
  DropdownQuestion,
  IQuestionBase,
  QuestionBase,
  TextareaQuestion,
  TextboxQuestion
} from '../question-base/question-base.model';
import { IStringQuestionBase, StringQuestionBase } from '../string-question-base/string-question-base.model';
import { ControlTypes } from '../../erp-common/enumerations/control-types.model';

/**
 * @deprecated This is strictly a testing service and is here for demo purposes only.
 * It is a sample of a method that extracts data about a form from the backend
 */
@Injectable({providedIn: 'root'})
export class QuestionService {

  getQuestions(): IQuestionBase<any>[] {

    const questions: QuestionBase<any>[] = [

      // TODO remove value
      new DropdownQuestion(
        1001,
        'val',
        'brave',
        'Bravery Rating',
        [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        true,
        3,
        'Select one option',
        false,
        [],
        []
      ),

      new TextboxQuestion(
        1002,
        'Bombasto',
        'firstName',
        'First name',
        true,
        1,
        'Provide first name',
        false,
      ),

      new TextboxQuestion(
        1005,
        'toto',
        'jobs',
        'Jobs',
        true,
        5,
      ),

      new TextboxQuestion(
        1006,
        70,
        'level',
        'Level',
        false,
        6,
        '',
        false,
        [],
        [],
        'range',
        20,
        200
      ),

      new TextboxQuestion(
        1010,
        'emailAddress',
        'emailAddress',
        'Email',
        false,
        2,
        '',
        false,
        [],
        [],
        'email'
      ),

      new TextareaQuestion(
        1012,
        'message',
        'message',
        'Message',
        false,
        4,
        'Your message here',
        false,
        [],
        [],
        30,
        10
      )
    ];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return questions.sort((a , b) => a.order ?? 0 - b.order ?? 1);
  }


  getStringQuestions(): IStringQuestionBase[] {

    const questions: IStringQuestionBase[] = [

      new StringQuestionBase(
        1001,
        'Edwin',
        'firstName',
        'First name',
        true,
        1,
        ControlTypes.TEXTBOX,
        'First Name',
        false,
      ),

      new StringQuestionBase(
        1002,
        'secondName',
        '',
        'Second name',
        false,
        2,
        ControlTypes.TEXTBOX,
        'First Name',
        false,
      ),

      new StringQuestionBase(
        1003,
        'emailAddress',
        'emailAddress',
        'Email',
        false,
        3,
        ControlTypes.TEXTBOX,
        'someone@erp-mail.com',
        false,
      ),

    ];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return questions.sort((a , b) => a.order ?? 0 - b.order ?? 1);
  }
}
