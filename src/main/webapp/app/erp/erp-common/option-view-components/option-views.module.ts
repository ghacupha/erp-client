///
/// Erp System - Mark II No 27 (Baruch Series) Client 0.1.6-SNAPSHOT
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

import { NgModule } from '@angular/core';
import { PurchaseOrderOptionViewComponent } from './purchase-order-option-view.component';
import { CommonModule } from '@angular/common';
import { SettlementCurrencyOptionViewComponent } from './settlement-currency-option-view.component';
import { PaymentInvoiceOptionViewComponent } from './payment-invoice-option-view.component';
import { BusinessStampOptionViewComponent } from './business-stamp-option-view.component';
import { PaymentCategoryOptionViewComponent } from './payment-category-option-view.component';
import { DealerOptionViewComponent } from './dealer-option-view.component';
import { SettlementOptionViewComponent } from './settlement-option-view.component';
import { SettlementSelectedOptionViewComponent } from './settlement-selected-option-view.component';
import { PaymentInvoiceSelectedOptionViewComponent } from './payment-invoice-selected-option-view.component';
import { JobSheetOptionViewComponent } from './job-sheet-option-view.component';
import { DeliveryNoteOptionViewComponent } from './delivery-note-option-view.component';
import { TransactionAccountOptionViewComponent } from './transaction-account-option-view.component';
import { ServiceOutletOptionViewComponent } from './service-outlet-option-view.component';
import { ApplicationUserOptionViewComponent } from './application-user-option-view.component';
import { PrepaymentAccountOptionViewComponent } from './prepayment-account-option-view.component';

@NgModule({
  declarations: [
    PurchaseOrderOptionViewComponent,
    SettlementCurrencyOptionViewComponent,
    PaymentInvoiceOptionViewComponent,
    PaymentInvoiceSelectedOptionViewComponent,
    BusinessStampOptionViewComponent,
    PaymentCategoryOptionViewComponent,
    DealerOptionViewComponent,
    SettlementOptionViewComponent,
    SettlementSelectedOptionViewComponent,
    JobSheetOptionViewComponent,
    DeliveryNoteOptionViewComponent,
    TransactionAccountOptionViewComponent,
    ServiceOutletOptionViewComponent,
    ApplicationUserOptionViewComponent,
    PrepaymentAccountOptionViewComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PurchaseOrderOptionViewComponent,
    SettlementCurrencyOptionViewComponent,
    PaymentInvoiceOptionViewComponent,
    PaymentInvoiceSelectedOptionViewComponent,
    BusinessStampOptionViewComponent,
    PaymentCategoryOptionViewComponent,
    DealerOptionViewComponent,
    SettlementOptionViewComponent,
    SettlementSelectedOptionViewComponent,
    JobSheetOptionViewComponent,
    DeliveryNoteOptionViewComponent,
    TransactionAccountOptionViewComponent,
    ServiceOutletOptionViewComponent,
    ApplicationUserOptionViewComponent,
    PrepaymentAccountOptionViewComponent,
  ]
})
export class OptionViewsModule {
}
