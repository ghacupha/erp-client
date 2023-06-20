import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAmortizationRecurrence } from '../amortization-recurrence.model';
import { AmortizationRecurrenceService } from '../service/amortization-recurrence.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './amortization-recurrence-delete-dialog.component.html',
})
export class AmortizationRecurrenceDeleteDialogComponent {
  amortizationRecurrence?: IAmortizationRecurrence;

  constructor(protected amortizationRecurrenceService: AmortizationRecurrenceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.amortizationRecurrenceService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
