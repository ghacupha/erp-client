import { Pipe, PipeTransform } from '@angular/core';
import { IPrepaymentAccount } from '../../erp-prepayments/prepayment-account/prepayment-account.model';

@Pipe({
  name: 'formatPrepaymentAccount',
})
export class FormatPrepaymentAccountPipe implements PipeTransform {

  transform(value: IPrepaymentAccount): string {

    let accountDetail = '';

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      accountDetail = `Id: ${value.id} | Catalogue: ${value.catalogueNumber} |${value.particulars}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
