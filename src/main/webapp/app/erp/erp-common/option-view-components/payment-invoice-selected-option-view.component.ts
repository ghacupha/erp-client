///
/// Erp System - Mark III No 6 (Caleb Series) Client 0.7.0
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Component, Input } from '@angular/core';
import { IPaymentInvoice } from '../../erp-settlements/payment-invoice/payment-invoice.model';

@Component({
  selector: 'jhi-payment-invoice-selected-option-view',
  template: `
    <span class="ng-value-label">
      {{item.invoiceNumber }} {{item.invoiceDate }}
      {{item.settlementCurrency!.iso4217CurrencyCode}} {{ item.invoiceAmount | number }}
      {{ item.biller!.dealerName }}
    </span>
  `
})
export class PaymentInvoiceSelectedOptionViewComponent {

  @Input() item: IPaymentInvoice = {};
}
