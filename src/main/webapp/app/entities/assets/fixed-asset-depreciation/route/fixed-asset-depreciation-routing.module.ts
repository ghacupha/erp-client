///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.3
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
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FixedAssetDepreciationComponent } from '../list/fixed-asset-depreciation.component';
import { FixedAssetDepreciationDetailComponent } from '../detail/fixed-asset-depreciation-detail.component';
import { FixedAssetDepreciationUpdateComponent } from '../update/fixed-asset-depreciation-update.component';
import { FixedAssetDepreciationRoutingResolveService } from './fixed-asset-depreciation-routing-resolve.service';

const fixedAssetDepreciationRoute: Routes = [
  {
    path: '',
    component: FixedAssetDepreciationComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FixedAssetDepreciationDetailComponent,
    resolve: {
      fixedAssetDepreciation: FixedAssetDepreciationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FixedAssetDepreciationUpdateComponent,
    resolve: {
      fixedAssetDepreciation: FixedAssetDepreciationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FixedAssetDepreciationUpdateComponent,
    resolve: {
      fixedAssetDepreciation: FixedAssetDepreciationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fixedAssetDepreciationRoute)],
  exports: [RouterModule],
})
export class FixedAssetDepreciationRoutingModule {}
