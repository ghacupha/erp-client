import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../../question-control.service';
import { DynamicQuestion } from '../../dynamic-question.model';

@Component({
  selector: 'jhi-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: DynamicQuestion<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions as DynamicQuestion<string>[]);
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
