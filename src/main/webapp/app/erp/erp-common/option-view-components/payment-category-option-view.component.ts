import { Component, Input } from '@angular/core';
import { IPaymentCategory } from '../../erp-settlements/payments/payment-category/payment-category.model';

@Component({
  selector: 'jhi-payment-category-option-view',
  template: `
    # {{ item.id }} Des: {{ item.categoryName }} Desc: {{ item.categoryDescription }}
  `
})
export class PaymentCategoryOptionViewComponent {

  @Input() item: IPaymentCategory = {};
}
