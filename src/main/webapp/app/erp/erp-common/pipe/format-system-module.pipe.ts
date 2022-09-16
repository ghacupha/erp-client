import { Pipe, PipeTransform } from '@angular/core';
import { ISystemModule } from '../../erp-pages/system-module/system-module.model';

/**
 * Inline presentation of system-module
 */
@Pipe({
  name: 'formatSystemModule',
})
export class FormatSystemModulePipe implements PipeTransform {

  transform(value: ISystemModule): string {

    const accountDetail = `Selected Module Id: ${value.id} | Name: ${value.moduleName}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
