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

import { ControlTypes } from 'app/entities/enumerations/control-types.model';

import { IStringQuestionBase, NewStringQuestionBase } from './string-question-base.model';

export const sampleWithRequiredData: IStringQuestionBase = {
  id: 49305,
  key: 'black',
  label: 'Wooden Mouse Georgia',
  order: 63025,
  controlType: ControlTypes['PASSWORD'],
};

export const sampleWithPartialData: IStringQuestionBase = {
  id: 90608,
  key: 'deposit bandwidth',
  label: 'Sleek',
  order: 10170,
  controlType: ControlTypes['EMAIL'],
  placeholder: 'Fish',
  iterable: true,
};

export const sampleWithFullData: IStringQuestionBase = {
  id: 84425,
  value: 'Dinar invoice Quality',
  key: 'application',
  label: 'Personal incubate',
  required: true,
  order: 78543,
  controlType: ControlTypes['MONTH'],
  placeholder: 'disintermediate PNG Washington',
  iterable: false,
};

export const sampleWithNewData: NewStringQuestionBase = {
  key: 'Associate Technician',
  label: 'Human',
  order: 20540,
  controlType: ControlTypes['NUMBER'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
