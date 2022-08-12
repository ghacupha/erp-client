///
/// Erp System - Mark II No 26 (Baruch Series) Client v 0.1.1-SNAPSHOT
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
import { OptionViewsModule } from './option-view-components/option-views.module';
import { ErpFormattingModule } from './pipe/erp-formatting.module';
import { FormComponentsModule } from './form-components/form-components.module';
// import { RouterModule } from '@angular/router';

@NgModule({
  // imports: [RouterModule.forChild([
  //   {
  //     path: 'algorithm',
  //     data: {
  //       pageTitle: 'ERP | Algorithm',
  //       authorities: ['ROLE_ADMIN'],
  //     },
  //     loadChildren: () => import('./algorithm/algorithm.module')
  //       .then(m => m.AlgorithmModule),
  //   },
  //   {
  //     path: 'application-user',
  //     data: {
  //       pageTitle: 'ERP | Application User Admin',
  //       authorities: ['ROLE_ADMIN'],
  //     },
  //     loadChildren: () => import('./application-user/application-user.module')
  //       .then(m => m.ApplicationUserModule),
  //   },
  //   {
  //     path: 'process-status',
  //     data: {
  //       pageTitle: 'ERP | Process Status',
  //       authorities: [],
  //     },
  //     loadChildren: () => import('./process-status/process-status.module')
  //       .then(m => m.ProcessStatusModule),
  //   },
  //   {
  //     path: 'security-clearance',
  //     data: {
  //       pageTitle: 'ERP | Security Clearance',
  //       authorities: ['ROLE_ADMIN'],
  //     },
  //     loadChildren: () => import('./security-clearance/security-clearance.module')
  //       .then(m => m.SecurityClearanceModule),
  //   },
  //   {
  //     path: 'system-module',
  //     data: {
  //       pageTitle: 'ERP | System Module',
  //       authorities: ['ROLE_ADMIN'],
  //     },
  //     loadChildren: () => import('./system-module/system-module.module')
  //       .then(m => m.SystemModuleModule),
  //   },
  //   ])
  // ],
  declarations: [],
  exports: [
    ErpFormattingModule,
    OptionViewsModule,
    FormComponentsModule
  ]
})
export class ErpCommonModule {}
