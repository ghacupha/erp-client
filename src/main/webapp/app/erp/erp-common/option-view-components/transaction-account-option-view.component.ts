import { Component, Input } from '@angular/core';
import { ITransactionAccount } from '../../erp-accounts/transaction-account/transaction-account.model';

@Component({
  selector: 'jhi-transaction-account-option-view',
  template: `
    <span class="ng-value-label">
      #{{item!.accountNumber }} account id: {{item!.accountNumber }}
      #{{item!.id}}
    </span>
  `
})
export class TransactionAccountOptionViewComponent {

  @Input() item: ITransactionAccount = {};
}
