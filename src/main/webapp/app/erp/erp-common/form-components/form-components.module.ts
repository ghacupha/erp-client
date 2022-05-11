import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { M21DealerFormControlComponent } from './dealer-form-controls/m21-dealer-form-control.component';
import { ErpFormattingModule } from '../pipe/erp-formatting.module';
import { OptionViewsModule } from '../option-view-components/option-views.module';
import { M2MDealerFormControlComponent } from './dealer-form-controls/m2m-dealer-form-control.component';
import { M2MPlaceholderFormComponent } from './placeholder-components/m2m-placeholder-form-component';
import { M2MSettlementFormControlComponent } from './settlement-form-components/m2m-settlement-form-control.component';
import { M21SettlementFormControlComponent } from './settlement-form-components/m21-settlement-form-control.component';

@NgModule({
  declarations: [
    M21DealerFormControlComponent,
    M2MDealerFormControlComponent,
    M2MPlaceholderFormComponent,
    M2MSettlementFormControlComponent,
    M21SettlementFormControlComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ErpFormattingModule,
    OptionViewsModule
  ],
  exports: [
    M21DealerFormControlComponent,
    M2MDealerFormControlComponent,
    M2MPlaceholderFormComponent,
    M2MSettlementFormControlComponent,
    M21SettlementFormControlComponent,
  ]
})
export class FormComponentsModule {
}
