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
