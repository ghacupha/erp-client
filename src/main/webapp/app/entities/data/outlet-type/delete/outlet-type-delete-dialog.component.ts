import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOutletType } from '../outlet-type.model';
import { OutletTypeService } from '../service/outlet-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './outlet-type-delete-dialog.component.html',
})
export class OutletTypeDeleteDialogComponent {
  outletType?: IOutletType;

  constructor(protected outletTypeService: OutletTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.outletTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
