import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
          path: 'transaction-account',
          data: {
            pageTitle: 'ERP | Transaction Account',
            authorities: ['ROLE_BOOK_KEEPING', 'ROLE_PREPAYMENTS_MODULE_USER'],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./transaction-account/transaction-account.module').then(
              m => m.TransactionAccountModule
            ),
        },
      ]
    )
  ]
})
export class ErpTransactionAccountModule {}
