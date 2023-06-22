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

import { IPaymentCalculation, NewPaymentCalculation } from './payment-calculation.model';

export const sampleWithRequiredData: IPaymentCalculation = {
  id: 23847,
};

export const sampleWithPartialData: IPaymentCalculation = {
  id: 25461,
  paymentExpense: 10017,
  withholdingTax: 50364,
  paymentAmount: 65957,
  fileUploadToken: 'input Guyana black',
};

export const sampleWithFullData: IPaymentCalculation = {
  id: 90597,
  paymentExpense: 47164,
  withholdingVAT: 32479,
  withholdingTax: 54608,
  paymentAmount: 81169,
  fileUploadToken: 'Keyboard Peso port',
  compilationToken: 'virtual brand Outdoors',
};

export const sampleWithNewData: NewPaymentCalculation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
