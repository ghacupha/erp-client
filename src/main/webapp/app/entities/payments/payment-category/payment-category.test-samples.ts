import { CategoryTypes } from 'app/entities/enumerations/category-types.model';

import { IPaymentCategory, NewPaymentCategory } from './payment-category.model';

export const sampleWithRequiredData: IPaymentCategory = {
  id: 41443,
  categoryName: 'local Islands,',
  categoryType: CategoryTypes['CATEGORY1'],
};

export const sampleWithPartialData: IPaymentCategory = {
  id: 39582,
  categoryName: 'Minnesota Savings',
  categoryDescription: 'object-oriented',
  categoryType: CategoryTypes['CATEGORY7'],
  fileUploadToken: 'Fresh',
};

export const sampleWithFullData: IPaymentCategory = {
  id: 61387,
  categoryName: 'copy didactic',
  categoryDescription: 'PNG',
  categoryType: CategoryTypes['CATEGORY6'],
  fileUploadToken: 'static Intranet Bahamas',
  compilationToken: 'Keyboard Robust backing',
};

export const sampleWithNewData: NewPaymentCategory = {
  categoryName: 'Infrastructure',
  categoryType: CategoryTypes['CATEGORY8'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
