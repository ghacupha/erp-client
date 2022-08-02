import { Pipe, PipeTransform } from '@angular/core';
import { ISettlementCurrency } from '../../erp-settlements/settlement-currency/settlement-currency.model';

@Pipe({
  name: 'formatSettlementCurrency',
})
export class FormatSettlementCurrencyPipe implements PipeTransform {

  transform(value: ISettlementCurrency, args: any[]): string {

    let detail = '';

    if (value.iso4217CurrencyCode) {

      const limit = args.length > 0 ? parseInt(args[0], 10) : 3;
      const trail = args.length > 1 ? args[1] : '...';

      let desc = '';

      if (value.iso4217CurrencyCode.length > limit) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        desc = value.iso4217CurrencyCode.substring(0, limit) + trail;
      } else {
        desc = value.iso4217CurrencyCode;
      }

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      detail = `Id: ${value.id} | Name: ${value.currencyName} |${desc}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? detail :'';
  }
}
