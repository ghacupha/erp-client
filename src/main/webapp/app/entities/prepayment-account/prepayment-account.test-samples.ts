import { IPrepaymentAccount, NewPrepaymentAccount } from './prepayment-account.model';

export const sampleWithRequiredData: IPrepaymentAccount = {
  id: 7037,
  catalogueNumber: 'invoice National deposit',
  particulars: 'utilize RSS',
};

export const sampleWithPartialData: IPrepaymentAccount = {
  id: 60801,
  catalogueNumber: 'bandwidth-monitored Gorgeous Operations',
  particulars: 'input',
  notes: '../fake-data/blob/hipster.txt',
  prepaymentAmount: 17244,
  prepaymentGuid: 'a64c7958-e243-4501-9b55-14de9e334127',
};

export const sampleWithFullData: IPrepaymentAccount = {
  id: 67140,
  catalogueNumber: 'SAS lime',
  particulars: 'Savings solutions state',
  notes: '../fake-data/blob/hipster.txt',
  prepaymentAmount: 61626,
  prepaymentGuid: '7c7f39dd-c16f-4da7-b29c-024ee15867cf',
};

export const sampleWithNewData: NewPrepaymentAccount = {
  catalogueNumber: 'Chair Dynamic transmitting',
  particulars: 'Card',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
