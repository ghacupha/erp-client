import { IBankBranchCode, NewBankBranchCode } from './bank-branch-code.model';

export const sampleWithRequiredData: IBankBranchCode = {
  id: 68336,
  bankName: 'Function-based International',
};

export const sampleWithPartialData: IBankBranchCode = {
  id: 78527,
  bankCode: 'Chair',
  bankName: 'Ports Books',
  branchName: 'Division',
};

export const sampleWithFullData: IBankBranchCode = {
  id: 31539,
  bankCode: 'system heuristic',
  bankName: 'Personal',
  branchCode: 'Orchestrator Unbranded',
  branchName: 'Handmade Towels back',
  notes: 'Practical Latvia',
};

export const sampleWithNewData: NewBankBranchCode = {
  bankName: 'Branding',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
