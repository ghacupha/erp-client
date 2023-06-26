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

import { SystemContentTypeAvailability } from 'app/entities/enumerations/system-content-type-availability.model';

import { ISystemContentType, NewSystemContentType } from './system-content-type.model';

export const sampleWithRequiredData: ISystemContentType = {
  id: 75492,
  contentTypeName: 'neural neural-net',
  contentTypeHeader: 'program bus',
  availability: SystemContentTypeAvailability['NOT_SUPPORTED'],
};

export const sampleWithPartialData: ISystemContentType = {
  id: 48606,
  contentTypeName: 'Credit',
  contentTypeHeader: 'Liberian Technician SQL',
  comments: '../fake-data/blob/hipster.txt',
  availability: SystemContentTypeAvailability['NOT_SUPPORTED'],
};

export const sampleWithFullData: ISystemContentType = {
  id: 93397,
  contentTypeName: 'reboot static Fresh',
  contentTypeHeader: 'Rubber forecast enable',
  comments: '../fake-data/blob/hipster.txt',
  availability: SystemContentTypeAvailability['NOT_SUPPORTED'],
};

export const sampleWithNewData: NewSystemContentType = {
  contentTypeName: 'navigate',
  contentTypeHeader: 'Account invoice invoice',
  availability: SystemContentTypeAvailability['SUPPORTED'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
