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

import { IProcessStatus, NewProcessStatus } from './process-status.model';

export const sampleWithRequiredData: IProcessStatus = {
  id: 46656,
  statusCode: 'Auto',
  description: 'bleeding-edge virtual Identity',
};

export const sampleWithPartialData: IProcessStatus = {
  id: 52264,
  statusCode: 'EXE TCP',
  description: 'digital',
};

export const sampleWithFullData: IProcessStatus = {
  id: 26079,
  statusCode: 'programming',
  description: 'Light interface moratorium',
};

export const sampleWithNewData: NewProcessStatus = {
  statusCode: 'Armenia generation Switzerland',
  description: 'Berkshire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
