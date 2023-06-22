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

import { taxReferenceTypes } from 'app/entities/enumerations/tax-reference-types.model';

import { ITaxReference, NewTaxReference } from './tax-reference.model';

export const sampleWithRequiredData: ITaxReference = {
  id: 40508,
  taxPercentage: 53870,
  taxReferenceType: taxReferenceTypes['CATERING_LEVY'],
};

export const sampleWithPartialData: ITaxReference = {
  id: 12784,
  taxName: 'Credit',
  taxPercentage: 20323,
  taxReferenceType: taxReferenceTypes['WITHHOLDING_TAX_ON_RENT'],
  fileUploadToken: 'Producer Hat Tools',
};

export const sampleWithFullData: ITaxReference = {
  id: 60265,
  taxName: 'Kansas Kids Shirt',
  taxDescription: 'capacitor ROI Movies',
  taxPercentage: 20180,
  taxReferenceType: taxReferenceTypes['WITHHOLDING_VAT'],
  fileUploadToken: 'Brand Advanced',
  compilationToken: 'Avon Soft',
};

export const sampleWithNewData: NewTaxReference = {
  taxPercentage: 23450,
  taxReferenceType: taxReferenceTypes['VALUE_ADDED_TAX'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
