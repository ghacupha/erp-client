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
        path: 'customer-id-document-type',
        data: {
          pageTitle: 'ERP | Customer ID Document Type',
          authorities: ['ROLE_GRANULAR_REPORTS_USER', 'ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./customer-id-document-type/customer-id-document-type.module').then(
            m => m.CustomerIDDocumentTypeModule
          ),
      },
      {
        path: 'institution-code',
        data: {
          pageTitle: 'ERP | Institution Code',
          authorities: ['ROLE_GRANULAR_REPORTS_USER', 'ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./institution-code/institution-code.module').then(
            m => m.InstitutionCodeModule
          ),
      },
      {
        path: 'iso-country-code',
        data: {
          pageTitle: 'ERP | ISO Country Code',
          authorities: ['ROLE_GRANULAR_REPORTS_USER', 'ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./iso-country-code/iso-country-code.module').then(
            m => m.IsoCountryCodeModule
          ),
      },
      {
        path: 'mfb-branch-code',
        data: {
          pageTitle: 'ERP | MFB Branch Code',
          authorities: ['ROLE_GRANULAR_REPORTS_USER', 'ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./mfb-branch-code/mfb-branch-code.module').then(
            m => m.MfbBranchCodeModule
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
      {
        path: 'sub-county-code',
        data: {
          pageTitle: 'ERP | Sub County Code',
          authorities: ['ROLE_GRANULAR_REPORTS_USER', 'ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./sub-county-code/sub-county-code.module').then(
            m => m.SubCountyCodeModule
          ),
      },
    ]),
  ]
})
export class ErpGranularModule {}
