import { ITaxRule, NewTaxRule } from './tax-rule.model';

export const sampleWithRequiredData: ITaxRule = {
  id: 25321,
};

export const sampleWithPartialData: ITaxRule = {
  id: 61136,
  telcoExciseDuty: 21396,
  valueAddedTax: 88221,
  withholdingVAT: 63139,
  withholdingTaxConsultancy: 92919,
  withholdingTaxImportedService: 76705,
  compilationToken: 'evolve',
};

export const sampleWithFullData: ITaxRule = {
  id: 26077,
  telcoExciseDuty: 31483,
  valueAddedTax: 98075,
  withholdingVAT: 38343,
  withholdingTaxConsultancy: 83432,
  withholdingTaxRent: 789,
  cateringLevy: 89213,
  serviceCharge: 18890,
  withholdingTaxImportedService: 45761,
  fileUploadToken: 'Savings',
  compilationToken: 'Texas',
};

export const sampleWithNewData: NewTaxRule = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
