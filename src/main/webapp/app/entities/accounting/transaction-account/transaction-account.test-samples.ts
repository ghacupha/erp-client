import { ITransactionAccount, NewTransactionAccount } from './transaction-account.model';

export const sampleWithRequiredData: ITransactionAccount = {
  id: 71775,
  accountNumber: 'orchestrate Orchestrator',
  accountName: 'Home Loan Account',
};

export const sampleWithPartialData: ITransactionAccount = {
  id: 14795,
  accountNumber: 'back-end',
  accountName: 'Money Market Account',
};

export const sampleWithFullData: ITransactionAccount = {
  id: 86036,
  accountNumber: 'infrastructures Metrics Developer',
  accountName: 'Home Loan Account',
  notes: '../fake-data/blob/hipster.png',
  notesContentType: 'unknown',
};

export const sampleWithNewData: NewTransactionAccount = {
  accountNumber: 'bandwidth Pike deposit',
  accountName: 'Money Market Account',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
