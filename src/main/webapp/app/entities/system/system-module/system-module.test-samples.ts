import { ISystemModule, NewSystemModule } from './system-module.model';

export const sampleWithRequiredData: ISystemModule = {
  id: 17342,
  moduleName: 'intuitive Open-source',
};

export const sampleWithPartialData: ISystemModule = {
  id: 36545,
  moduleName: 'expedite',
};

export const sampleWithFullData: ISystemModule = {
  id: 90075,
  moduleName: 'killer Cotton Corporate',
};

export const sampleWithNewData: NewSystemModule = {
  moduleName: 'Corporate payment',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
