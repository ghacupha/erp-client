///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
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
import { FixedAssetNetBookValueComponent } from '../list/fixed-asset-net-book-value.component';
import { FixedAssetNetBookValueDetailComponent } from '../detail/fixed-asset-net-book-value-detail.component';
import { FixedAssetNetBookValueUpdateComponent } from '../update/fixed-asset-net-book-value-update.component';
import { FixedAssetNetBookValueRoutingResolveService } from './fixed-asset-net-book-value-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fixedAssetNetBookValueRoute: Routes = [
  {
    path: '',
    component: FixedAssetNetBookValueComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FixedAssetNetBookValueDetailComponent,
    resolve: {
      fixedAssetNetBookValue: FixedAssetNetBookValueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FixedAssetNetBookValueUpdateComponent,
    resolve: {
      fixedAssetNetBookValue: FixedAssetNetBookValueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FixedAssetNetBookValueUpdateComponent,
    resolve: {
      fixedAssetNetBookValue: FixedAssetNetBookValueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fixedAssetNetBookValueRoute)],
  exports: [RouterModule],
})
export class FixedAssetNetBookValueRoutingModule {}
