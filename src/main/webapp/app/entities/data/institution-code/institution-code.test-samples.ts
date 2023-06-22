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

import { IInstitutionCode, NewInstitutionCode } from './institution-code.model';

export const sampleWithRequiredData: IInstitutionCode = {
  id: 9008,
  institutionCode: 'cultivate',
  institutionName: 'payment',
};

export const sampleWithPartialData: IInstitutionCode = {
  id: 40210,
  institutionCode: 'Kip',
  institutionName: 'implementation',
  shortName: 'solution',
  institutionCategory: 'facilitate Grocery Gloves',
};

export const sampleWithFullData: IInstitutionCode = {
  id: 1700,
  institutionCode: 'Representative',
  institutionName: 'Music',
  shortName: 'open-source Infrastructure',
  category: 'support payment end-to-end',
  institutionCategory: 'deposit Fantastic',
};

export const sampleWithNewData: NewInstitutionCode = {
  institutionCode: 'virtual Vista',
  institutionName: 'Executive PNG',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
