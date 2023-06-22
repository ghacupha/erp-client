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

import { IPrepaymentMapping, NewPrepaymentMapping } from './prepayment-mapping.model';

export const sampleWithRequiredData: IPrepaymentMapping = {
  id: 70775,
  parameterKey: 'teal Regional',
  parameterGuid: 'a6e02fa1-0ef7-4823-9f69-7aff134587db',
  parameter: 'hacking',
};

export const sampleWithPartialData: IPrepaymentMapping = {
  id: 24030,
  parameterKey: 'User-centric',
  parameterGuid: '0d8bc949-8bf5-4497-b859-50ed28a6fe6c',
  parameter: 'hack',
};

export const sampleWithFullData: IPrepaymentMapping = {
  id: 11074,
  parameterKey: 'circuit',
  parameterGuid: '1f9eda12-737c-47bc-9419-04fdb2176b6f',
  parameter: 'matrix Global',
};

export const sampleWithNewData: NewPrepaymentMapping = {
  parameterKey: 'Stream optical Licensed',
  parameterGuid: 'c7378f77-88ab-41a7-88cd-49cdea6bb749',
  parameter: 'Ridges Multi-channelled Forward',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
