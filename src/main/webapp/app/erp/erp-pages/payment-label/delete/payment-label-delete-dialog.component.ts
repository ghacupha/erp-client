import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPaymentLabel } from '../../../erp-common/models/payment-label.model';
import { PaymentLabelService } from '../../../erp-common/services/payment-label.service';

@Component({
  templateUrl: './payment-label-delete-dialog.component.html',
})
export class PaymentLabelDeleteDialogComponent {
  paymentLabel?: IPaymentLabel;

  constructor(protected paymentLabelService: PaymentLabelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentLabelService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
