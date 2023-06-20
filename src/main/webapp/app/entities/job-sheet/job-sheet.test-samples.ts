import dayjs from 'dayjs/esm';

import { IJobSheet, NewJobSheet } from './job-sheet.model';

export const sampleWithRequiredData: IJobSheet = {
  id: 45034,
  serialNumber: 'Industrial Factors cohesive',
};

export const sampleWithPartialData: IJobSheet = {
  id: 75236,
  serialNumber: 'Roads',
  details: 'interface frictionless PNG',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IJobSheet = {
  id: 40064,
  serialNumber: 'Face',
  jobSheetDate: dayjs('2022-03-20'),
  details: 'product',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewJobSheet = {
  serialNumber: 'Money unleash copy',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
