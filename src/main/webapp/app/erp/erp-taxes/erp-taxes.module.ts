import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'erp/taxes/agency-notice',
        data: { pageTitle: 'ERP-Taxes | Agency Notice' },
        loadChildren: () => import('./agency-notice/agency-notice.module').then(m => m.AgencyNoticeModule)
      }
    ])
  ]
})
export class ErpTaxesModule{}
