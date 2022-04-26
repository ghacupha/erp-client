import { NgModule } from '@angular/core';
import { PurchaseOrderOptionViewComponent } from './purchase-order-option-view.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PurchaseOrderOptionViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PurchaseOrderOptionViewComponent
  ]
})
export class OptionViewsModule {
}
