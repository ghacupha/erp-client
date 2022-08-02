import { Component, Input } from '@angular/core';
import { ISettlement } from '../../erp-settlements/settlement/settlement.model';

@Component({
  selector: 'jhi-settlement-selected-option-view',
  template: `
    <span class="ng-value-label">
      {{item.paymentNumber }} {{item.paymentDate }}
      {{item.settlementCurrency!.iso4217CurrencyCode}} {{ item.paymentAmount | number }}
      {{ item.biller!.dealerName }}
    </span>
  `
})
export class SettlementSelectedOptionViewComponent {

  @Input() item: ISettlement = {};
}
