import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaymentCalculation } from '../payment-calculation.model';
import { PaymentCalculationService } from '../service/payment-calculation.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './payment-calculation-delete-dialog.component.html',
})
export class PaymentCalculationDeleteDialogComponent {
  paymentCalculation?: IPaymentCalculation;

  constructor(protected paymentCalculationService: PaymentCalculationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentCalculationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
