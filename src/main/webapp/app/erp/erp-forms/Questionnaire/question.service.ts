import { Injectable } from '@angular/core';
import {
  DropdownQuestion, IQuestionBase,
  QuestionBase,
  TextareaQuestion,
  TextboxQuestion
} from '../question-base/question-base.model';

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
}
