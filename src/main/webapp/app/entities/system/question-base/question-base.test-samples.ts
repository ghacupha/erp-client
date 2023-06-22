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

import { IQuestionBase, NewQuestionBase } from './question-base.model';

export const sampleWithRequiredData: IQuestionBase = {
  id: 10095,
  context: 'Account backing online',
  serial: '678c6c8f-0641-487c-854e-66e1cf533753',
  questionBaseKey: 'turquoise connecting Account',
  questionBaseLabel: 'PCI Plaza Borders',
  order: 19029,
  controlType: ControlTypes['DATE'],
};

export const sampleWithPartialData: IQuestionBase = {
  id: 11742,
  context: 'synthesize',
  serial: '5b25896e-7689-4065-ba37-a5d190132fdf',
  questionBaseValue: 'payment',
  questionBaseKey: 'Omani',
  questionBaseLabel: 'visualize',
  required: false,
  order: 36589,
  controlType: ControlTypes['PASSWORD'],
  iterable: false,
};

export const sampleWithFullData: IQuestionBase = {
  id: 8205,
  context: 'Bike local',
  serial: 'a3103ea6-a2d3-48df-8d76-b98f516e41b8',
  questionBaseValue: 'Riel',
  questionBaseKey: 'Pizza Future relationships',
  questionBaseLabel: 'deposit empower Rubber',
  required: false,
  order: 26393,
  controlType: ControlTypes['WEEK'],
  placeholder: 'Venezuela Tuna transmit',
  iterable: false,
};

export const sampleWithNewData: NewQuestionBase = {
  context: 'monitoring withdrawal Nakfa',
  serial: '958f1a12-5b94-47da-a1e2-78f833f155ef',
  questionBaseKey: 'e-commerce Customer',
  questionBaseLabel: 'Beauty Tenge',
  order: 12739,
  controlType: ControlTypes['TEL'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
