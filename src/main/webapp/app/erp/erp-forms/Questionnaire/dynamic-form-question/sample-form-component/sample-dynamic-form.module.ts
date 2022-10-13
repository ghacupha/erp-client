import { NgModule } from '@angular/core';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionModule } from '../dynamic-form-question.module';
import { SampleDynamicFormComponent } from './sample-dynamic-form.component';
import { QuestionnaireModule } from '../../questionnaire.module';
import { RouterModule, Routes } from '@angular/router';
// import { UserRouteAccessService } from '../../../../../core/auth/user-route-access.service';

// const routes: Routes = [{
//   path: 'test/dynamic-form',
//   data: {
//     pageTitle: 'ERP | Test Components',
//     authorities: ['ROLE_DEV'],
//   },
//   canActivate: [UserRouteAccessService],
// }];

const routes: Routes = [{
  path: 'test/dynamic-form',
  component: SampleDynamicFormComponent,
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
  declarations: [SampleDynamicFormComponent],
  exports: [SampleDynamicFormComponent]
})
export class SampleDynamicFormModule {

}
