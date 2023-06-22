import { IPlaceholder, NewPlaceholder } from './placeholder.model';

export const sampleWithRequiredData: IPlaceholder = {
  id: 40261,
  description: 'enhance',
};

export const sampleWithPartialData: IPlaceholder = {
  id: 70142,
  description: 'Niger Fresh Electronics',
  fileUploadToken: 'Courts Indian',
  compilationToken: 'e-commerce Bridge',
};

export const sampleWithFullData: IPlaceholder = {
  id: 87211,
  description: 'Automotive',
  token: 'Specialist front-end Sports',
  fileUploadToken: 'Via',
  compilationToken: 'program',
};

export const sampleWithNewData: NewPlaceholder = {
  description: 'incubate database 3rd',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
