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

import { IPaymentRequisition, NewPaymentRequisition } from './payment-requisition.model';

export const sampleWithRequiredData: IPaymentRequisition = {
  id: 8848,
};

export const sampleWithPartialData: IPaymentRequisition = {
  id: 96591,
  receptionDate: dayjs('2021-07-20'),
  dealerName: 'Borders violet',
  briefDescription: 'Borders eyeballs methodologies',
  disbursementCost: 17036,
  compilationToken: 'Berkshire Nevada',
};

export const sampleWithFullData: IPaymentRequisition = {
  id: 17624,
  receptionDate: dayjs('2021-07-21'),
  dealerName: 'redundant',
  briefDescription: 'Colorado',
  requisitionNumber: 'bandwidth',
  invoicedAmount: 37604,
  disbursementCost: 60518,
  taxableAmount: 38827,
  requisitionProcessed: true,
  fileUploadToken: 'Bacon lavender',
  compilationToken: 'Iowa',
};

export const sampleWithNewData: NewPaymentRequisition = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
