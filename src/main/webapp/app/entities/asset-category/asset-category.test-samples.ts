import { IAssetCategory, NewAssetCategory } from './asset-category.model';

export const sampleWithRequiredData: IAssetCategory = {
  id: 26614,
  assetCategoryName: 'Steel',
};

export const sampleWithPartialData: IAssetCategory = {
  id: 44141,
  assetCategoryName: 'Security Enterprise-wide',
  description: 'bottom-line Clothing',
  notes: 'Car Central online',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IAssetCategory = {
  id: 74037,
  assetCategoryName: 'Saint Dollar virtual',
  description: 'Consultant programming',
  notes: 'Nevada',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAssetCategory = {
  assetCategoryName: 'deposit generate Pants',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
