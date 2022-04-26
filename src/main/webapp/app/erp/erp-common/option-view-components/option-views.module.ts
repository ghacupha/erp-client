import { NgModule } from '@angular/core';
import { PurchaseOrderOptionViewComponent } from './purchase-order-option-view.component';
import { CommonModule } from '@angular/common';
import { SettlementCurrencyOptionViewComponent } from './settlement-currency-option-view.component';
import { PaymentInvoiceOptionViewComponent } from './payment-invoice-option-view.component';
import { BusinessStampOptionViewComponent } from './business-stamp-option-view.component';
import { PaymentCategoryOptionViewComponent } from './payment-category-option-view.component';

@NgModule({
  declarations: [
    PurchaseOrderOptionViewComponent,
    SettlementCurrencyOptionViewComponent,
    PaymentInvoiceOptionViewComponent,
    BusinessStampOptionViewComponent,
    PaymentCategoryOptionViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PurchaseOrderOptionViewComponent,
    SettlementCurrencyOptionViewComponent,
    PaymentInvoiceOptionViewComponent,
    BusinessStampOptionViewComponent,
    PaymentCategoryOptionViewComponent
  ]
})
export class OptionViewsModule {
}
