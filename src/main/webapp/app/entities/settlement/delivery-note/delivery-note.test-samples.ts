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

import { IDeliveryNote, NewDeliveryNote } from './delivery-note.model';

export const sampleWithRequiredData: IDeliveryNote = {
  id: 68396,
  deliveryNoteNumber: 'Orchestrator panel',
  documentDate: dayjs('2022-03-01'),
};

export const sampleWithPartialData: IDeliveryNote = {
  id: 60803,
  deliveryNoteNumber: 'Rubber',
  documentDate: dayjs('2022-03-01'),
  description: 'Re-engineered',
  quantity: 49327,
};

export const sampleWithFullData: IDeliveryNote = {
  id: 91194,
  deliveryNoteNumber: 'mesh Avon',
  documentDate: dayjs('2022-03-02'),
  description: 'User-friendly Car',
  serialNumber: 'invoice relationships Interactions',
  quantity: 7785,
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewDeliveryNote = {
  deliveryNoteNumber: 'online Steel',
  documentDate: dayjs('2022-03-02'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
