import { Component, Input } from '@angular/core';
import { ISettlementCurrency } from '../../erp-settlements/settlement-currency/settlement-currency.model';

@Component({
  selector: 'jhi-settlement-currency-option-view',
  template: `
    # {{item.iso4217CurrencyCode}} name: {{ item.currencyName }} country {{ item.country }} code # {{ item.numericCode }}
  `
})
export class SettlementCurrencyOptionViewComponent {

  @Input() item: ISettlementCurrency = {};
}
