///
/// Erp System - Mark II No 11 (Artaxerxes Series)
/// Copyright © 2021 Edwin Njeru (mailnjeru@gmail.com)
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
