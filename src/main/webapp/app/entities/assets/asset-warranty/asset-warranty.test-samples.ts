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

import { IAssetWarranty, NewAssetWarranty } from './asset-warranty.model';

export const sampleWithRequiredData: IAssetWarranty = {
  id: 19997,
};

export const sampleWithPartialData: IAssetWarranty = {
  id: 28054,
  description: 'Wooden Lek',
  expiryDate: dayjs('2023-05-04'),
};

export const sampleWithFullData: IAssetWarranty = {
  id: 50258,
  assetTag: 'New Sports',
  description: 'SDD',
  modelNumber: 'Villages',
  serialNumber: 'Executive',
  expiryDate: dayjs('2023-05-05'),
};

export const sampleWithNewData: NewAssetWarranty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
