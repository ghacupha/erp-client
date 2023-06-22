import { IOutletType, NewOutletType } from './outlet-type.model';

export const sampleWithRequiredData: IOutletType = {
  id: 11596,
  outletTypeCode: 'Interactions',
  outletType: 'Way Clothing red',
};

export const sampleWithPartialData: IOutletType = {
  id: 16089,
  outletTypeCode: 'Arkansas index',
  outletType: 'program Bike SMTP',
  outletTypeDetails: 'Officer Ville',
};

export const sampleWithFullData: IOutletType = {
  id: 83166,
  outletTypeCode: 'Fantastic platforms',
  outletType: 'Cloned encompassing',
  outletTypeDetails: 'Savings Buckinghamshire program',
};

export const sampleWithNewData: NewOutletType = {
  outletTypeCode: 'Producer',
  outletType: 'Account parsing convergence',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
