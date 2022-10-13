import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionControlService } from '../../question-control.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionModule } from '../dynamic-form-question.module';
import { DynamicFormComponent } from './dynamic-form.component';

/**
 * This is a sample implementation of the dynamic-form using the dynamic-form-question module
 * imported into this module. We use the question-control service to provide the form specification
 * and use that to generate a real-time form-group for the questionnaire that the end-user will see
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormQuestionModule
  ],
  providers: [QuestionControlService],
  declarations: [DynamicFormComponent],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule {}
