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
  ]
})
export class ErpNavigationModule {}
