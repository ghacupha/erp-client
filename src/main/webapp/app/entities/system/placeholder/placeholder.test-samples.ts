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

import { IPlaceholder, NewPlaceholder } from './placeholder.model';

export const sampleWithRequiredData: IPlaceholder = {
  id: 40261,
  description: 'enhance',
};

export const sampleWithPartialData: IPlaceholder = {
  id: 70142,
  description: 'Niger Fresh Electronics',
  fileUploadToken: 'Courts Indian',
  compilationToken: 'e-commerce Bridge',
};

export const sampleWithFullData: IPlaceholder = {
  id: 87211,
  description: 'Automotive',
  token: 'Specialist front-end Sports',
  fileUploadToken: 'Via',
  compilationToken: 'program',
};

export const sampleWithNewData: NewPlaceholder = {
  description: 'incubate database 3rd',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
