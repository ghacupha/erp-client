import { IPrepaymentMapping, NewPrepaymentMapping } from './prepayment-mapping.model';

export const sampleWithRequiredData: IPrepaymentMapping = {
  id: 70775,
  parameterKey: 'teal Regional',
  parameterGuid: 'a6e02fa1-0ef7-4823-9f69-7aff134587db',
  parameter: 'hacking',
};

export const sampleWithPartialData: IPrepaymentMapping = {
  id: 24030,
  parameterKey: 'User-centric',
  parameterGuid: '0d8bc949-8bf5-4497-b859-50ed28a6fe6c',
  parameter: 'hack',
};

export const sampleWithFullData: IPrepaymentMapping = {
  id: 11074,
  parameterKey: 'circuit',
  parameterGuid: '1f9eda12-737c-47bc-9419-04fdb2176b6f',
  parameter: 'matrix Global',
};

export const sampleWithNewData: NewPrepaymentMapping = {
  parameterKey: 'Stream optical Licensed',
  parameterGuid: 'c7378f77-88ab-41a7-88cd-49cdea6bb749',
  parameter: 'Ridges Multi-channelled Forward',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
