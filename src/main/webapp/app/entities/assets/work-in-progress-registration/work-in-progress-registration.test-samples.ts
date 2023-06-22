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

import { IWorkInProgressRegistration, NewWorkInProgressRegistration } from './work-in-progress-registration.model';

export const sampleWithRequiredData: IWorkInProgressRegistration = {
  id: 31334,
  sequenceNumber: 'Fresh Optimization Ireland',
};

export const sampleWithPartialData: IWorkInProgressRegistration = {
  id: 86772,
  sequenceNumber: 'state data-warehouse',
};

export const sampleWithFullData: IWorkInProgressRegistration = {
  id: 26448,
  sequenceNumber: 'regional Soap Lane',
  particulars: 'calculate Saint Communications',
  instalmentAmount: 90365,
  comments: '../fake-data/blob/hipster.png',
  commentsContentType: 'unknown',
};

export const sampleWithNewData: NewWorkInProgressRegistration = {
  sequenceNumber: 'Legacy and',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
