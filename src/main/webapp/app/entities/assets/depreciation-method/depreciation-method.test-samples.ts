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

import { DepreciationTypes } from 'app/entities/enumerations/depreciation-types.model';

import { IDepreciationMethod, NewDepreciationMethod } from './depreciation-method.model';

export const sampleWithRequiredData: IDepreciationMethod = {
  id: 49775,
  depreciationMethodName: 'withdrawal Alley',
  depreciationType: DepreciationTypes['STRAIGHT_LINE'],
};

export const sampleWithPartialData: IDepreciationMethod = {
  id: 73349,
  depreciationMethodName: 'Chair',
  description: 'compress Granite embrace',
  depreciationType: DepreciationTypes['DECLINING_BALANCE'],
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IDepreciationMethod = {
  id: 85292,
  depreciationMethodName: 'Illinois',
  description: 'generate',
  depreciationType: DepreciationTypes[undefined],
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewDepreciationMethod = {
  depreciationMethodName: 'International engage',
  depreciationType: DepreciationTypes[undefined],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
