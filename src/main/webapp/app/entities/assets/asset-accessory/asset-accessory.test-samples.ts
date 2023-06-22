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

import { IAssetAccessory, NewAssetAccessory } from './asset-accessory.model';

export const sampleWithRequiredData: IAssetAccessory = {
  id: 88388,
};

export const sampleWithPartialData: IAssetAccessory = {
  id: 23537,
  assetTag: 'discrete Steel Practical',
  modelNumber: 'Chips',
  serialNumber: 'Avon bypass',
};

export const sampleWithFullData: IAssetAccessory = {
  id: 50076,
  assetTag: 'withdrawal SMS override',
  assetDetails: 'AGP program Customer',
  comments: '../fake-data/blob/hipster.png',
  commentsContentType: 'unknown',
  modelNumber: 'calculating',
  serialNumber: 'payment',
};

export const sampleWithNewData: NewAssetAccessory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
