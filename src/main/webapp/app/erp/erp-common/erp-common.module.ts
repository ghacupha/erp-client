import { NgModule } from '@angular/core';
import { OptionViewsModule } from './option-view-components/option-views.module';
import { ErpFormattingModule } from './pipe/erp-formatting.module';

@NgModule({
  declarations: [],
  exports: [
    ErpFormattingModule,
    OptionViewsModule
  ]
})
export class ErpCommonModule {}
