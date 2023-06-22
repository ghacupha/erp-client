import { IProcessStatus, NewProcessStatus } from './process-status.model';

export const sampleWithRequiredData: IProcessStatus = {
  id: 46656,
  statusCode: 'Auto',
  description: 'bleeding-edge virtual Identity',
};

export const sampleWithPartialData: IProcessStatus = {
  id: 52264,
  statusCode: 'EXE TCP',
  description: 'digital',
};

export const sampleWithFullData: IProcessStatus = {
  id: 26079,
  statusCode: 'programming',
  description: 'Light interface moratorium',
};

export const sampleWithNewData: NewProcessStatus = {
  statusCode: 'Armenia generation Switzerland',
  description: 'Berkshire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
