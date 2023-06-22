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

import { IPaymentLabel, NewPaymentLabel } from './payment-label.model';

export const sampleWithRequiredData: IPaymentLabel = {
  id: 18298,
  description: 'Future Plastic',
};

export const sampleWithPartialData: IPaymentLabel = {
  id: 98927,
  description: 'Bedfordshire',
  comments: 'web-enabled',
  fileUploadToken: 'digital orchestrate Manat',
};

export const sampleWithFullData: IPaymentLabel = {
  id: 1429,
  description: 'tangible',
  comments: 'Freeway',
  fileUploadToken: 'Research Savings',
  compilationToken: 'Ball iterate',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewPaymentLabel = {
  description: 'Specialist Granite',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
