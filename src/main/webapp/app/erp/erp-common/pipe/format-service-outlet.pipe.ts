import { Pipe, PipeTransform } from '@angular/core';
import { IServiceOutlet } from '../../erp-granular/service-outlet/service-outlet.model';

@Pipe({
  name: 'formatServiceOutlet',
})
export class FormatServiceOutletPipe implements PipeTransform {

  transform(value: IServiceOutlet): string {

    let accountDetail = '';

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      accountDetail = `Id: ${value.id} | Name: ${value.outletName} |${value.outletCode}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
