///
/// Erp System - Mark X No 10 (Jehoiada Series) Client 1.7.8
/// Copyright © 2021 - 2024 Edwin Njeru (mailnjeru@gmail.com)
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
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
          path: 'transaction-account',
          data: {
            pageTitle: 'ERP | Transaction Account',
            authorities: ['ROLE_BOOK_KEEPING', 'ROLE_PREPAYMENTS_MODULE_USER']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./transaction-account/transaction-account.module').then(
              m => m.TransactionAccountModule
            )
        },
        {
          path: 'transaction-account-category',
          data: {
            pageTitle: 'ERP | Account Category',
            authorities: ['ROLE_BOOK_KEEPING', 'ROLE_PREPAYMENTS_MODULE_USER']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./transaction-account-category/transaction-account-category.module').then(
              m => m.TransactionAccountCategoryModule
            )
        },
        {
          path: 'transaction-account-posting-process-type',
          data: {
            pageTitle: 'ERP | Account Processing',
            authorities: ['ROLE_BOOK_KEEPING', 'ROLE_PREPAYMENTS_MODULE_USER']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./transaction-account-posting-process-type/transaction-account-posting-process-type.module').then(
              m => m.TransactionAccountPostingProcessTypeModule
            )
        },
        {
          path: 'ta-amortization-rule',
          data: {
            pageTitle: 'ERP | Amortization Posting Rules',
            authorities: ['ROLE_BOOK_KEEPING', 'ROLE_PREPAYMENTS_MODULE_USER']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./ta-amortization-rule/ta-amortization-rule.module').then(
              m => m.TAAmortizationRuleModule
            )
        }
      ]
    )
  ]
})
export class ErpTransactionAccountModule {
}
