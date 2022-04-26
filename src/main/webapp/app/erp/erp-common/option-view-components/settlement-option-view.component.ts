import { Component, Input } from '@angular/core';
import { ISettlement } from '../../erp-settlements/settlement/settlement.model';

@Component({
  selector: 'jhi-settlement-option-view',
  template: `
    <span class="ng-value-label">
      {{ item.paymentNumber }} dated: {{ item.paymentDate }} With: {{ item.biller!.dealerName }}
      {{ item.settlementCurrency!.iso4217CurrencyCode }} {{ item.paymentAmount | number }}
    </span>
  `
})
export class SettlementOptionViewComponent {

  @Input() item: ISettlement = {};
}
