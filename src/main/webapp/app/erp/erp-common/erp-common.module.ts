import { NgModule } from '@angular/core';
import { OptionViewsModule } from './option-view-components/option-views.module';
import { ErpFormattingModule } from './pipe/erp-formatting.module';
import { FormComponentsModule } from './form-components/form-components.module';

@NgModule({
  declarations: [],
  exports: [
    ErpFormattingModule,
    OptionViewsModule,
    FormComponentsModule
  ]
})
export class ErpCommonModule {}
