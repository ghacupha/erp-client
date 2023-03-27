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
import { PdfReportRequisitionComponent } from '../list/pdf-report-requisition.component';
import { PdfReportRequisitionDetailComponent } from '../detail/pdf-report-requisition-detail.component';
import { PdfReportRequisitionUpdateComponent } from '../update/pdf-report-requisition-update.component';
import { PdfReportRequisitionRoutingResolveService } from './pdf-report-requisition-routing-resolve.service';

const pdfReportRequisitionRoute: Routes = [
  {
    path: '',
    component: PdfReportRequisitionComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PdfReportRequisitionDetailComponent,
    resolve: {
      pdfReportRequisition: PdfReportRequisitionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PdfReportRequisitionUpdateComponent,
    resolve: {
      pdfReportRequisition: PdfReportRequisitionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PdfReportRequisitionUpdateComponent,
    resolve: {
      pdfReportRequisition: PdfReportRequisitionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pdfReportRequisitionRoute)],
  exports: [RouterModule],
})
export class PdfReportRequisitionRoutingModule {}