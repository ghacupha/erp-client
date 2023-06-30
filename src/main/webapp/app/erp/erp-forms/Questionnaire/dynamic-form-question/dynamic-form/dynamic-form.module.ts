///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.4
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
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
import { CommonModule } from '@angular/common';
import { QuestionControlService } from '../../question-control.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionModule } from '../dynamic-form-question/dynamic-form-question.module';
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
  declarations: [
    DynamicFormComponent,
  ],
  exports: [
    DynamicFormComponent,
  ]
})
export class DynamicFormModule {}
