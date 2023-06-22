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

import { ISignedPayment, NewSignedPayment } from './signed-payment.model';

export const sampleWithRequiredData: ISignedPayment = {
  id: 43635,
  transactionNumber: 'invoice',
  transactionDate: dayjs('2021-09-19'),
  transactionCurrency: CurrencyTypes['KES'],
  transactionAmount: 2940,
};

export const sampleWithPartialData: ISignedPayment = {
  id: 98835,
  transactionNumber: 'Keys',
  transactionDate: dayjs('2021-09-20'),
  transactionCurrency: CurrencyTypes['AED'],
  transactionAmount: 12740,
  dealerName: 'sensor',
  compilationToken: 'Papua Streets',
};

export const sampleWithFullData: ISignedPayment = {
  id: 90233,
  transactionNumber: 'deliver JSON RSS',
  transactionDate: dayjs('2021-09-20'),
  transactionCurrency: CurrencyTypes['INR'],
  transactionAmount: 91573,
  dealerName: 'cyan Architect Designer',
  fileUploadToken: 'Mouse Liberian Algerian',
  compilationToken: 'SMTP matrix',
};

export const sampleWithNewData: NewSignedPayment = {
  transactionNumber: 'Avon',
  transactionDate: dayjs('2021-09-20'),
  transactionCurrency: CurrencyTypes['UGX'],
  transactionAmount: 63943,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
