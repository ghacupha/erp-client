import { Pipe, PipeTransform } from '@angular/core';
import { IPurchaseOrder } from '../../erp-settlements/purchase-order/purchase-order.model';

@Pipe({
  name: 'formatPurchaseOrder',
})
export class FormatPurchaseOrderPipe implements PipeTransform {

  transform(value: IPurchaseOrder): string {

    let accountDetail = '';

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      accountDetail = `Id: ${value.id} | Name: ${value.vendor?.dealerName} |${value.description}`;
    }
    accountDetail = `Selected Dealer Id: ${value.id} | Name: ${value.vendor?.dealerName}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
