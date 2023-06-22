import { DepreciationTypes } from 'app/entities/enumerations/depreciation-types.model';

import { IDepreciationMethod, NewDepreciationMethod } from './depreciation-method.model';

export const sampleWithRequiredData: IDepreciationMethod = {
  id: 49775,
  depreciationMethodName: 'withdrawal Alley',
  depreciationType: DepreciationTypes['STRAIGHT_LINE'],
};

export const sampleWithPartialData: IDepreciationMethod = {
  id: 73349,
  depreciationMethodName: 'Chair',
  description: 'compress Granite embrace',
  depreciationType: DepreciationTypes['DECLINING_BALANCE'],
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IDepreciationMethod = {
  id: 85292,
  depreciationMethodName: 'Illinois',
  description: 'generate',
  depreciationType: DepreciationTypes[undefined],
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewDepreciationMethod = {
  depreciationMethodName: 'International engage',
  depreciationType: DepreciationTypes[undefined],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
