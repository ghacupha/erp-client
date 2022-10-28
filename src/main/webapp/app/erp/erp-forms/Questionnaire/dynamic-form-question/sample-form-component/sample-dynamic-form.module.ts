///
/// Erp System - Mark III No 3 (Caleb Series) Client 0.2.0-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
