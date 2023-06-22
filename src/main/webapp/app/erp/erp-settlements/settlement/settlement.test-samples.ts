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

import { ISettlement, NewSettlement } from './settlement.model';

export const sampleWithRequiredData: ISettlement = {
  id: 70014,
};

export const sampleWithPartialData: ISettlement = {
  id: 53479,
  paymentDate: dayjs('2022-02-02'),
  calculationFile: '../fake-data/blob/hipster.png',
  calculationFileContentType: 'unknown',
};

export const sampleWithFullData: ISettlement = {
  id: 39615,
  paymentNumber: 'South',
  paymentDate: dayjs('2022-02-02'),
  paymentAmount: 7698,
  description: 'Sahara Plastic Outdoors',
  notes: 'Developer Small Salad',
  calculationFile: '../fake-data/blob/hipster.png',
  calculationFileContentType: 'unknown',
  fileUploadToken: 'Unbranded Incredible invoice',
  compilationToken: 'Money e-enable',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewSettlement = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
