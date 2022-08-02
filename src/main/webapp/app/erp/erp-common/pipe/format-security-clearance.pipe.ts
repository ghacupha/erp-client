import { Pipe, PipeTransform } from '@angular/core';
import { ISecurityClearance } from '../security-clearance/security-clearance.model';

@Pipe({
  name: 'formatSecurityClearance',
})
export class FormatSecurityClearancePipe implements PipeTransform {

  transform(value: ISecurityClearance): string {

    const accountDetail = `Id: ${value.id} | Clearance: ${value.clearanceLevel}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
