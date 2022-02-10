import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'agency-notice',
        data: {
          pageTitle: 'ERP-Taxes | Agency Notice',
          authorities: ['ROLE_TAX_MODULE_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./agency-notice/agency-notice.module').then(m => m.AgencyNoticeModule)
      }
    ])
  ]
})
export class ErpTaxesModule{}
