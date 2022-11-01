import { Component, VERSION } from '@angular/core';
import { QuestionService } from '../../question.service';

@Component({
  selector: 'jhi-sample-dynamic-textbox-form',
  templateUrl: './sample-dynamic-textbox-form.component.html',
  styleUrls: ['./sample-dynamic-textbox-form.component.scss']
})
export class SampleDynamicTextboxFormComponent {

  questions: any[];
  version = VERSION.full;
  value = {}

  constructor(service: QuestionService) {
    this.questions = service.getStringQuestions();
  }
}
