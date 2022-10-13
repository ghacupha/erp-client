import { Component, Input, OnInit } from '@angular/core';
import { QuestionBase } from '../../../question-base/question-base.model';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../../question-control.service';

/**
 * Sample implementation of a sample dynamic form
 */
@Component({
  selector: 'jhi-app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit{


  @Input() questions: QuestionBase<any>[] = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit(): void {
    this.payLoad = this.form.value ?? '';
  }
}
