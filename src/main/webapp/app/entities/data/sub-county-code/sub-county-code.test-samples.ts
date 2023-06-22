import { ISubCountyCode, NewSubCountyCode } from './sub-county-code.model';

export const sampleWithRequiredData: ISubCountyCode = {
  id: 87943,
};

export const sampleWithPartialData: ISubCountyCode = {
  id: 35885,
  countyName: 'hacking turquoise',
  subCountyCode: 'Security rich',
};

export const sampleWithFullData: ISubCountyCode = {
  id: 75600,
  countyCode: 'hacking',
  countyName: 'program Turnpike Shores',
  subCountyCode: 'Response pink',
  subCountyName: 'Buckinghamshire parse backing',
};

export const sampleWithNewData: NewSubCountyCode = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
