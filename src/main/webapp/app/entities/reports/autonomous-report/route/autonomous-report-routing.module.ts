///
/// Erp System - Mark IX No 2 (Iddo Series) Client 1.6.3
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
import { AutonomousReportComponent } from '../list/autonomous-report.component';
import { AutonomousReportDetailComponent } from '../detail/autonomous-report-detail.component';
import { AutonomousReportUpdateComponent } from '../update/autonomous-report-update.component';
import { AutonomousReportRoutingResolveService } from './autonomous-report-routing-resolve.service';

const autonomousReportRoute: Routes = [
  {
    path: '',
    component: AutonomousReportComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AutonomousReportDetailComponent,
    resolve: {
      autonomousReport: AutonomousReportRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AutonomousReportUpdateComponent,
    resolve: {
      autonomousReport: AutonomousReportRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AutonomousReportUpdateComponent,
    resolve: {
      autonomousReport: AutonomousReportRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(autonomousReportRoute)],
  exports: [RouterModule],
})
export class AutonomousReportRoutingModule {}
