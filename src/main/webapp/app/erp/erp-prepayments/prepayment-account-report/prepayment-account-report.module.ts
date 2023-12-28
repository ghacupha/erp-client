///
/// Erp System - Mark IX No 5 (Iddo Series) Client 1.6.4
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
import { PrepaymentAccountReportComponent } from './list/prepayment-account-report.component';
import { PrepaymentAccountReportDetailComponent } from './detail/prepayment-account-report-detail.component';
import { PrepaymentAccountReportRoutingModule } from './route/prepayment-account-report-routing.module';

@NgModule({
  imports: [SharedModule, PrepaymentAccountReportRoutingModule],
  declarations: [PrepaymentAccountReportComponent, PrepaymentAccountReportDetailComponent],
})
export class PrepaymentAccountReportModule {}