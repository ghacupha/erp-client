///
/// Erp System - Mark II No 28 (Baruch Series) Client 0.1.8-SNAPSHOT
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
