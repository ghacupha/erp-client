///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
