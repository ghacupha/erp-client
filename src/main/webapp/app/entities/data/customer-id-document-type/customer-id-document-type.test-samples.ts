import { ICustomerIDDocumentType, NewCustomerIDDocumentType } from './customer-id-document-type.model';

export const sampleWithRequiredData: ICustomerIDDocumentType = {
  id: 96315,
  documentCode: 'Palau quantifying',
  documentType: 'Sports Ergonomic payment',
};

export const sampleWithPartialData: ICustomerIDDocumentType = {
  id: 27673,
  documentCode: 'engage neural',
  documentType: 'enable',
};

export const sampleWithFullData: ICustomerIDDocumentType = {
  id: 94525,
  documentCode: 'Integrated copy array',
  documentType: 'Games',
  documentTypeDescription: 'out-of-the-box',
};

export const sampleWithNewData: NewCustomerIDDocumentType = {
  documentCode: 'Functionality Incredible',
  documentType: 'drive Future',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
