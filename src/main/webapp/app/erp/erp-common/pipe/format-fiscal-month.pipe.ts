import { Pipe, PipeTransform } from '@angular/core';
import { IFiscalMonth } from '../../erp-pages/fiscal-month/fiscal-month.model';

@Pipe({
  name: 'formatFiscalMonth',
})
export class FormatFiscalMonthPipe implements PipeTransform {

  transform(value: IFiscalMonth, args: any[]): string {

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
        detail = `Code: ${value.fiscalMonthCode} | Start Date: ${value.startDate} | End Date: ${value.endDate} |${desc}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? detail :'';
  }
}
