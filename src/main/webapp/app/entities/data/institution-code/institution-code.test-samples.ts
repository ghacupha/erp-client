import { IInstitutionCode, NewInstitutionCode } from './institution-code.model';

export const sampleWithRequiredData: IInstitutionCode = {
  id: 9008,
  institutionCode: 'cultivate',
  institutionName: 'payment',
};

export const sampleWithPartialData: IInstitutionCode = {
  id: 40210,
  institutionCode: 'Kip',
  institutionName: 'implementation',
  shortName: 'solution',
  institutionCategory: 'facilitate Grocery Gloves',
};

export const sampleWithFullData: IInstitutionCode = {
  id: 1700,
  institutionCode: 'Representative',
  institutionName: 'Music',
  shortName: 'open-source Infrastructure',
  category: 'support payment end-to-end',
  institutionCategory: 'deposit Fantastic',
};

export const sampleWithNewData: NewInstitutionCode = {
  institutionCode: 'virtual Vista',
  institutionName: 'Executive PNG',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
