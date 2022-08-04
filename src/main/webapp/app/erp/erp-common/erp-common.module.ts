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
