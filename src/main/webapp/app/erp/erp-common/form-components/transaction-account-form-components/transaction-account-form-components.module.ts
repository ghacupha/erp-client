import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TransactionAccountOptionViewComponent } from './transaction-account-option-view.component';
import { FormatTransactionAccountPipe } from './format-transaction-account.pipe';
import { M21TransactionAccountFormControlComponent } from './m21-transaction-account-form-control.component';

@NgModule({
  declarations: [
    TransactionAccountOptionViewComponent,
    FormatTransactionAccountPipe,
    M21TransactionAccountFormControlComponent
  ],
  imports: [SharedModule],
  exports: [
    M21TransactionAccountFormControlComponent,
    TransactionAccountOptionViewComponent,
    FormatTransactionAccountPipe
  ]
})
export class TransactionAccountFormComponentsModule {
}
