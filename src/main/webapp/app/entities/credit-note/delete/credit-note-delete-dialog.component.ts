import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICreditNote } from '../credit-note.model';
import { CreditNoteService } from '../service/credit-note.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './credit-note-delete-dialog.component.html',
})
export class CreditNoteDeleteDialogComponent {
  creditNote?: ICreditNote;

  constructor(protected creditNoteService: CreditNoteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.creditNoteService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
