import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { M21PrepaymentAccountFormControlComponent } from './m21-prepayment-account-form-control.component';
import { PrepaymentAccountOptionViewComponent } from './prepayment-account-option-view.component';
import { FormatPrepaymentAccountPipe } from './format-prepayment-account.pipe';

@NgModule({
  declarations: [
    M21PrepaymentAccountFormControlComponent,
    PrepaymentAccountOptionViewComponent,
    FormatPrepaymentAccountPipe,
  ],
  imports: [SharedModule],
  exports: [
    M21PrepaymentAccountFormControlComponent,
    PrepaymentAccountOptionViewComponent,
    FormatPrepaymentAccountPipe,
  ]
})
export class PrepaymentAccountFormControlsModule {
}
