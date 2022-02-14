import { Pipe, PipeTransform } from '@angular/core';
import { ISettlement } from '../../erp-settlements/settlement/settlement.model';

@Pipe({
  name: 'formatSettlement',
})
export class FormatSettlementPipe implements PipeTransform {

  transform(value: ISettlement, args: any[]): string {

    let detail = '';

    if (value.description) {

      const limit = args.length > 0 ? parseInt(args[0], 10) : 30;
      const trail = args.length > 1 ? args[1] : '...';

      let desc = '';

      if (value.description.length > limit) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        desc = value.description.substring(0, limit) + trail;
      } else {
        desc = value.description;
      }

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      detail = `id: ${value.id} | #: ${value.paymentNumber} | dd: ${value.paymentDate} |${desc}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? detail :'';
  }
}
