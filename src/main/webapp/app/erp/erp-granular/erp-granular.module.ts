import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'bank-branch-code',
        data: {
          pageTitle: 'ERP | Bank Branch Code',
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./bank-branch-code/bank-branch-code.module').then(
            m => m.BankBranchCodeModule
          ),
      },
    ]),
    /* TODO RouterModule.forChild([
      {
        path: 'bank-branch-code',
        data: {
          pageTitle: 'ERP | Bank Branch Code',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./bank-branch-code/bank-branch-code.module').then(
            m => m.BankBranchCodeModule
          ),
      },
    ]), */
  ]
})
export class ErpGranularModule {}
