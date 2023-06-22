import { IPaymentCalculation, NewPaymentCalculation } from './payment-calculation.model';

export const sampleWithRequiredData: IPaymentCalculation = {
  id: 23847,
};

export const sampleWithPartialData: IPaymentCalculation = {
  id: 25461,
  paymentExpense: 10017,
  withholdingTax: 50364,
  paymentAmount: 65957,
  fileUploadToken: 'input Guyana black',
};

export const sampleWithFullData: IPaymentCalculation = {
  id: 90597,
  paymentExpense: 47164,
  withholdingVAT: 32479,
  withholdingTax: 54608,
  paymentAmount: 81169,
  fileUploadToken: 'Keyboard Peso port',
  compilationToken: 'virtual brand Outdoors',
};

export const sampleWithNewData: NewPaymentCalculation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
