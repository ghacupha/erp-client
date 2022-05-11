import { Pipe, PipeTransform } from '@angular/core';
import { IPaymentInvoice } from '../../erp-settlements/payment-invoice/payment-invoice.model';

@Pipe({
  name: 'formatPaymentInvoice',
})
export class FormatPaymentInvoicePipe implements PipeTransform {

  transform(value: IPaymentInvoice): string {

    let accountDetail = '';

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      accountDetail = `Id: ${value.id} | Name: ${value.biller?.dealerName} |${value.invoiceNumber} |${value.invoiceDate}`;
    }
    accountDetail = `Invoice System Id: ${value.id} | Vendor: ${value.biller?.dealerName}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
