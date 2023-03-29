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
