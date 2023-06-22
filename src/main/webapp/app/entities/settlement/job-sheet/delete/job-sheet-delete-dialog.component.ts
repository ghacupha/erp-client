import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobSheet } from '../job-sheet.model';
import { JobSheetService } from '../service/job-sheet.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './job-sheet-delete-dialog.component.html',
})
export class JobSheetDeleteDialogComponent {
  jobSheet?: IJobSheet;

  constructor(protected jobSheetService: JobSheetService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobSheetService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
