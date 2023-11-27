///
/// Erp System - Mark VIII No 1 (Hilkiah Series) Client 1.5.9
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

import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {ErpFilesNavigationComponent} from "./files/erp-files-navigation.component";
import {RouterModule} from "@angular/router";
import {PaymentsNavComponent} from "./payment-nav/payments-nav.component";
import {AssetsNavComponent} from "./assets-nav/assets-nav.component";
import { TaxesNavComponent } from './taxes-nav/taxes-nav.component';
import { GranularDataNavComponent } from './granular-data-nav/granular-data-nav.component';
import { PrepaymentsNavComponent } from './prepayments/prepayments-nav.component';
import { ReportsNavComponent } from './reports-nav/reports-nav.component';
import { SystemAdminNavComponent } from './system-admin-nav/system-admin-nav.component';
import { LeasesNavComponent } from './leases-nav/leases-nav.component';
import { TablesNavComponent } from './tables-nav/tables-nav.component';
import { ErpMaintenanceNavComponent } from './erp-maintenance/erp-maintenance-nav.component';
import { GdiNavComponent } from './gdi-nav/gdi-nav.component';
import { GdiDataNavComponent } from './gdi-nav/gdi-data-nav.component';

@NgModule({
  declarations: [
    ErpFilesNavigationComponent,
    PaymentsNavComponent,
    AssetsNavComponent,
    TaxesNavComponent,
    GranularDataNavComponent,
    PrepaymentsNavComponent,
    ReportsNavComponent,
    SystemAdminNavComponent,
    LeasesNavComponent,
    TablesNavComponent,
    ErpMaintenanceNavComponent,
    GdiNavComponent,
    GdiDataNavComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    ErpFilesNavigationComponent,
    PaymentsNavComponent,
    AssetsNavComponent,
    TaxesNavComponent,
    GranularDataNavComponent,
    PrepaymentsNavComponent,
    ReportsNavComponent,
    SystemAdminNavComponent,
    LeasesNavComponent,
    TablesNavComponent,
    ErpMaintenanceNavComponent,
    GdiNavComponent,
    GdiDataNavComponent,
  ]
})
export class ErpNavigationModule {}
