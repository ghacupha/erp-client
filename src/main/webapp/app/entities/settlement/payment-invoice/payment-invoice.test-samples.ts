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

import { IPaymentInvoice, NewPaymentInvoice } from './payment-invoice.model';

export const sampleWithRequiredData: IPaymentInvoice = {
  id: 46546,
  invoiceNumber: 'synergize',
};

export const sampleWithPartialData: IPaymentInvoice = {
  id: 31865,
  invoiceNumber: 'compelling Buckinghamshire orchid',
  fileUploadToken: 'COM',
  compilationToken: 'Tonga matrix synthesizing',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IPaymentInvoice = {
  id: 54300,
  invoiceNumber: 'program whiteboard',
  invoiceDate: dayjs('2022-02-03'),
  invoiceAmount: 67694,
  fileUploadToken: 'ivory Accountability Towels',
  compilationToken: 'Chair Jewelery plum',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewPaymentInvoice = {
  invoiceNumber: 'out-of-the-box context-sensitive B2B',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
