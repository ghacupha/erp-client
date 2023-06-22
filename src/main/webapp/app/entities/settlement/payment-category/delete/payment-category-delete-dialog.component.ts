import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaymentCategory } from '../payment-category.model';
import { PaymentCategoryService } from '../service/payment-category.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './payment-category-delete-dialog.component.html',
})
export class PaymentCategoryDeleteDialogComponent {
  paymentCategory?: IPaymentCategory;

  constructor(protected paymentCategoryService: PaymentCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentCategoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
