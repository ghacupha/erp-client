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

import { IPayment, NewPayment } from './payment.model';

export const sampleWithRequiredData: IPayment = {
  id: 47537,
  settlementCurrency: CurrencyTypes['UGX'],
};

export const sampleWithPartialData: IPayment = {
  id: 44057,
  paymentNumber: 'Investor hack Curve',
  paymentAmount: 70979,
  settlementCurrency: CurrencyTypes['GBP'],
  fileUploadToken: 'strategic methodical',
  compilationToken: 'boliviano Loan Account',
};

export const sampleWithFullData: IPayment = {
  id: 21456,
  paymentNumber: 'Tunnel',
  paymentDate: dayjs('2021-06-26'),
  invoicedAmount: 42556,
  paymentAmount: 66978,
  description: 'RSS',
  settlementCurrency: CurrencyTypes['CNY'],
  calculationFile: '../fake-data/blob/hipster.png',
  calculationFileContentType: 'unknown',
  dealerName: 'Corporate connect reintermediate',
  purchaseOrderNumber: 'Tasty',
  fileUploadToken: 'hack',
  compilationToken: 'Sleek',
};

export const sampleWithNewData: NewPayment = {
  settlementCurrency: CurrencyTypes['USD'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
