import { IWorkProjectRegister, NewWorkProjectRegister } from './work-project-register.model';

export const sampleWithRequiredData: IWorkProjectRegister = {
  id: 10374,
  catalogueNumber: 'communities Pizza Steel',
  description: 'access',
};

export const sampleWithPartialData: IWorkProjectRegister = {
  id: 6422,
  catalogueNumber: 'Mexico Rhode Monitored',
  description: 'action-items olive',
};

export const sampleWithFullData: IWorkProjectRegister = {
  id: 12330,
  catalogueNumber: 'backing Refined',
  description: 'encompassing Outdoors',
  details: '../fake-data/blob/hipster.png',
  detailsContentType: 'unknown',
  totalProjectCost: 61091,
  additionalNotes: '../fake-data/blob/hipster.png',
  additionalNotesContentType: 'unknown',
};

export const sampleWithNewData: NewWorkProjectRegister = {
  catalogueNumber: 'Avon Light',
  description: 'action-items Franc',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
