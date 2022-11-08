import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicQuestion } from '../../dynamic-question.model';

@Component({
  selector: 'jhi-app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question!: DynamicQuestion<string>;
  @Input() form!: FormGroup;
  get isValid(): boolean { return this.form.controls[this.question.key].valid; }
}
