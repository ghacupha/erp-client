import { Component, Input } from '@angular/core';
import { IServiceOutlet } from '../../erp-granular/service-outlet/service-outlet.model';

@Component({
  selector: 'jhi-service-outlet-option-view',
  template: `
    # {{item.id}} Code: {{ item.outletCode }} Name: {{ item.outletName }}
  `
})
export class ServiceOutletOptionViewComponent {

  @Input() item: IServiceOutlet = {};
}
