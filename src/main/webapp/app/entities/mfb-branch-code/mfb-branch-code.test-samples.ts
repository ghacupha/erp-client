import { IMfbBranchCode, NewMfbBranchCode } from './mfb-branch-code.model';

export const sampleWithRequiredData: IMfbBranchCode = {
  id: 3861,
};

export const sampleWithPartialData: IMfbBranchCode = {
  id: 93133,
  bankName: 'Colorado Dobra',
  branchCode: 'Account Kenya',
};

export const sampleWithFullData: IMfbBranchCode = {
  id: 65684,
  bankCode: 'Granite',
  bankName: 'Factors withdrawal',
  branchCode: 'Organized platforms rich',
  branchName: 'Frozen',
};

export const sampleWithNewData: NewMfbBranchCode = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
