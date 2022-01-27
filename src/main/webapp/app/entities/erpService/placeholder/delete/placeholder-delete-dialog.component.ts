import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlaceholder } from '../../../../erp/erp-common/models/placeholder.model';
import { PlaceholderService } from '../../../../erp/erp-common/services/placeholder.service';

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
      this.activeModal.close('deleted');
    });
  }
}
