import { Pipe, PipeTransform } from '@angular/core';
import { IDealer } from '../models/dealer.model';

@Pipe({
  name: 'formatDealerId',
})
export class FormatDealerIdPipe implements PipeTransform {

  transform(value: IDealer): string {

    let accountDetail = '';

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      accountDetail = `Id: ${value.id} | Name: ${value.dealerName} |${value.dealerGroup}`;
    }
    accountDetail = `Selected Dealer Id: ${value.id} | Name: ${value.dealerName}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
