import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PurchaseOrderService } from '../service/purchase-order.service';
import { IPurchaseOrder } from '../../../erp/erp-common/models/purchase-order.model';

@Component({
  templateUrl: './purchase-order-delete-dialog.component.html',
})
export class PurchaseOrderDeleteDialogComponent {
  purchaseOrder?: IPurchaseOrder;

  constructor(protected purchaseOrderService: PurchaseOrderService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchaseOrderService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
