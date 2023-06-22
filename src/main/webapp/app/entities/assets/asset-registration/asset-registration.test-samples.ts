import { IAssetRegistration, NewAssetRegistration } from './asset-registration.model';

export const sampleWithRequiredData: IAssetRegistration = {
  id: 8222,
  assetNumber: 'withdrawal',
  assetTag: 'program',
  assetCost: 67894,
};

export const sampleWithPartialData: IAssetRegistration = {
  id: 85546,
  assetNumber: 'Mandatory SDD',
  assetTag: 'Cambridgeshire Granite Loan',
  assetDetails: 'Gorgeous conglomeration gold',
  assetCost: 58024,
  modelNumber: 'paradigm deposit',
  serialNumber: 'Managed Persistent',
};

export const sampleWithFullData: IAssetRegistration = {
  id: 12861,
  assetNumber: 'Concrete',
  assetTag: 'brand deposit Identity',
  assetDetails: 'foreground',
  assetCost: 23071,
  comments: '../fake-data/blob/hipster.png',
  commentsContentType: 'unknown',
  modelNumber: 'California Health',
  serialNumber: 'Liaison',
};

export const sampleWithNewData: NewAssetRegistration = {
  assetNumber: 'Granite',
  assetTag: 'Concrete whiteboard Movies',
  assetCost: 29546,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
