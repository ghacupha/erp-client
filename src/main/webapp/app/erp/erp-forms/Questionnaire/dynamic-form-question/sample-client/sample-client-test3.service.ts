import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { DropdownQuestion, DynamicQuestion, TextboxQuestion } from '../../dynamic-question.model';
import { HttpClient } from '@angular/common/http';
import { createRequestOption } from '../../../../../core/request/request-util';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SampleClientTest3Service {

  protected resourceUrl = 'content/json/sample3-dynamic-question.json';

  constructor(protected http: HttpClient, private log: NGXLogger) {}

  getQuestionsV3(req?: any): Observable<DynamicQuestion<string>[]> {
    const options = createRequestOption(req);
    return this.http.get<DynamicQuestion<string>[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(questions => questions.body ?? []))
      .pipe(map(questions => this.sortQuestionsFromServer(questions)));
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


  private sortQuestionsFromServer(questions: DynamicQuestion<string>[]): DynamicQuestion<string>[] {
    return questions.sort((a, b) => a.order - b.order)
  }
}
