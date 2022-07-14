///
/// Erp System - Mark II No 19 (Baruch Series)
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
import { CommonModule } from '@angular/common';
import { FormatServiceOutletPipe } from './format-service-outlet.pipe';
import { FormatDealerIdPipe } from './format-dealer-id.pipe';
import { FormatPaymentCategoryPipe } from './format-payment-category.pipe';
import { TruncatePipe } from './truncate.pipe';
import { FormatPaymentPipe } from './format-payment.pipe';
import { FormatSettlementCurrencyPipe } from './format-settlement-currency.pipe';
import { FormatSettlementPipe } from './format-settlement.pipe';
import { FormatDepreciationMethodPipe } from './format-depreciation-method.pipe';
import { FormatPurchaseOrderPipe } from './format-purchase-order.pipe';
import { FormatTransactionAccountPipe } from './format-transaction-account.pipe';
import { FormatPaymentInvoicePipe } from './format-payment-invoice.pipe';

@NgModule({
  declarations: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe,
    FormatPaymentPipe,
    FormatSettlementCurrencyPipe,
    FormatSettlementPipe,
    FormatDepreciationMethodPipe,
    FormatPurchaseOrderPipe,
    FormatTransactionAccountPipe,
    FormatServiceOutletPipe,
    FormatPaymentInvoicePipe,
  ],
  imports: [CommonModule],
  exports: [
    FormatDealerIdPipe,
    FormatPaymentCategoryPipe,
    TruncatePipe,
    FormatPaymentPipe,
    FormatSettlementCurrencyPipe,
    FormatSettlementPipe,
    FormatDepreciationMethodPipe,
    FormatPurchaseOrderPipe,
    FormatTransactionAccountPipe,
    FormatServiceOutletPipe,
    FormatPaymentInvoicePipe,
  ]
})
export class ErpFormattingModule{}
