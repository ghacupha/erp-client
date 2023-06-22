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
import { IPurchaseOrder } from 'app/entities/settlement/purchase-order/purchase-order.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { IDeliveryNote } from 'app/entities/settlement/delivery-note/delivery-note.model';
import { IJobSheet } from 'app/entities/settlement/job-sheet/job-sheet.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';

export interface IPaymentInvoice {
  id: number;
  invoiceNumber?: string | null;
  invoiceDate?: dayjs.Dayjs | null;
  invoiceAmount?: number | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  purchaseOrders?: Pick<IPurchaseOrder, 'id' | 'purchaseOrderNumber'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  biller?: Pick<IDealer, 'id' | 'dealerName'> | null;
  deliveryNotes?: Pick<IDeliveryNote, 'id' | 'deliveryNoteNumber'>[] | null;
  jobSheets?: Pick<IJobSheet, 'id' | 'serialNumber'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewPaymentInvoice = Omit<IPaymentInvoice, 'id'> & { id: null };
