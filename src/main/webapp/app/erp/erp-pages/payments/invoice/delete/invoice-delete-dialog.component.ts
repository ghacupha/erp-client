import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { InvoiceService } from '../../../../erp-common/services/invoice.service';
import { IInvoice } from '../../../../erp-common/models/invoice.model';

@Component({
  templateUrl: './invoice-delete-dialog.component.html',
})
export class InvoiceDeleteDialogComponent {
  invoice?: IInvoice;

  constructor(protected invoiceService: InvoiceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.invoiceService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
