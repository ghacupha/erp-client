import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProcessStatus } from '../process-status.model';
import { ProcessStatusService } from '../service/process-status.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './process-status-delete-dialog.component.html',
})
export class ProcessStatusDeleteDialogComponent {
  processStatus?: IProcessStatus;

  constructor(protected processStatusService: ProcessStatusService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.processStatusService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
