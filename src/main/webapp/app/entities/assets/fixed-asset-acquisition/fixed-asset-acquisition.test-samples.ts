import dayjs from 'dayjs/esm';

import { IFixedAssetAcquisition, NewFixedAssetAcquisition } from './fixed-asset-acquisition.model';

export const sampleWithRequiredData: IFixedAssetAcquisition = {
  id: 10000,
};

export const sampleWithPartialData: IFixedAssetAcquisition = {
  id: 64844,
  assetTag: 'Fresh Implementation transparent',
  assetDescription: 'impactful facilitate Forward',
  assetCategory: 'Legacy',
  fileUploadToken: 'invoice',
};

export const sampleWithFullData: IFixedAssetAcquisition = {
  id: 41578,
  assetNumber: 91262,
  serviceOutletCode: 'program Licensed',
  assetTag: 'Checking Intuitive',
  assetDescription: 'cross-platform reinvent',
  purchaseDate: dayjs('2021-03-22'),
  assetCategory: 'content-based',
  purchasePrice: 64767,
  fileUploadToken: 'Avon',
};

export const sampleWithNewData: NewFixedAssetAcquisition = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
