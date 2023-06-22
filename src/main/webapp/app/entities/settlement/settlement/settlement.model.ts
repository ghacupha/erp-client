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
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { IPaymentCategory } from 'app/entities/settlement/payment-category/payment-category.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { IPaymentInvoice } from 'app/entities/settlement/payment-invoice/payment-invoice.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';

export interface ISettlement {
  id: number;
  paymentNumber?: string | null;
  paymentDate?: dayjs.Dayjs | null;
  paymentAmount?: number | null;
  description?: string | null;
  notes?: string | null;
  calculationFile?: string | null;
  calculationFileContentType?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  paymentCategory?: Pick<IPaymentCategory, 'id' | 'categoryName'> | null;
  groupSettlement?: Pick<ISettlement, 'id'> | null;
  biller?: Pick<IDealer, 'id' | 'dealerName'> | null;
  paymentInvoices?: Pick<IPaymentInvoice, 'id' | 'invoiceNumber'>[] | null;
  signatories?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewSettlement = Omit<ISettlement, 'id'> & { id: null };
