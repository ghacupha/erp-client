///
/// Erp System - Mark III No 13 (Caleb Series) Client 1.3.2
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErpMaterialModule } from '../../erp-material.module';
import { DealerMaintenanceModule } from './dealer-maintenance/dealer-maintenance.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { QuestionnaireModule } from './Questionnaire/questionnaire.module';

@NgModule({
 imports: [
   FormsModule,
   ErpMaterialModule,
   ReactiveFormsModule,
   DealerMaintenanceModule,
   SharedModule,
   RouterModule.forChild([
       {
         path: 'erp/forms',
         data: { pageTitle: 'ERP | Dealer Maintenance' },
         loadChildren: () => import('./dealer-maintenance/dealer-maintenance.module').then(m => m.DealerMaintenanceModule),
       },
       {
         path: 'question-base',
         data: { pageTitle: 'Question form control definitions' },
         loadChildren: () => import('./question-base/question-base.module').then(m => m.QuestionBaseModule),
       },
       {
         path: 'string-question-base',
         data: { pageTitle: 'StringQuestionBases' },
         loadChildren: () => import('./string-question-base/string-question-base.module').then(m => m.StringQuestionBaseModule),
       },
     ]),
  ],
  exports: [
    DealerMaintenanceModule,
    QuestionnaireModule
  ]
})
export class ErpFormsModule {}
