import { ISecurityClearance, NewSecurityClearance } from './security-clearance.model';

export const sampleWithRequiredData: ISecurityClearance = {
  id: 71292,
  clearanceLevel: 'models',
};

export const sampleWithPartialData: ISecurityClearance = {
  id: 74253,
  clearanceLevel: 'content UAE copy',
};

export const sampleWithFullData: ISecurityClearance = {
  id: 10709,
  clearanceLevel: 'Central',
};

export const sampleWithNewData: NewSecurityClearance = {
  clearanceLevel: 'CFP',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
