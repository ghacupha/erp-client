///
/// Erp System - Mark III No 12 (Caleb Series) Client 1.2.7
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
        path: 'asset-registration',
        data: {
          pageTitle: 'ERP | FA Registration',
          authorities: ['ROLE_FIXED_ASSETS_USER', 'ROLE_LEASE_MANAGER'],
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
          authorities: ['ROLE_FIXED_ASSETS_USER', 'ROLE_LEASE_MANAGER'],
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
          authorities: ['ROLE_FIXED_ASSETS_USER', 'ROLE_LEASE_MANAGER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./work-in-progress-transfer/work-in-progress-transfer.module').then(
            m => m.WorkInProgressTransferModule
          ),
      },
      {
        path: 'work-project-register',
        data: {
          pageTitle: 'ERP | Work Project',
          authorities: ['ROLE_FIXED_ASSETS_USER', 'ROLE_LEASE_MANAGER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./work-project-register/work-project-register.module').then(
            m => m.WorkProjectRegisterModule
          ),
      },
      {
        path: 'fixed-asset-net-book-value',
        data: {
          pageTitle: 'ERP | Fixed Asset NetBookValue',
          authorities: ['ROLE_FIXED_ASSETS_USER', 'ROLE_LEASE_MANAGER'],
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
          authorities: ['ROLE_FIXED_ASSETS_USER', 'ROLE_LEASE_MANAGER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./fixed-asset-depreciation/fixed-asset-depreciation.module').then(m => m.ErpServiceFixedAssetDepreciationModule),
      },
      {
        path: 'fixed-asset-acquisition',
        data: {
          pageTitle: 'ERP | Fixed Asset Acquisition',
          authorities: ['ROLE_FIXED_ASSETS_USER', 'ROLE_LEASE_MANAGER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./fixed-asset-acquisition/fixed-asset-acquisition.module').then(m => m.ErpServiceFixedAssetAcquisitionModule),
      },
      {
        path: 'asset-category',
        data: {
          pageTitle: 'ERP | Asset Categories',
          authorities: ['ROLE_FIXED_ASSETS_USER', 'ROLE_LEASE_MANAGER'],
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
            'ROLE_LEASE_MANAGER',
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
