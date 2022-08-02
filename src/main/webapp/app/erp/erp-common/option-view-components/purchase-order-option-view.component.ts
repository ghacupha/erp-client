import { Component, Input } from '@angular/core';
import { IPurchaseOrder } from '../../erp-settlements/purchase-order/purchase-order.model';

@Component({
  selector: 'jhi-purchase-order-option-view',
  template: `
    # {{  item.purchaseOrderNumber }} dated: {{ item.purchaseOrderDate }}
    of: {{ item.settlementCurrency!.iso4217CurrencyCode }} {{ item.purchaseOrderAmount | number }}
    by: {{ item.vendor!.dealerName }}
  `,
})
export class PurchaseOrderOptionViewComponent {

  @Input() item: IPurchaseOrder = {};
}
