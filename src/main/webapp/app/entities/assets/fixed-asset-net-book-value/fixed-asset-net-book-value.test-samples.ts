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

import { DepreciationRegime } from 'app/entities/enumerations/depreciation-regime.model';

import { IFixedAssetNetBookValue, NewFixedAssetNetBookValue } from './fixed-asset-net-book-value.model';

export const sampleWithRequiredData: IFixedAssetNetBookValue = {
  id: 66139,
};

export const sampleWithPartialData: IFixedAssetNetBookValue = {
  id: 43785,
  serviceOutletCode: 'solution-oriented compressing Connecticut',
  assetDescription: 'purple',
  assetCategory: 'projection Computers Computer',
  netBookValue: 75708,
  fileUploadToken: 'Table 1080p Loan',
};

export const sampleWithFullData: IFixedAssetNetBookValue = {
  id: 61656,
  assetNumber: 68452,
  serviceOutletCode: 'withdrawal deposit',
  assetTag: 'teal Concrete Implementation',
  assetDescription: 'demand-driven Bike Car',
  netBookValueDate: dayjs('2021-03-23'),
  assetCategory: 'Island',
  netBookValue: 90039,
  depreciationRegime: DepreciationRegime['STRAIGHT_LINE_BASIS'],
  fileUploadToken: 'virtual',
  compilationToken: 'reboot Architect real-time',
};

export const sampleWithNewData: NewFixedAssetNetBookValue = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
