import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILeaseModelMetadata } from '../lease-model-metadata.model';
import { LeaseModelMetadataService } from '../service/lease-model-metadata.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './lease-model-metadata-delete-dialog.component.html',
})
export class LeaseModelMetadataDeleteDialogComponent {
  leaseModelMetadata?: ILeaseModelMetadata;

  constructor(protected leaseModelMetadataService: LeaseModelMetadataService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.leaseModelMetadataService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
