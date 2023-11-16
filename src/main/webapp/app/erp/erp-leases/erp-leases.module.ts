///
/// Erp System - Mark VII No 5 (Gideon Series) Client 1.5.8
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
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
          path: 'lease-contract',
          data: {
            pageTitle: 'ERP | leases',
            authorities: ['ROLE_LEASE_MANAGER'],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./lease-contract/lease-contract.module').then(
              m => m.LeaseContractModule
            ),
        },
      {
          path: 'lease-model-metadata',
          data: {
            pageTitle: 'ERP | leases',
            authorities: ['ROLE_LEASE_MANAGER'],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./lease-model-metadata/lease-model-metadata.module').then(
              m => m.LeaseModelMetadataModule
            ),
        },
      {
          path: 'lease-liability-schedule-item',
          data: {
            pageTitle: 'ERP | Schedule',
            authorities: ['ROLE_LEASE_MANAGER'],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () =>
            import('./lease-liability-schedule-item/lease-liability-schedule-item.module').then(
              m => m.LeaseLiabilityScheduleItemModule
            ),
        },
      ]
    )
  ]
})
export class ErpLeasesModule {
}
