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

import { IFixedAssetAcquisition, NewFixedAssetAcquisition } from './fixed-asset-acquisition.model';

export const sampleWithRequiredData: IFixedAssetAcquisition = {
  id: 10000,
};

export const sampleWithPartialData: IFixedAssetAcquisition = {
  id: 64844,
  assetTag: 'Fresh Implementation transparent',
  assetDescription: 'impactful facilitate Forward',
  assetCategory: 'Legacy',
  fileUploadToken: 'invoice',
};

export const sampleWithFullData: IFixedAssetAcquisition = {
  id: 41578,
  assetNumber: 91262,
  serviceOutletCode: 'program Licensed',
  assetTag: 'Checking Intuitive',
  assetDescription: 'cross-platform reinvent',
  purchaseDate: dayjs('2021-03-22'),
  assetCategory: 'content-based',
  purchasePrice: 64767,
  fileUploadToken: 'Avon',
};

export const sampleWithNewData: NewFixedAssetAcquisition = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
