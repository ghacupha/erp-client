import { NgModule } from '@angular/core';
import { FormatDealerIdPipe } from './pipe/format-dealer-id.pipe';
import { FormatPaymentCategoryPipe } from './pipe/format-payment-category.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';
import { FormatPaymentPipe } from './pipe/format-payment.pipe';

@NgModule({
  declarations: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe,
    FormatPaymentPipe,
  ],
  exports: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe,
    FormatPaymentPipe
  ]
})
export class ErpCommonModule {}
