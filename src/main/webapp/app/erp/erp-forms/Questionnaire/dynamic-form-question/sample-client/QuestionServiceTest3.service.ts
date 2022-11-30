import { Injectable } from '@angular/core';
import { QuestionBaseService } from '../../../question-base/service/question-base.service';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { DropdownQuestion, DynamicQuestion, TextboxQuestion } from '../../dynamic-question.model';

@Injectable({providedIn: 'root'})
export class QuestionServiceTest3Service {

  keyCounter = 0;

  constructor(
    private questionBaseService: QuestionBaseService,
    private log: NGXLogger
  ) {
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
        order: 1
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 2
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 3
      })
    ];

    this.log.debug(`We are now pushing ${questions.length} elements to the question-service`)

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
