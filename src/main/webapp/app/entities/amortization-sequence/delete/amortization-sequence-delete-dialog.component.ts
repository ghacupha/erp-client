import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAmortizationSequence } from '../amortization-sequence.model';
import { AmortizationSequenceService } from '../service/amortization-sequence.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './amortization-sequence-delete-dialog.component.html',
})
export class AmortizationSequenceDeleteDialogComponent {
  amortizationSequence?: IAmortizationSequence;

  constructor(protected amortizationSequenceService: AmortizationSequenceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.amortizationSequenceService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
