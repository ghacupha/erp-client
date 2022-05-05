import { NgModule } from '@angular/core';
import { PurchaseOrderOptionViewComponent } from './purchase-order-option-view.component';
import { CommonModule } from '@angular/common';
import { SettlementCurrencyOptionViewComponent } from './settlement-currency-option-view.component';
import { PaymentInvoiceOptionViewComponent } from './payment-invoice-option-view.component';
import { BusinessStampOptionViewComponent } from './business-stamp-option-view.component';
import { PaymentCategoryOptionViewComponent } from './payment-category-option-view.component';
import { DealerOptionViewComponent } from './dealer-option-view.component';
import { SettlementOptionViewComponent } from './settlement-option-view.component';
import { SettlementSelectedOptionViewComponent } from './settlement-selected-option-view.component';
import { PaymentInvoiceSelectedOptionViewComponent } from './payment-invoice-selected-option-view.component';
import { JobSheetOptionViewComponent } from './job-sheet-option-view.component';
import { DeliveryNoteOptionViewComponent } from './delivery-note-option-view.component';
import { TransactionAccountOptionViewComponent } from './transaction-account-option-view.component';

@NgModule({
  declarations: [
    PurchaseOrderOptionViewComponent,
    SettlementCurrencyOptionViewComponent,
    PaymentInvoiceOptionViewComponent,
    PaymentInvoiceSelectedOptionViewComponent,
    BusinessStampOptionViewComponent,
    PaymentCategoryOptionViewComponent,
    DealerOptionViewComponent,
    SettlementOptionViewComponent,
    SettlementSelectedOptionViewComponent,
    JobSheetOptionViewComponent,
    DeliveryNoteOptionViewComponent,
    TransactionAccountOptionViewComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PurchaseOrderOptionViewComponent,
    SettlementCurrencyOptionViewComponent,
    PaymentInvoiceOptionViewComponent,
    PaymentInvoiceSelectedOptionViewComponent,
    BusinessStampOptionViewComponent,
    PaymentCategoryOptionViewComponent,
    DealerOptionViewComponent,
    SettlementOptionViewComponent,
    SettlementSelectedOptionViewComponent,
    JobSheetOptionViewComponent,
    DeliveryNoteOptionViewComponent,
    TransactionAccountOptionViewComponent,
  ]
})
export class OptionViewsModule {
}
