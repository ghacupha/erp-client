import { IIsoCountryCode, NewIsoCountryCode } from './iso-country-code.model';

export const sampleWithRequiredData: IIsoCountryCode = {
  id: 18877,
};

export const sampleWithPartialData: IIsoCountryCode = {
  id: 52383,
  countryDescription: 'models XSS Haiti',
};

export const sampleWithFullData: IIsoCountryCode = {
  id: 41681,
  countryCode: 'CI',
  countryDescription: 'Cayman',
};

export const sampleWithNewData: NewIsoCountryCode = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
