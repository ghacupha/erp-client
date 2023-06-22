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

import { IWorkProjectRegister, NewWorkProjectRegister } from './work-project-register.model';

export const sampleWithRequiredData: IWorkProjectRegister = {
  id: 10374,
  catalogueNumber: 'communities Pizza Steel',
  description: 'access',
};

export const sampleWithPartialData: IWorkProjectRegister = {
  id: 6422,
  catalogueNumber: 'Mexico Rhode Monitored',
  description: 'action-items olive',
};

export const sampleWithFullData: IWorkProjectRegister = {
  id: 12330,
  catalogueNumber: 'backing Refined',
  description: 'encompassing Outdoors',
  details: '../fake-data/blob/hipster.png',
  detailsContentType: 'unknown',
  totalProjectCost: 61091,
  additionalNotes: '../fake-data/blob/hipster.png',
  additionalNotesContentType: 'unknown',
};

export const sampleWithNewData: NewWorkProjectRegister = {
  catalogueNumber: 'Avon Light',
  description: 'action-items Franc',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
