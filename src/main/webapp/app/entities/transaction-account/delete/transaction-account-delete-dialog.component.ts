import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactionAccount } from '../transaction-account.model';
import { TransactionAccountService } from '../service/transaction-account.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './transaction-account-delete-dialog.component.html',
})
export class TransactionAccountDeleteDialogComponent {
  transactionAccount?: ITransactionAccount;

  constructor(protected transactionAccountService: TransactionAccountService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transactionAccountService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
