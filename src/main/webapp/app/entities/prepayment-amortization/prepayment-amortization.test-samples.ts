import dayjs from 'dayjs/esm';

import { IPrepaymentAmortization, NewPrepaymentAmortization } from './prepayment-amortization.model';

export const sampleWithRequiredData: IPrepaymentAmortization = {
  id: 35317,
};

export const sampleWithPartialData: IPrepaymentAmortization = {
  id: 10743,
  description: 'calculate invoice Avon',
  prepaymentPeriod: dayjs('2022-05-03'),
  inactive: true,
};

export const sampleWithFullData: IPrepaymentAmortization = {
  id: 54271,
  description: 'Team-oriented',
  prepaymentPeriod: dayjs('2022-05-02'),
  prepaymentAmount: 17994,
  inactive: false,
};

export const sampleWithNewData: NewPrepaymentAmortization = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
