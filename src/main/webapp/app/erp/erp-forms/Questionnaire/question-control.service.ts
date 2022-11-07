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
import { IQuestionBase } from '../question-base/question-base.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IStringQuestionBase } from '../string-question-base/string-question-base.model';

/**
 * This service received a series of question-base objects and constructs and returns
 * a form-group
 */
@Injectable({ providedIn: 'root'})
export class QuestionControlService {

  /**
   *
   * @param questions Array of QuestionBase objects defining the form-group
   */
  toFormGroup(questions: IQuestionBase[]): FormGroup {
    const group: any = {};

    questions.forEach(question => {

      if (question.iterable) {

        const tmpArray: FormArray = question.required ? new FormArray([]) : new FormArray([], Validators.required);

        if (!question.value || !question.value.length) {
          tmpArray.push(new FormControl(''));
        }

        group.key = tmpArray;

      } else {

        group.key = question.required ? new FormControl(question.value ?? '', Validators.required) : new FormControl(question.value ?? '');

      }

    });
    return new FormGroup(group);
  }

  /**
   *
   * @param questions Array of QuestionBase objects defining the form-group
   */
  toStringValueFormGroup(questions: IStringQuestionBase[]): FormGroup {
    const group: any = {};

    questions.forEach(question => {

      if (question.iterable) {

        if (!Array.isArray(question.value)) {
          question.value = question.value ? [question.value] : [''];
        }

        const tmpArray: FormArray = question.required ? new FormArray([]) : new FormArray([], Validators.required);

        if (!question.value || !question.value.length) {
          tmpArray.push(new FormControl(''));
        } else {
          question.value.forEach((val: any) => {
            tmpArray.push(new FormControl(val));
          });
        }

        group.key = tmpArray;

      } else {

        group.key = question.required ? new FormControl(question.value ?? '', Validators.required)
          : new FormControl(question.value ?? '');

      }

    });
    return new FormGroup(group);
  }

}
