import { IAssetAccessory, NewAssetAccessory } from './asset-accessory.model';

export const sampleWithRequiredData: IAssetAccessory = {
  id: 88388,
};

export const sampleWithPartialData: IAssetAccessory = {
  id: 23537,
  assetTag: 'discrete Steel Practical',
  modelNumber: 'Chips',
  serialNumber: 'Avon bypass',
};

export const sampleWithFullData: IAssetAccessory = {
  id: 50076,
  assetTag: 'withdrawal SMS override',
  assetDetails: 'AGP program Customer',
  comments: '../fake-data/blob/hipster.png',
  commentsContentType: 'unknown',
  modelNumber: 'calculating',
  serialNumber: 'payment',
};

export const sampleWithNewData: NewAssetAccessory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
