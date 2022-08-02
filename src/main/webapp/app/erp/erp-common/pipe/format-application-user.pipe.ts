import { Pipe, PipeTransform } from '@angular/core';
import { IApplicationUser } from '../application-user/application-user.model';

@Pipe({
  name: 'formatApplicationUser',
})
export class FormatApplicationUserPipe implements PipeTransform {

  transform(value: IApplicationUser): string {

    const accountDetail = `Selected User Id: ${value.id} | Name: ${value.applicationIdentity}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
