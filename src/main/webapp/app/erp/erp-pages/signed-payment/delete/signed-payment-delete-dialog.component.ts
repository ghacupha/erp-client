import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISignedPayment } from '../../../erp-common/models/signed-payment.model';
import { SignedPaymentService } from '../../../erp-common/services/signed-payment.service';

@Component({
  templateUrl: './signed-payment-delete-dialog.component.html',
})
export class SignedPaymentDeleteDialogComponent {
  signedPayment?: ISignedPayment;

  constructor(protected signedPaymentService: SignedPaymentService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.signedPaymentService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
