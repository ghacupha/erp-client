import { Pipe, PipeTransform } from '@angular/core';
import { ITransactionAccount } from '../../erp-accounts/transaction-account/transaction-account.model';

@Pipe({
  name: 'formatTransactionAccount',
})
export class FormatTransactionAccountPipe implements PipeTransform {

  transform(value: ITransactionAccount, args: any[]): string {

    let detail = '';

    if (value.accountName) {

      const limit = args.length > 0 ? parseInt(args[0], 10) : 30;
      const trail = args.length > 1 ? args[1] : '...';

      let desc = '';

      if (value.accountName.length > limit) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        desc = value.accountName.substring(0, limit) + trail;
      } else {
        desc = value.accountName;
      }

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      detail = `id: ${value.id} | #: ${value.accountNumber} | ${desc}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? detail :'';
  }
}
