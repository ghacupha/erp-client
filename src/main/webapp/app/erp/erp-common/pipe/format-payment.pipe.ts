import { Pipe, PipeTransform } from '@angular/core';
import { IPayment } from '../models/payment.model';

@Pipe({
  name: 'formatPayment',
})
export class FormatPaymentPipe implements PipeTransform {

  transform(value: IPayment, args: any[]): string {

    let detail = '';


    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {

      const limit = args.length > 0 ? parseInt(args[0], 10) : 30;
      const trail = args.length > 1 ? args[1] : '...';

      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands,@typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      const desc = value.description!.length > limit ? value.description.substing(0, limit) + trail : value.description;

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      detail = `Id: ${value.id} | #: ${value.paymentNumber} | dd: ${value.paymentDate} |${desc}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? detail :'';
  }
}
