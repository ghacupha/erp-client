import { Component } from '@angular/core';
import { QuestionService } from '../../question.service';
import { Observable } from 'rxjs';
import { DynamicQuestion } from '../../dynamic-question.model';

@Component({
  selector: 'jhi-sample-client',
  templateUrl: './sample-client.component.html',
  providers:  [QuestionService]
})
export class SampleClientComponent {
  questions$: Observable<DynamicQuestion<any>[]>;

  constructor(service: QuestionService) {
    // Apply mapping using the QuestionBase entity
    this.questions$ = service.getQuestions();
  }
}
