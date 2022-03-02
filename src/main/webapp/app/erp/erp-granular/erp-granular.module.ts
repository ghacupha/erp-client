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
          authorities: ['ROLE_GRANULAR_REPORTS_USER', 'ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./bank-branch-code/bank-branch-code.module').then(
            m => m.BankBranchCodeModule
          ),
      },
      {
        path: 'county-code',
        data: {
          pageTitle: 'ERP | County Code',
          authorities: ['ROLE_GRANULAR_REPORTS_USER', 'ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./county-code/county-code.module').then(
            m => m.CountyCodeModule
          ),
      },
      {
        path: 'outlet-status',
        data: {
          pageTitle: 'ERP | Outlet Status',
          authorities: ['ROLE_GRANULAR_REPORTS_USER', 'ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./outlet-status/outlet-status.module').then(
            m => m.OutletStatusModule
          ),
      },
      {
        path: 'outlet-type',
        data: {
          pageTitle: 'ERP | Outlet Type',
          authorities: ['ROLE_GRANULAR_REPORTS_USER', 'ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./outlet-type/outlet-type.module').then(
            m => m.OutletTypeModule
          ),
      },
      {
        path: 'service-outlet',
        data: {
          pageTitle: 'ERP | Service Outlet',
          authorities: ['ROLE_GRANULAR_REPORTS_USER', 'ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./service-outlet/service-outlet.module').then(
            m => m.ServiceOutletModule
          ),
      },
    ]),
  ]
})
export class ErpGranularModule {}
