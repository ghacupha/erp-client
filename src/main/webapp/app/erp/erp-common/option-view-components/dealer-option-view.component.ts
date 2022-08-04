import { Component, Input } from '@angular/core';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';

@Component({
  selector: 'jhi-dealer-option-view',
  template: `
    id #: {{ item.id }} name: {{ item.dealerName }}
  `
})
export class DealerOptionViewComponent {

  @Input() item: IDealer = {};
}
