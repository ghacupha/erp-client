import { Component, Input } from '@angular/core';
import { IPaymentInvoice } from '../../erp-settlements/payment-invoice/payment-invoice.model';

@Component({
  selector: 'jhi-payment-invoice-selected-option-view',
  template: `
    <span class="ng-value-label">
      {{item.invoiceNumber }} {{item.invoiceDate }}
      {{item.settlementCurrency!.iso4217CurrencyCode}} {{ item.invoiceAmount | number }}
      {{ item.biller!.dealerName }}
    </span>
  `
})
export class PaymentInvoiceSelectedOptionViewComponent {

  @Input() item: IPaymentInvoice = {};
}
