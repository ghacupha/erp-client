import dayjs from 'dayjs/esm';

import { DepreciationRegime } from 'app/entities/enumerations/depreciation-regime.model';

import { IFixedAssetNetBookValue, NewFixedAssetNetBookValue } from './fixed-asset-net-book-value.model';

export const sampleWithRequiredData: IFixedAssetNetBookValue = {
  id: 66139,
};

export const sampleWithPartialData: IFixedAssetNetBookValue = {
  id: 43785,
  serviceOutletCode: 'solution-oriented compressing Connecticut',
  assetDescription: 'purple',
  assetCategory: 'projection Computers Computer',
  netBookValue: 75708,
  fileUploadToken: 'Table 1080p Loan',
};

export const sampleWithFullData: IFixedAssetNetBookValue = {
  id: 61656,
  assetNumber: 68452,
  serviceOutletCode: 'withdrawal deposit',
  assetTag: 'teal Concrete Implementation',
  assetDescription: 'demand-driven Bike Car',
  netBookValueDate: dayjs('2021-03-23'),
  assetCategory: 'Island',
  netBookValue: 90039,
  depreciationRegime: DepreciationRegime['STRAIGHT_LINE_BASIS'],
  fileUploadToken: 'virtual',
  compilationToken: 'reboot Architect real-time',
};

export const sampleWithNewData: NewFixedAssetNetBookValue = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
