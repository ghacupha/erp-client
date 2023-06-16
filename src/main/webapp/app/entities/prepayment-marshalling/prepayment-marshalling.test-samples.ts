import dayjs from 'dayjs/esm';

import { IPrepaymentMarshalling, NewPrepaymentMarshalling } from './prepayment-marshalling.model';

export const sampleWithRequiredData: IPrepaymentMarshalling = {
  id: 61099,
  inactive: false,
};

export const sampleWithPartialData: IPrepaymentMarshalling = {
  id: 34664,
  inactive: false,
};

export const sampleWithFullData: IPrepaymentMarshalling = {
  id: 98756,
  inactive: false,
  amortizationCommencementDate: dayjs('2022-05-03'),
  amortizationPeriods: 26016,
};

export const sampleWithNewData: NewPrepaymentMarshalling = {
  inactive: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
