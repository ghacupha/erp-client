import { NgModule } from '@angular/core';
import { FormatDealerIdPipe } from './pipe/format-dealer-id.pipe';
import { FormatPaymentCategoryPipe } from './pipe/format-payment-category.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';
import { FormatPaymentPipe } from './pipe/format-payment.pipe';
import { FormatSettlementCurrencyPipe } from './pipe/format-settlement-currency.pipe';
import { FormatSettlementPipe } from './pipe/format-settlement.pipe';
import { FormatDepreciationMethodPipe } from './pipe/format-depreciation-method.pipe';
import { FormatPurchaseOrderPipe } from './pipe/format-purchase-order.pipe';
import { OptionViewsModule } from './option-view-components/option-views.module';

@NgModule({
  declarations: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe,
    FormatPaymentPipe,
    FormatSettlementCurrencyPipe,
    FormatSettlementPipe,
    FormatDepreciationMethodPipe,
    FormatPurchaseOrderPipe
  ],
  exports: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe,
    FormatPaymentPipe,
    FormatSettlementCurrencyPipe,
    FormatSettlementPipe,
    FormatDepreciationMethodPipe,
    FormatPurchaseOrderPipe,
    OptionViewsModule
  ]
})
export class ErpCommonModule {}
