import { Component, Input } from '@angular/core';
import { IDeliveryNote } from '../../erp-settlements/delivery-note/delivery-note.model';

@Component({
  selector: 'jhi-delivery-note-option-view',
  template: `
    {{item.deliveryNoteNumber}} By: {{ item.supplier!.dealerName }} Desc: {{ item.description }}
  `
})
export class DeliveryNoteOptionViewComponent {
  @Input() item: IDeliveryNote = {};
}
