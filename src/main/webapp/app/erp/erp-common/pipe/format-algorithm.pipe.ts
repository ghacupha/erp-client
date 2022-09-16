import { Pipe, PipeTransform } from '@angular/core';
import { IAlgorithm } from '../../erp-pages/algorithm/algorithm.model';

/**
 * Formatting for inline presentation of algorithm instances
 */
@Pipe({
  name: 'formatAlgorithm',
})
export class FormatAlgorithmPipe implements PipeTransform {

  transform(value: IAlgorithm): string {

    const accountDetail = `Selected Algorithm Id: ${value.id} | Name: ${value.name}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
