///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
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

import dayjs from 'dayjs/esm';
import { IPurchaseOrder } from '../purchase-order/purchase-order.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ISettlementCurrency } from '../settlement-currency/settlement-currency.model';
import { IPaymentLabel } from '../../erp-pages/payment-label/payment-label.model';
import { IPaymentInvoice } from '../payment-invoice/payment-invoice.model';

export interface ICreditNote {
  id: number;
  creditNumber?: string | null;
  creditNoteDate?: dayjs.Dayjs | null;
  creditAmount?: number | null;
  remarks?: string | null;
  purchaseOrders?: Pick<IPurchaseOrder, 'id' | 'purchaseOrderNumber'>[] | null;
  invoices?: Pick<IPaymentInvoice, 'id' | 'invoiceNumber'>[] | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
}

export type NewCreditNote = Omit<ICreditNote, 'id'> & { id: null };
