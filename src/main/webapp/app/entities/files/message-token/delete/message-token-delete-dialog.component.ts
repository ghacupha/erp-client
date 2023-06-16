import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMessageToken } from '../message-token.model';
import { MessageTokenService } from '../service/message-token.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './message-token-delete-dialog.component.html',
})
export class MessageTokenDeleteDialogComponent {
  messageToken?: IMessageToken;

  constructor(protected messageTokenService: MessageTokenService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.messageTokenService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
