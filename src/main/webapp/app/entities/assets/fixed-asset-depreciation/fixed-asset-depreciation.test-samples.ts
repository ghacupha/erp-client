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

import { IFixedAssetDepreciation, NewFixedAssetDepreciation } from './fixed-asset-depreciation.model';

export const sampleWithRequiredData: IFixedAssetDepreciation = {
  id: 16184,
};

export const sampleWithPartialData: IFixedAssetDepreciation = {
  id: 31785,
  assetNumber: 7195,
  assetDescription: 'PCI Frozen Account',
  assetCategory: 'Assistant deposit Director',
  depreciationAmount: 18200,
  fileUploadToken: 'static scalable solid',
};

export const sampleWithFullData: IFixedAssetDepreciation = {
  id: 2079,
  assetNumber: 2553,
  serviceOutletCode: 'JBOD Reverse-engineered interfaces',
  assetTag: 'Switchable',
  assetDescription: 'Granite',
  depreciationDate: dayjs('2021-03-22'),
  assetCategory: 'Drive',
  depreciationAmount: 33521,
  depreciationRegime: DepreciationRegime['STRAIGHT_LINE_BASIS'],
  fileUploadToken: 'system Texas',
  compilationToken: 'array Factors Ngultrum',
};

export const sampleWithNewData: NewFixedAssetDepreciation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
