///
/// Erp System - Mark III No 12 (Caleb Series) Client 1.2.6
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
import { AssetCategoryComponent } from '../list/asset-category.component';
import { AssetCategoryDetailComponent } from '../detail/asset-category-detail.component';
import { AssetCategoryUpdateComponent } from '../update/asset-category-update.component';
import { AssetCategoryRoutingResolveService } from './asset-category-routing-resolve.service';

const assetCategoryRoute: Routes = [
  {
    path: '',
    component: AssetCategoryComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AssetCategoryDetailComponent,
    resolve: {
      assetCategory: AssetCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AssetCategoryUpdateComponent,
    resolve: {
      assetCategory: AssetCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AssetCategoryUpdateComponent,
    resolve: {
      assetCategory: AssetCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(assetCategoryRoute)],
  exports: [RouterModule],
})
export class AssetCategoryRoutingModule {}
