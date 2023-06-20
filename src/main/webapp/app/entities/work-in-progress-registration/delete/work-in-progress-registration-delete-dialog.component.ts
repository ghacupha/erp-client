import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorkInProgressRegistration } from '../work-in-progress-registration.model';
import { WorkInProgressRegistrationService } from '../service/work-in-progress-registration.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './work-in-progress-registration-delete-dialog.component.html',
})
export class WorkInProgressRegistrationDeleteDialogComponent {
  workInProgressRegistration?: IWorkInProgressRegistration;

  constructor(protected workInProgressRegistrationService: WorkInProgressRegistrationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.workInProgressRegistrationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
