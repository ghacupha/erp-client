import { NgModule } from '@angular/core';
import { FormatDealerIdPipe } from './pipe/format-dealer-id.pipe';
import { FormatPaymentCategoryPipe } from './pipe/format-payment-category.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';
import { FormatPaymentPipe } from './pipe/format-payment.pipe';
import { FormatSettlementCurrencyPipe } from './pipe/format-settlement-currency.pipe';
import { FormatSettlementPipe } from './pipe/format-settlement.pipe';

@NgModule({
  declarations: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe,
    FormatPaymentPipe,
    FormatSettlementCurrencyPipe,
    FormatSettlementPipe
  ],
  exports: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe,
    FormatPaymentPipe,
    FormatSettlementCurrencyPipe,
    FormatSettlementPipe
  ]
})
export class ErpCommonModule {}
