import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IQuestionBase, QuestionBase } from '../../../question-base/question-base.model';
import { ControlTypes } from '../../../../erp-common/enumerations/control-types.model';
import { DynamicQuestion } from '../../dynamic-question.model';
import { map } from 'rxjs/operators';
import { EntityArrayResponseType } from '../../../question-base/service/question-base.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { createRequestOption } from '../../../../../core/request/request-util';

@Injectable({providedIn: 'root'})
export class MockQuestionBaseService {

  protected resourceUrl = 'src/test/javascript/assets/question-base.json';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private mockQuestions(req?: any): Observable<HttpResponse<IQuestionBase[]>> {

    const queries: IQuestionBase[] = [
      {
        ...new QuestionBase(),
        id: 1001,
        context: 'Payments',
        serial: 'f102727b-1b31-4d90-8228-61496c0b8032',
        questionBaseValue: '',
        questionBaseKey: 'gender',
        questionBaseLabel: 'Gender',
        required: true,
        order: 1,
        controlType: ControlTypes.TEXTBOX,
        placeholder: '',
        iterable: false,
        parameters: [],
        placeholderItems: [],
      },
      {
        ...new QuestionBase(),
        id: 1001,
        context: 'Payments',
        serial: '86ffcc9d-1ba2-4af6-aa95-f182d4622023',
        questionBaseValue: '',
        questionBaseKey: 'profession',
        questionBaseLabel: 'Profession',
        required: true,
        order: 3,
        controlType: ControlTypes.TEXTBOX,
        placeholder: '',
        iterable: false,
        parameters: [],
        placeholderItems: [],
      },
      {
        ...new QuestionBase(),
        id: 1001,
        context: 'Payments',
        serial: 'ccf1812e-ee50-47f6-be4d-e2693730fbc8',
        questionBaseValue: '',
        questionBaseKey: 'address',
        questionBaseLabel: 'Address',
        required: true,
        order: 3,
        controlType: ControlTypes.TEXTBOX,
        placeholder: '',
        iterable: false,
        parameters: [],
        placeholderItems: [],
      },
    ];

    const mockHeaders: HttpHeaders = new HttpHeaders();

    const response: HttpResponse<IQuestionBase[]> = {
        headers: mockHeaders,
        ok: true,
        status: 200,
        statusText: '',
        url: null,
        body: queries,
    };

    return of(response)
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
