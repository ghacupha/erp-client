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

import { IAssetCategory, NewAssetCategory } from './asset-category.model';

export const sampleWithRequiredData: IAssetCategory = {
  id: 26614,
  assetCategoryName: 'Steel',
};

export const sampleWithPartialData: IAssetCategory = {
  id: 44141,
  assetCategoryName: 'Security Enterprise-wide',
  description: 'bottom-line Clothing',
  notes: 'Car Central online',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IAssetCategory = {
  id: 74037,
  assetCategoryName: 'Saint Dollar virtual',
  description: 'Consultant programming',
  notes: 'Nevada',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAssetCategory = {
  assetCategoryName: 'deposit generate Pants',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
