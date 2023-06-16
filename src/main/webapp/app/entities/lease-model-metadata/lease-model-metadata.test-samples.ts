import dayjs from 'dayjs/esm';

import { ILeaseModelMetadata, NewLeaseModelMetadata } from './lease-model-metadata.model';

export const sampleWithRequiredData: ILeaseModelMetadata = {
  id: 42129,
  modelTitle: 'Associate',
  modelVersion: 48195,
  annualDiscountingRate: 66613,
  commencementDate: dayjs('2023-03-28'),
  terminalDate: dayjs('2023-03-28'),
};

export const sampleWithPartialData: ILeaseModelMetadata = {
  id: 45468,
  modelTitle: 'payment Berkshire',
  modelVersion: 62103,
  description: 'fuchsia Automotive Parks',
  annualDiscountingRate: 6482,
  commencementDate: dayjs('2023-03-28'),
  terminalDate: dayjs('2023-03-28'),
  totalReportingPeriods: 11989,
  reportingPeriodsPerYear: 610,
  settlementPeriodsPerYear: 25970,
  totalDepreciationPeriods: 45377,
};

export const sampleWithFullData: ILeaseModelMetadata = {
  id: 52448,
  modelTitle: 'logistical SAS',
  modelVersion: 48962,
  description: 'Applications Orchestrator EXE',
  modelNotes: '../fake-data/blob/hipster.png',
  modelNotesContentType: 'unknown',
  annualDiscountingRate: 88742,
  commencementDate: dayjs('2023-03-28'),
  terminalDate: dayjs('2023-03-27'),
  totalReportingPeriods: 68134,
  reportingPeriodsPerYear: 86159,
  settlementPeriodsPerYear: 52191,
  initialLiabilityAmount: 30691,
  initialROUAmount: 31129,
  totalDepreciationPeriods: 22891,
};

export const sampleWithNewData: NewLeaseModelMetadata = {
  modelTitle: 'Paradigm Ball',
  modelVersion: 84849,
  annualDiscountingRate: 70552,
  commencementDate: dayjs('2023-03-28'),
  terminalDate: dayjs('2023-03-28'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
