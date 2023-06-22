import { IPaymentLabel, NewPaymentLabel } from './payment-label.model';

export const sampleWithRequiredData: IPaymentLabel = {
  id: 18298,
  description: 'Future Plastic',
};

export const sampleWithPartialData: IPaymentLabel = {
  id: 98927,
  description: 'Bedfordshire',
  comments: 'web-enabled',
  fileUploadToken: 'digital orchestrate Manat',
};

export const sampleWithFullData: IPaymentLabel = {
  id: 1429,
  description: 'tangible',
  comments: 'Freeway',
  fileUploadToken: 'Research Savings',
  compilationToken: 'Ball iterate',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewPaymentLabel = {
  description: 'Specialist Granite',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
