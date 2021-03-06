import { Component, Input } from '@angular/core';
import { IPaymentInvoice } from '../../erp-settlements/payment-invoice/payment-invoice.model';

@Component({
  selector: 'jhi-payment-invoice-option-view',
  template: `
    by: {{ item.biller!.dealerName }} #: {{item.invoiceNumber}} dd: {{ item.invoiceDate }}
    of: {{ item.settlementCurrency!.iso4217CurrencyCode }} {{ item.invoiceAmount | number }}
  `,
})
export class PaymentInvoiceOptionViewComponent {

  @Input() item: IPaymentInvoice = {};
}
