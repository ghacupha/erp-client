import { IWorkInProgressTransfer, NewWorkInProgressTransfer } from './work-in-progress-transfer.model';

export const sampleWithRequiredData: IWorkInProgressTransfer = {
  id: 32715,
};

export const sampleWithPartialData: IWorkInProgressTransfer = {
  id: 56881,
  description: 'repurpose Steel',
};

export const sampleWithFullData: IWorkInProgressTransfer = {
  id: 78643,
  description: 'withdrawal',
  targetAssetNumber: 'Dynamic circuit empowering',
};

export const sampleWithNewData: NewWorkInProgressTransfer = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
