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
      {
          path: 'amortization-recurrence',
          data: {
            pageTitle: 'ERP | Amortization Recurrence',
            authorities: ['ROLE_PREPAYMENTS_MODULE_USER'],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./amortization-recurrence/amortization-recurrence.module').then(
              m => m.AmortizationRecurrenceModule
            ),
        },
      {
          path: 'amortization-sequence',
          data: {
            pageTitle: 'ERP | Amortization Sequence',
            authorities: ['ROLE_PREPAYMENTS_MODULE_USER'],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./amortization-sequence/amortization-sequence.module').then(
              m => m.AmortizationSequenceModule
            ),
        },
      {
          path: 'prepayment-mapping',
          data: {
            pageTitle: 'ERP | Prepayment Mapping',
            authorities: ['ROLE_PREPAYMENTS_MODULE_USER'],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./prepayment-mapping/prepayment-mapping.module').then(
              m => m.PrepaymentMappingModule
            ),
        },
      ]
    )
  ]
})
export class ErpPrepaymentsAccountingModule {
}
