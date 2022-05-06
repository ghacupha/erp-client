import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ManyToOneDealerFormControlComponent } from './many-to-one-dealer-form-control.component';
import { ErpFormattingModule } from '../pipe/erp-formatting.module';
import { OptionViewsModule } from '../option-view-components/option-views.module';

@NgModule({
  declarations: [
    ManyToOneDealerFormControlComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ErpFormattingModule,
    OptionViewsModule
  ],
  exports: [
    ManyToOneDealerFormControlComponent
  ]
})
export class FormComponentsModule {
}
