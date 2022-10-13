import { Component, VERSION } from '@angular/core';
import { QuestionService } from '../../question.service';

/**
 * This component used the question-service to provide configuration for the
 * dynamic-form, using the #getQuestions method
 */
@Component({
  selector: 'jhi-sample-dynamic-form',
  templateUrl: './sample-dynamic-form.component.html',
  styleUrls: ['./sample-dynamic-form.component.scss']
})
export class SampleDynamicFormComponent {

  questions: any[];
  version = VERSION.full;

  constructor(service: QuestionService) {
    this.questions = service.getQuestions();
  }
}
