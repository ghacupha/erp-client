import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPayment } from '../../../../erp-common/models/payment.model';
import { PaymentService } from '../../../../erp-common/services/payment.service';

@Component({
  templateUrl: './payment-delete-dialog.component.html',
})
export class PaymentDeleteDialogComponent {
  payment?: IPayment;

  constructor(protected paymentService: PaymentService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
