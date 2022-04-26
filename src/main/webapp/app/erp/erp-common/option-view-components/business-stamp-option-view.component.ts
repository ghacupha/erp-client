import { Component, Input } from '@angular/core';
import { IBusinessStamp } from '../../erp-settlements/business-stamp/business-stamp.model';

@Component({
  selector: 'jhi-business-stamp-option-view',
  template: `
    By: {{ item.stampHolder!.dealerName }} Dated {{ item.stampDate }} Details: {{ item.purpose }}
  `
})
export class BusinessStampOptionViewComponent {
  @Input() item: IBusinessStamp = {};
}
