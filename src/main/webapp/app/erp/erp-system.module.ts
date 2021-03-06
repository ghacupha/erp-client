import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {AboutErpSystemModule} from "./about/about-erp-system.module";
import {ErpNavbarModule} from "./navbar/erp-navbar.module";
import {ErpNavigationModule} from "./erp-nav/erp-navigation.module";
import {ErpPagesModule} from "./erp-pages/erp-pages.module";
import { ErpFormsModule } from './erp-forms/erp-forms.module';
import { ErpCommonModule } from './erp-common/erp-common.module';
import { ErpAssetsModule } from './erp-assets/erp-assets.module';
import { ErpTaxesModule } from './erp-taxes/erp-taxes.module';
import { ErpSettlementsModule } from './erp-settlements/erp-settlements.module';
import { ErpGranularModule } from './erp-granular/erp-granular.module';
import { ErpPrepaymentsAccountingModule } from './erp-prepayments/erp-prepayments-accounting.module';
import { ErpTransactionAccountModule } from './erp-accounts/erp-transaction-account.module';
import { ErpReportsModule } from './erp-reports/erp-reports.module';
import { EntityRoutingModule } from '../entities/entity-routing.module';

export const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AboutErpSystemModule,
    RouterModule.forChild(routes),
    ErpNavbarModule,
    ErpNavigationModule,
    ErpPagesModule,
    ErpFormsModule,
    ErpCommonModule,
    ErpAssetsModule,
    ErpTaxesModule,
    ErpReportsModule,
    ErpGranularModule,
    ErpSettlementsModule,
    ErpPrepaymentsAccountingModule,
    ErpTransactionAccountModule,
  ],
  exports: [
    ErpNavbarModule,
    ErpPagesModule,
    ErpFormsModule,
    ErpAssetsModule,
    ErpTaxesModule,
    ErpReportsModule,
    ErpGranularModule,
    ErpSettlementsModule,
    ErpPrepaymentsAccountingModule,
    ErpTransactionAccountModule,
    EntityRoutingModule
  ]
})
export class ErpSystemModule {}
