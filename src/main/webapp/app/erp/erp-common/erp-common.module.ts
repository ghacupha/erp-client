import { NgModule } from '@angular/core';
import { FormatDealerIdPipe } from './pipe/format-dealer-id.pipe';

@NgModule({
  declarations: [FormatDealerIdPipe],
  exports: [FormatDealerIdPipe]
})
export class ErpCommonModule {}
