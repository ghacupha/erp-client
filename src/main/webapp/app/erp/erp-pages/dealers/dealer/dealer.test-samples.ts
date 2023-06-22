import { IDealer, NewDealer } from './dealer.model';

export const sampleWithRequiredData: IDealer = {
  id: 47955,
  dealerName: 'Movies Montana Bedfordshire',
};

export const sampleWithPartialData: IDealer = {
  id: 8421,
  dealerName: 'Solomon SAS',
  department: 'Michigan Sports Saudi',
  postalAddress: 'Intelligent Bridge',
  otherNames: 'Kenyan',
};

export const sampleWithFullData: IDealer = {
  id: 64497,
  dealerName: 'killer Mountains Personal',
  taxNumber: 'recontextualize Frozen',
  identificationDocumentNumber: 'Dynamic Producer deposit',
  organizationName: 'AI Club haptic',
  department: 'Borders',
  position: 'reboot capacitor Clothing',
  postalAddress: 'SDD',
  physicalAddress: 'withdrawal Outdoors interfaces',
  accountName: 'Home Loan Account',
  accountNumber: 'Burundi Table Gloves',
  bankersName: 'programming wireless',
  bankersBranch: 'Nebraska Wyoming',
  bankersSwiftCode: 'Lek Flat',
  fileUploadToken: 'engineer Checking',
  compilationToken: 'Granite Moldovan',
  remarks: '../fake-data/blob/hipster.txt',
  otherNames: 'Polarised vertical District',
};

export const sampleWithNewData: NewDealer = {
  dealerName: 'Forward',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
