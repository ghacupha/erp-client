import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
          path: 'prepayment-account',
          data: {
            pageTitle: 'ERP | Prepayment Account',
            authorities: ['ROLE_PREPAYMENTS_MODULE_USER'],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./prepayment-account/prepayment-account.module').then(
              m => m.PrepaymentAccountModule
            ),
        },
      ]
    )
  ]
})
export class ErpPrepaymentsAccountingModule {
}
