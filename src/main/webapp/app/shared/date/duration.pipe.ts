import { Pipe, PipeTransform } from '@angular/core';

import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      dayjs.extend(duration);
      return dayjs.duration(value).humanize();
    }
    return '';
  }
}
