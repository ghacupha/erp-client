import { IAlgorithm, NewAlgorithm } from './algorithm.model';

export const sampleWithRequiredData: IAlgorithm = {
  id: 52310,
  name: 'Account',
};

export const sampleWithPartialData: IAlgorithm = {
  id: 4978,
  name: 'Keyboard Plastic',
};

export const sampleWithFullData: IAlgorithm = {
  id: 91064,
  name: 'Dakota District copying',
};

export const sampleWithNewData: NewAlgorithm = {
  name: 'reboot',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
