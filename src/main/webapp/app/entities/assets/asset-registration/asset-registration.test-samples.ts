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

import { IAssetRegistration, NewAssetRegistration } from './asset-registration.model';

export const sampleWithRequiredData: IAssetRegistration = {
  id: 8222,
  assetNumber: 'withdrawal',
  assetTag: 'program',
  assetCost: 67894,
};

export const sampleWithPartialData: IAssetRegistration = {
  id: 85546,
  assetNumber: 'Mandatory SDD',
  assetTag: 'Cambridgeshire Granite Loan',
  assetDetails: 'Gorgeous conglomeration gold',
  assetCost: 58024,
  modelNumber: 'paradigm deposit',
  serialNumber: 'Managed Persistent',
};

export const sampleWithFullData: IAssetRegistration = {
  id: 12861,
  assetNumber: 'Concrete',
  assetTag: 'brand deposit Identity',
  assetDetails: 'foreground',
  assetCost: 23071,
  comments: '../fake-data/blob/hipster.png',
  commentsContentType: 'unknown',
  modelNumber: 'California Health',
  serialNumber: 'Liaison',
};

export const sampleWithNewData: NewAssetRegistration = {
  assetNumber: 'Granite',
  assetTag: 'Concrete whiteboard Movies',
  assetCost: 29546,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
