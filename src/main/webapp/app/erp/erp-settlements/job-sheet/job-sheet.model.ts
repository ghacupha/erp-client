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
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IBusinessDocument } from '../../erp-pages/business-document/business-document.model';
import { IPaymentLabel } from '../../erp-pages/payment-label/payment-label.model';
import { IBusinessStamp } from '../business-stamp/business-stamp.model';

export interface IJobSheet {
  id: number;
  serialNumber?: string | null;
  jobSheetDate?: dayjs.Dayjs | null;
  details?: string | null;
  remarks?: string | null;
  biller?: Pick<IDealer, 'id' | 'dealerName'> | null;
  signatories?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  contactPerson?: Pick<IDealer, 'id' | 'dealerName'> | null;
  businessStamps?: Pick<IBusinessStamp, 'id' | 'details'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewJobSheet = Omit<IJobSheet, 'id'> & { id: null };
