import dayjs from 'dayjs/esm';

import { IAssetWarranty, NewAssetWarranty } from './asset-warranty.model';

export const sampleWithRequiredData: IAssetWarranty = {
  id: 19997,
};

export const sampleWithPartialData: IAssetWarranty = {
  id: 28054,
  description: 'Wooden Lek',
  expiryDate: dayjs('2023-05-04'),
};

export const sampleWithFullData: IAssetWarranty = {
  id: 50258,
  assetTag: 'New Sports',
  description: 'SDD',
  modelNumber: 'Villages',
  serialNumber: 'Executive',
  expiryDate: dayjs('2023-05-05'),
};

export const sampleWithNewData: NewAssetWarranty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
