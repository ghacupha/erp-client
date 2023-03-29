import { Pipe, PipeTransform } from '@angular/core';
import { ILeaseContract } from '../../erp-leases/lease-contract/lease-contract.model';

@Pipe({
  name: 'formatLeaseContract',
})
export class FormatLeaseContractPipe implements PipeTransform {

  transform(value: ILeaseContract, args: any[]): string {

    let detail = '';

    if (value.leaseTitle) {

      const limit = args.length > 0 ? parseInt(args[0], 10) : 30;
      const trail = args.length > 1 ? args[1] : '...';

      let desc = '';

      if (value.leaseTitle.length > limit) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        desc = value.leaseTitle.substring(0, limit) + trail;
      } else {
        desc = value.leaseTitle;
      }

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      detail = `id: ${value.id} | ${value.bookingId} |${desc}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? detail :'';
  }
}
