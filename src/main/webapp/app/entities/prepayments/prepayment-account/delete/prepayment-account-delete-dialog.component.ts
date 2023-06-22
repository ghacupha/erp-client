import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrepaymentAccount } from '../prepayment-account.model';
import { PrepaymentAccountService } from '../service/prepayment-account.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './prepayment-account-delete-dialog.component.html',
})
export class PrepaymentAccountDeleteDialogComponent {
  prepaymentAccount?: IPrepaymentAccount;

  constructor(protected prepaymentAccountService: PrepaymentAccountService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.prepaymentAccountService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
