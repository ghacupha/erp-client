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
            import('./lease-contract/lease-contract.module').then(
              m => m.LeaseContractModule
            ),
        },
      ]
    )
  ]
})
export class ErpLeasesModule {
}
