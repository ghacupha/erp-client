import { Component, Input } from '@angular/core';
import { IApplicationUser } from '../application-user/application-user.model';

@Component({
  selector: 'jhi-application-user-option-view',
  template: `
    id #: {{ item.id }} name: {{ item.applicationIdentity }} designation: {{ item.designation }}
  `
})
export class ApplicationUserOptionViewComponent {
  @Input() item: IApplicationUser = {};
}
