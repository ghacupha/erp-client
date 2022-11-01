import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../../../question-control.service';
import { StringQuestionBase } from '../../../../string-question-base/string-question-base.model';

/**
 * Sample implementation of a sample dynamic form
 */
@Component({
  selector: 'jhi-app-string-dynamic-form',
  templateUrl: './string-dynamic-form.component.html',
  styleUrls: ['./string-dynamic-form.component.scss']
})
export class StringDynamicFormComponent implements OnInit {

  @Input() questions: StringQuestionBase[] = [];
  form!: FormGroup;
  payLoad = {};

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.form = this.qcs.toStringValueFormGroup(this.questions);
  }

  onSubmit(): void {
    this.payLoad = this.form.value;
  }
}
