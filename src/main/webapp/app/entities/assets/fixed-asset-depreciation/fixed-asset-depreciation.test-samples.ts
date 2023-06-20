import dayjs from 'dayjs/esm';

import { DepreciationRegime } from 'app/entities/enumerations/depreciation-regime.model';

import { IFixedAssetDepreciation, NewFixedAssetDepreciation } from './fixed-asset-depreciation.model';

export const sampleWithRequiredData: IFixedAssetDepreciation = {
  id: 16184,
};

export const sampleWithPartialData: IFixedAssetDepreciation = {
  id: 31785,
  assetNumber: 7195,
  assetDescription: 'PCI Frozen Account',
  assetCategory: 'Assistant deposit Director',
  depreciationAmount: 18200,
  fileUploadToken: 'static scalable solid',
};

export const sampleWithFullData: IFixedAssetDepreciation = {
  id: 2079,
  assetNumber: 2553,
  serviceOutletCode: 'JBOD Reverse-engineered interfaces',
  assetTag: 'Switchable',
  assetDescription: 'Granite',
  depreciationDate: dayjs('2021-03-22'),
  assetCategory: 'Drive',
  depreciationAmount: 33521,
  depreciationRegime: DepreciationRegime['STRAIGHT_LINE_BASIS'],
  fileUploadToken: 'system Texas',
  compilationToken: 'array Factors Ngultrum',
};

export const sampleWithNewData: NewFixedAssetDepreciation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
