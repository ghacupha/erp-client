import { Injectable } from '@angular/core';
import { IQuestionBase } from '../question-base/question-base.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
  toFormGroup(questions: IQuestionBase<any>[]): FormGroup {
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

        group.key = question.required ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || '');

      }

    });
    return new FormGroup(group);
  }

}
