import { Pipe, PipeTransform } from '@angular/core';
import { IDepreciationMethod } from '../../erp-assets/depreciation-method/depreciation-method.model';

@Pipe({
  name: 'formatDepreciationMethod',
})
export class FormatDepreciationMethodPipe implements PipeTransform {

  transform(value: IDepreciationMethod, args: any[]): string {

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
      detail = `id: ${value.id} | #: ${value.description} | dd: ${value.depreciationType} |${desc}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? detail :'';
  }
}
