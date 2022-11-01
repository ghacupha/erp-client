import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionModule } from '../dynamic-form-question.module';
import { QuestionnaireModule } from '../../questionnaire.module';
import { SampleDynamicTextboxFormComponent } from './sample-dynamic-textbox-form.component';

const routes: Routes = [{
  path: 'test/textbox/dynamic-form',
  component: SampleDynamicTextboxFormComponent,
  data: {
    pageTitle: 'ERP | Test Components',
  },
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DynamicFormModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormQuestionModule,
    QuestionnaireModule
  ],
  declarations: [SampleDynamicTextboxFormComponent],
  exports: [SampleDynamicTextboxFormComponent]
})
export class SampleTextBoxModule {

}
