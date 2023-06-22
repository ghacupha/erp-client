import { BranchStatusType } from 'app/entities/enumerations/branch-status-type.model';

import { IOutletStatus, NewOutletStatus } from './outlet-status.model';

export const sampleWithRequiredData: IOutletStatus = {
  id: 70322,
  branchStatusTypeCode: 'Up-sized Stand-alone',
  branchStatusType: BranchStatusType['ACTIVE'],
};

export const sampleWithPartialData: IOutletStatus = {
  id: 4116,
  branchStatusTypeCode: 'navigate',
  branchStatusType: BranchStatusType['CLOSED'],
  branchStatusTypeDescription: 'deposit',
};

export const sampleWithFullData: IOutletStatus = {
  id: 91113,
  branchStatusTypeCode: 'Home bricks-and-clicks',
  branchStatusType: BranchStatusType['INACTIVE'],
  branchStatusTypeDescription: 'internet',
};

export const sampleWithNewData: NewOutletStatus = {
  branchStatusTypeCode: 'eyeballs partnerships bluetooth',
  branchStatusType: BranchStatusType[undefined],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
