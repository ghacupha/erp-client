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

import { ICreditNote, NewCreditNote } from './credit-note.model';

export const sampleWithRequiredData: ICreditNote = {
  id: 23983,
  creditNumber: 'Table Polarised Flat',
  creditNoteDate: dayjs('2022-03-20'),
  creditAmount: 13575,
};

export const sampleWithPartialData: ICreditNote = {
  id: 5554,
  creditNumber: 'algorithm Wyoming',
  creditNoteDate: dayjs('2022-03-20'),
  creditAmount: 14931,
};

export const sampleWithFullData: ICreditNote = {
  id: 40775,
  creditNumber: 'Mobility transmit Synergistic',
  creditNoteDate: dayjs('2022-03-20'),
  creditAmount: 31876,
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCreditNote = {
  creditNumber: 'Table portal',
  creditNoteDate: dayjs('2022-03-20'),
  creditAmount: 99881,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
