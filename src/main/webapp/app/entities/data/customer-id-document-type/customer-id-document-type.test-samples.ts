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

import { ICustomerIDDocumentType, NewCustomerIDDocumentType } from './customer-id-document-type.model';

export const sampleWithRequiredData: ICustomerIDDocumentType = {
  id: 96315,
  documentCode: 'Palau quantifying',
  documentType: 'Sports Ergonomic payment',
};

export const sampleWithPartialData: ICustomerIDDocumentType = {
  id: 27673,
  documentCode: 'engage neural',
  documentType: 'enable',
};

export const sampleWithFullData: ICustomerIDDocumentType = {
  id: 94525,
  documentCode: 'Integrated copy array',
  documentType: 'Games',
  documentTypeDescription: 'out-of-the-box',
};

export const sampleWithNewData: NewCustomerIDDocumentType = {
  documentCode: 'Functionality Incredible',
  documentType: 'drive Future',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
