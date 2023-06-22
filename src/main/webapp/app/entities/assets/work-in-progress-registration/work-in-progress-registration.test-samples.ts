import { IWorkInProgressRegistration, NewWorkInProgressRegistration } from './work-in-progress-registration.model';

export const sampleWithRequiredData: IWorkInProgressRegistration = {
  id: 31334,
  sequenceNumber: 'Fresh Optimization Ireland',
};

export const sampleWithPartialData: IWorkInProgressRegistration = {
  id: 86772,
  sequenceNumber: 'state data-warehouse',
};

export const sampleWithFullData: IWorkInProgressRegistration = {
  id: 26448,
  sequenceNumber: 'regional Soap Lane',
  particulars: 'calculate Saint Communications',
  instalmentAmount: 90365,
  comments: '../fake-data/blob/hipster.png',
  commentsContentType: 'unknown',
};

export const sampleWithNewData: NewWorkInProgressRegistration = {
  sequenceNumber: 'Legacy and',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
