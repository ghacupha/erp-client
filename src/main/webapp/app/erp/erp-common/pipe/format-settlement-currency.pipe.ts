///
/// Erp System - Mark III No 5 (Caleb Series) Client 0.4.0-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
