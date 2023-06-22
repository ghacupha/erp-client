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

import { IReportContentType, NewReportContentType } from './report-content-type.model';

export const sampleWithRequiredData: IReportContentType = {
  id: 71292,
  reportTypeName: 'Granite hack',
  reportFileExtension: 'program attitude Future',
};

export const sampleWithPartialData: IReportContentType = {
  id: 4869,
  reportTypeName: 'applications Nebraska',
  reportFileExtension: 'Massachusetts',
};

export const sampleWithFullData: IReportContentType = {
  id: 56475,
  reportTypeName: 'Intelligent Account',
  reportFileExtension: 'Illinois Alabama',
};

export const sampleWithNewData: NewReportContentType = {
  reportTypeName: 'mobile',
  reportFileExtension: 'Executive transparent',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
