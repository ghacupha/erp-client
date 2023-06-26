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

import { IReportStatus, NewReportStatus } from './report-status.model';

export const sampleWithRequiredData: IReportStatus = {
  id: 16158,
  reportName: 'card Shirt Account',
  reportId: '5199aafe-7877-4f93-b34c-7bd32d8831d1',
};

export const sampleWithPartialData: IReportStatus = {
  id: 60707,
  reportName: 'Virginia Plastic',
  reportId: '6d9e1919-b82f-4d3c-a285-d2a4a2c8a7b9',
};

export const sampleWithFullData: IReportStatus = {
  id: 83435,
  reportName: 'ivory Arizona Tasty',
  reportId: '14445099-17da-45ea-802f-7dc0f5978b1a',
};

export const sampleWithNewData: NewReportStatus = {
  reportName: 'Steel',
  reportId: '75340024-40d5-48d0-8e7b-7a6d9c475b7d',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
