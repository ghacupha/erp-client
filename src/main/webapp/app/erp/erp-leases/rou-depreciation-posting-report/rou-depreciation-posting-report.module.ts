///
/// Erp System - Mark X No 9 (Jehoiada Series) Client 1.7.7
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
import { SharedModule } from 'app/shared/shared.module';
import { RouDepreciationPostingReportComponent } from './list/rou-depreciation-posting-report.component';
import { RouDepreciationPostingReportDetailComponent } from './detail/rou-depreciation-posting-report-detail.component';
import { RouDepreciationPostingReportUpdateComponent } from './update/rou-depreciation-posting-report-update.component';
import { RouDepreciationPostingReportDeleteDialogComponent } from './delete/rou-depreciation-posting-report-delete-dialog.component';
import { RouDepreciationPostingReportRoutingModule } from './route/rou-depreciation-posting-report-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';
import { RouDepreciationPostingReportNavParameterComponent } from './reportNavParam/rou-depreciation-posting-report-nav-parameter.component';

@NgModule({
  imports: [SharedModule, RouDepreciationPostingReportRoutingModule, ErpCommonModule],
  declarations: [
    RouDepreciationPostingReportComponent,
    RouDepreciationPostingReportDetailComponent,
    RouDepreciationPostingReportUpdateComponent,
    RouDepreciationPostingReportDeleteDialogComponent,
    RouDepreciationPostingReportNavParameterComponent,
  ],
  entryComponents: [RouDepreciationPostingReportDeleteDialogComponent],
})
export class RouDepreciationPostingReportModule {}
