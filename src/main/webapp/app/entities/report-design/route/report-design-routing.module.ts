///
/// Erp System - Mark III No 11 (Caleb Series) Client 1.1.1
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
import { ReportDesignComponent } from '../list/report-design.component';
import { ReportDesignDetailComponent } from '../detail/report-design-detail.component';
import { ReportDesignUpdateComponent } from '../update/report-design-update.component';
import { ReportDesignRoutingResolveService } from './report-design-routing-resolve.service';

const reportDesignRoute: Routes = [
  {
    path: '',
    component: ReportDesignComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReportDesignDetailComponent,
    resolve: {
      reportDesign: ReportDesignRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReportDesignUpdateComponent,
    resolve: {
      reportDesign: ReportDesignRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReportDesignUpdateComponent,
    resolve: {
      reportDesign: ReportDesignRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(reportDesignRoute)],
  exports: [RouterModule],
})
export class ReportDesignRoutingModule {}