import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlaceholder } from '../placeholder.model';
import { PlaceholderService } from '../service/placeholder.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './placeholder-delete-dialog.component.html',
})
export class PlaceholderDeleteDialogComponent {
  placeholder?: IPlaceholder;

  constructor(protected placeholderService: PlaceholderService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.placeholderService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
