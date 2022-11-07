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
import { IQuestionBase, QuestionBase } from '../question-base/question-base.model';
// import { IStringQuestionBase, StringQuestionBase } from '../string-question-base/string-question-base.model';
import { ControlTypes } from '../../erp-common/enumerations/control-types.model';

/**
 * @deprecated This is strictly a testing service and is here for demo purposes only.
 * It is a sample of a method that extracts data about a form from the backend
 */
@Injectable({providedIn: 'root'})
export class QuestionService {

  getQuestions(): IQuestionBase[] {

    const questions: QuestionBase[] = [
      new QuestionBase(
        1002,
        'Heroes',
        'firstName',
        'Marcus',
        'firstName',
        'First name',
        true,
        2,
        ControlTypes.TEXTBOX,
        'First Name'
      ),
      new QuestionBase(
        1001,
        'Heroes',
        'secondName',
        'Aurelius',
        'secondName',
        'Second name',
        true,
        1,
        ControlTypes.TEXTBOX,
        'Second name'
      ),
    ];

    // if (questions.length !== 0) {
      return questions.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          if (a.order > b.order) {
            return 1;
          }
          if (a.order < b.order) {
            return -1;
          }
        }
        return 0;
      });
    // }
    // return questions;
  }


 // getStringQuestions(): IStringQuestionBase[] {
 //
 //    const questions: IStringQuestionBase[] = [
 //
 //      new StringQuestionBase(
 //        1001,
 //        'Edwin',
 //        'firstName',
 //        'First name',
 //        true,
 //        1,
 //        ControlTypes.TEXTBOX,
 //        'First Name',
 //        false,
 //      ),
 //
 //      new StringQuestionBase(
 //        1002,
 //        'secondName',
 //        '',
 //        'Second name',
 //        false,
 //        2,
 //        ControlTypes.TEXTBOX,
 //        'First Name',
 //        false,
 //      ),
 //
 //      new StringQuestionBase(
 //        1003,
 //        'emailAddress',
 //        'emailAddress',
 //        'Email',
 //        false,
 //        3,
 //        ControlTypes.TEXTBOX,
 //        'someone@erp-mail.com',
 //        false,
 //      ),
 //
 //    ];
 //
 //    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@typescript-eslint/ban-ts-comment
 //    // @ts-ignore
 //    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
 //    return questions.sort((a , b) => a.order ?? 0 - b.order ?? 1);
 //  }
}
