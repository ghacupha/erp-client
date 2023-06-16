import { taxReferenceTypes } from 'app/entities/enumerations/tax-reference-types.model';

import { ITaxReference, NewTaxReference } from './tax-reference.model';

export const sampleWithRequiredData: ITaxReference = {
  id: 40508,
  taxPercentage: 53870,
  taxReferenceType: taxReferenceTypes['CATERING_LEVY'],
};

export const sampleWithPartialData: ITaxReference = {
  id: 12784,
  taxName: 'Credit',
  taxPercentage: 20323,
  taxReferenceType: taxReferenceTypes['WITHHOLDING_TAX_ON_RENT'],
  fileUploadToken: 'Producer Hat Tools',
};

export const sampleWithFullData: ITaxReference = {
  id: 60265,
  taxName: 'Kansas Kids Shirt',
  taxDescription: 'capacitor ROI Movies',
  taxPercentage: 20180,
  taxReferenceType: taxReferenceTypes['WITHHOLDING_VAT'],
  fileUploadToken: 'Brand Advanced',
  compilationToken: 'Avon Soft',
};

export const sampleWithNewData: NewTaxReference = {
  taxPercentage: 23450,
  taxReferenceType: taxReferenceTypes['VALUE_ADDED_TAX'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
