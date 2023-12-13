///
/// Erp System - Mark IX No 2 (Hilkiah Series) Client 1.6.3
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
import { WorkInProgressOverviewComponent } from '../list/work-in-progress-overview.component';
import { WorkInProgressOverviewDetailComponent } from '../detail/work-in-progress-overview-detail.component';
import { WorkInProgressOverviewRoutingResolveService } from './work-in-progress-overview-routing-resolve.service';

const workInProgressOverviewRoute: Routes = [
  {
    path: '',
    component: WorkInProgressOverviewComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WorkInProgressOverviewDetailComponent,
    resolve: {
      workInProgressOverview: WorkInProgressOverviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(workInProgressOverviewRoute)],
  exports: [RouterModule],
})
export class WorkInProgressOverviewRoutingModule {}
