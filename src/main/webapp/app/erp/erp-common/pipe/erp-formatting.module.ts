import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatServiceOutletPipe } from './format-service-outlet.pipe';
import { FormatDealerIdPipe } from './format-dealer-id.pipe';
import { FormatPaymentCategoryPipe } from './format-payment-category.pipe';
import { TruncatePipe } from './truncate.pipe';
import { FormatPaymentPipe } from './format-payment.pipe';
import { FormatSettlementCurrencyPipe } from './format-settlement-currency.pipe';
import { FormatSettlementPipe } from './format-settlement.pipe';
import { FormatDepreciationMethodPipe } from './format-depreciation-method.pipe';
import { FormatPurchaseOrderPipe } from './format-purchase-order.pipe';
import { FormatTransactionAccountPipe } from './format-transaction-account.pipe';
import { FormatPaymentInvoicePipe } from './format-payment-invoice.pipe';

@NgModule({
  declarations: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe,
    FormatPaymentPipe,
    FormatSettlementCurrencyPipe,
    FormatSettlementPipe,
    FormatDepreciationMethodPipe,
    FormatPurchaseOrderPipe,
    FormatTransactionAccountPipe,
    FormatServiceOutletPipe,
    FormatPaymentInvoicePipe,
  ],
  imports: [CommonModule],
  exports: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe,
    FormatPaymentPipe,
    FormatSettlementCurrencyPipe,
    FormatSettlementPipe,
    FormatDepreciationMethodPipe,
    FormatPurchaseOrderPipe,
    FormatTransactionAccountPipe,
    FormatServiceOutletPipe,
    FormatPaymentInvoicePipe,
  ]
})
export class ErpFormattingModule{}
