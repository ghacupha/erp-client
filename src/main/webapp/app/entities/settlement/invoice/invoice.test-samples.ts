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

import { CurrencyTypes } from 'app/entities/enumerations/currency-types.model';

import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 91509,
  invoiceNumber: 'Avon Mandatory',
  currency: CurrencyTypes['GBP'],
};

export const sampleWithPartialData: IInvoice = {
  id: 89161,
  invoiceNumber: 'Venezuela Arkansas auxiliary',
  currency: CurrencyTypes['CNY'],
  fileUploadToken: 'empower Buckinghamshire Florida',
};

export const sampleWithFullData: IInvoice = {
  id: 13401,
  invoiceNumber: 'Account',
  invoiceDate: dayjs('2021-06-26'),
  invoiceAmount: 91014,
  currency: CurrencyTypes['CAD'],
  paymentReference: 'Security Granite HTTP',
  dealerName: 'mobile',
  fileUploadToken: 'South',
  compilationToken: 'application invoice',
};

export const sampleWithNewData: NewInvoice = {
  invoiceNumber: 'Nevada Shoes Ranch',
  currency: CurrencyTypes['USD'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
