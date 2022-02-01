import { NgModule } from '@angular/core';
import { FormatDealerIdPipe } from './pipe/format-dealer-id.pipe';
import { FormatPaymentCategoryPipe } from './pipe/format-payment-category.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';

@NgModule({
  declarations: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe
  ],
  exports: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe
  ]
})
export class ErpCommonModule {}
