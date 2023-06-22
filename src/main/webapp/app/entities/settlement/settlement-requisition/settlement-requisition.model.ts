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
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { IPaymentInvoice } from 'app/entities/settlement/payment-invoice/payment-invoice.model';
import { IDeliveryNote } from 'app/entities/settlement/delivery-note/delivery-note.model';
import { IJobSheet } from 'app/entities/settlement/job-sheet/job-sheet.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { ISettlement } from 'app/entities/settlement/settlement/settlement.model';
import { PaymentStatus } from 'app/entities/enumerations/payment-status.model';

export interface ISettlementRequisition {
  id: number;
  description?: string | null;
  serialNumber?: string | null;
  timeOfRequisition?: dayjs.Dayjs | null;
  requisitionNumber?: string | null;
  paymentAmount?: number | null;
  paymentStatus?: PaymentStatus | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  currentOwner?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
  nativeOwner?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
  nativeDepartment?: Pick<IDealer, 'id' | 'dealerName'> | null;
  biller?: Pick<IDealer, 'id' | 'dealerName'> | null;
  paymentInvoices?: Pick<IPaymentInvoice, 'id' | 'invoiceNumber'>[] | null;
  deliveryNotes?: Pick<IDeliveryNote, 'id' | 'deliveryNoteNumber'>[] | null;
  jobSheets?: Pick<IJobSheet, 'id' | 'serialNumber'>[] | null;
  signatures?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
  applicationMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  settlements?: Pick<ISettlement, 'id' | 'paymentNumber'>[] | null;
}

export type NewSettlementRequisition = Omit<ISettlementRequisition, 'id'> & { id: null };
