import dayjs from 'dayjs/esm';

import { ISettlement, NewSettlement } from './settlement.model';

export const sampleWithRequiredData: ISettlement = {
  id: 70014,
};

export const sampleWithPartialData: ISettlement = {
  id: 53479,
  paymentDate: dayjs('2022-02-02'),
  calculationFile: '../fake-data/blob/hipster.png',
  calculationFileContentType: 'unknown',
};

export const sampleWithFullData: ISettlement = {
  id: 39615,
  paymentNumber: 'South',
  paymentDate: dayjs('2022-02-02'),
  paymentAmount: 7698,
  description: 'Sahara Plastic Outdoors',
  notes: 'Developer Small Salad',
  calculationFile: '../fake-data/blob/hipster.png',
  calculationFileContentType: 'unknown',
  fileUploadToken: 'Unbranded Incredible invoice',
  compilationToken: 'Money e-enable',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewSettlement = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
