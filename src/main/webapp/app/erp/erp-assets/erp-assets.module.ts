import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'asset-registration',
        data: {
          pageTitle: 'ERP | FA Registration',
          authorities: ['ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./asset-registration/asset-registration.module').then(
            m => m.AssetRegistrationModule
          ),
      },
      {
        path: 'work-in-progress-registration',
        data: {
          pageTitle: 'ERP | W.I.P. Registration',
          authorities: ['ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./work-in-progress-registration/work-in-progress-registration.module').then(
            m => m.WorkInProgressRegistrationModule
          ),
      },
      {
        path: 'work-in-progress-transfer',
        data: {
          pageTitle: 'ERP | W.I.P. Transfer',
          authorities: ['ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./work-in-progress-transfer/work-in-progress-transfer.module').then(
            m => m.WorkInProgressTransferModule
          ),
      },
      {
        path: 'fixed-asset-net-book-value',
        data: {
          pageTitle: 'ERP | Fixed Asset NetBookValue',
          authorities: ['ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./fixed-asset-net-book-value/fixed-asset-net-book-value.module').then(
            m => m.ErpServiceFixedAssetNetBookValueModule
          ),
      },
      {
        path: 'fixed-asset-depreciation',
        data: {
          pageTitle: 'ERP | Fixed Asset Depreciation',
          authorities: ['ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./fixed-asset-depreciation/fixed-asset-depreciation.module').then(m => m.ErpServiceFixedAssetDepreciationModule),
      },
      {
        path: 'fixed-asset-acquisition',
        data: {
          pageTitle: 'ERP | Fixed Asset Acquisition',
          authorities: ['ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./fixed-asset-acquisition/fixed-asset-acquisition.module').then(m => m.ErpServiceFixedAssetAcquisitionModule),
      },
      {
        path: 'asset-category',
        data: {
          pageTitle: 'ERP | Asset Categories',
          authorities: ['ROLE_FIXED_ASSETS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./asset-category/asset-category.module').then(m => m.AssetCategoryModule),
      },
      {
        path: 'depreciation-method',
        data: {
          pageTitle: 'ERP | Depreciation Methods',
          authorities: [
            'ROLE_FIXED_ASSETS_USER',
            'ROLE_PREPAYMENTS_MODULE_USER',
          ],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./depreciation-method/depreciation-method.module').then(m => m.DepreciationMethodModule),
      },
    ])
  ]
})
export class ErpAssetsModule {

}
