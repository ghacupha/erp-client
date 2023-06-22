import dayjs from 'dayjs/esm';

import { IBusinessStamp, NewBusinessStamp } from './business-stamp.model';

export const sampleWithRequiredData: IBusinessStamp = {
  id: 79999,
};

export const sampleWithPartialData: IBusinessStamp = {
  id: 50486,
  purpose: 'protocol',
};

export const sampleWithFullData: IBusinessStamp = {
  id: 95249,
  stampDate: dayjs('2022-03-02'),
  purpose: 'indexing parse',
  details: 'Unbranded Dollar',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewBusinessStamp = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
