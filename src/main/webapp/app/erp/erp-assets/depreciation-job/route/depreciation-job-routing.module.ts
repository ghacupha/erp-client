///
/// Erp System - Mark VIII No 3 (Hilkiah Series) Client 1.6.2
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
import { DepreciationJobComponent } from '../list/depreciation-job.component';
import { DepreciationJobDetailComponent } from '../detail/depreciation-job-detail.component';
import { DepreciationJobUpdateComponent } from '../update/depreciation-job-update.component';
import { DepreciationJobRoutingResolveService } from './depreciation-job-routing-resolve.service';

const depreciationJobRoute: Routes = [
  {
    path: '',
    component: DepreciationJobComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DepreciationJobDetailComponent,
    resolve: {
      depreciationJob: DepreciationJobRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DepreciationJobUpdateComponent,
    resolve: {
      depreciationJob: DepreciationJobRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DepreciationJobUpdateComponent,
    resolve: {
      depreciationJob: DepreciationJobRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(depreciationJobRoute)],
  exports: [RouterModule],
})
export class DepreciationJobRoutingModule {}
