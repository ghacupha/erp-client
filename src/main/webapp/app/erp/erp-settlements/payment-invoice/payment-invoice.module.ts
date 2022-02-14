import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentInvoiceComponent } from './list/payment-invoice.component';
import { PaymentInvoiceDetailComponent } from './detail/payment-invoice-detail.component';
import { PaymentInvoiceUpdateComponent } from './update/payment-invoice-update.component';
import { PaymentInvoiceDeleteDialogComponent } from './delete/payment-invoice-delete-dialog.component';
import { PaymentInvoiceRoutingModule } from './route/payment-invoice-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';

@NgModule({
  imports: [SharedModule, PaymentInvoiceRoutingModule, ErpCommonModule],
  declarations: [
    PaymentInvoiceComponent,
    PaymentInvoiceDetailComponent,
    PaymentInvoiceUpdateComponent,
    PaymentInvoiceDeleteDialogComponent,
  ],
  entryComponents: [PaymentInvoiceDeleteDialogComponent],
})
export class PaymentInvoiceModule {}
