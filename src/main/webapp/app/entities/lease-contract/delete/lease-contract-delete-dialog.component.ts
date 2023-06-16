import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILeaseContract } from '../lease-contract.model';
import { LeaseContractService } from '../service/lease-contract.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './lease-contract-delete-dialog.component.html',
})
export class LeaseContractDeleteDialogComponent {
  leaseContract?: ILeaseContract;

  constructor(protected leaseContractService: LeaseContractService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.leaseContractService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
