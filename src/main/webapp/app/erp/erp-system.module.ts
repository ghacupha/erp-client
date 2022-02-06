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
import { ErpSetupPagesModule } from './setup-pages/erp-setup-pages.module';

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
    ErpSetupPagesModule,
  ],
  exports: [
    ErpNavbarModule,
    ErpPagesModule,
    ErpFormsModule,
    ErpSetupPagesModule,
  ]
})
export class ErpSystemModule {}
