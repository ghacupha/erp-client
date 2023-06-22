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

import { recurrenceFrequency } from 'app/entities/enumerations/recurrence-frequency.model';

import { IAmortizationRecurrence, NewAmortizationRecurrence } from './amortization-recurrence.model';

export const sampleWithRequiredData: IAmortizationRecurrence = {
  id: 73463,
  firstAmortizationDate: dayjs('2022-08-01'),
  amortizationFrequency: recurrenceFrequency['TRIMESTERS'],
  numberOfRecurrences: 86536,
  timeOfInstallation: dayjs('2022-08-02T07:00'),
  recurrenceGuid: '17f2e8e0-8882-464b-864d-1cc3f16de76d',
  prepaymentAccountGuid: '905b844a-d184-4b55-aaed-eb699a17f0a2',
};

export const sampleWithPartialData: IAmortizationRecurrence = {
  id: 74975,
  firstAmortizationDate: dayjs('2022-08-01'),
  amortizationFrequency: recurrenceFrequency['TRIMESTERS'],
  numberOfRecurrences: 88997,
  notes: '../fake-data/blob/hipster.png',
  notesContentType: 'unknown',
  isActive: false,
  isOverWritten: true,
  timeOfInstallation: dayjs('2022-08-01T09:29'),
  recurrenceGuid: 'b0ef88c9-eed3-4775-b373-5d81e3eccbdc',
  prepaymentAccountGuid: '62f846a1-771e-4080-8691-bf7780f6c081',
};

export const sampleWithFullData: IAmortizationRecurrence = {
  id: 53879,
  firstAmortizationDate: dayjs('2022-08-01'),
  amortizationFrequency: recurrenceFrequency['QUARTERLY'],
  numberOfRecurrences: 48797,
  notes: '../fake-data/blob/hipster.png',
  notesContentType: 'unknown',
  particulars: 'turquoise',
  isActive: true,
  isOverWritten: true,
  timeOfInstallation: dayjs('2022-08-01T17:54'),
  recurrenceGuid: '6b29b8cb-8d22-4429-99e9-8731587fd771',
  prepaymentAccountGuid: '93d69e79-241e-429a-b2bc-56ef0528ef4c',
};

export const sampleWithNewData: NewAmortizationRecurrence = {
  firstAmortizationDate: dayjs('2022-08-01'),
  amortizationFrequency: recurrenceFrequency['BIANNUAL'],
  numberOfRecurrences: 56376,
  timeOfInstallation: dayjs('2022-08-02T02:01'),
  recurrenceGuid: 'ba0403e0-b531-4f8d-ab86-9e29860a7cf6',
  prepaymentAccountGuid: 'dafaf7c7-49e3-41f4-86ff-7b02d694d89e',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
