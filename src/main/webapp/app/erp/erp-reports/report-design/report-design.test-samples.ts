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

import { IReportDesign, NewReportDesign } from './report-design.model';

export const sampleWithRequiredData: IReportDesign = {
  id: 47054,
  catalogueNumber: '9cadb529-c2c1-46cc-903d-e1d43323f5c7',
  designation: 'plum Locks Cambridgeshire',
};

export const sampleWithPartialData: IReportDesign = {
  id: 31498,
  catalogueNumber: '7a57197f-ed35-416c-a5af-4d899748b497',
  designation: 'Alaska Rustic Vietnam',
  notes: '../fake-data/blob/hipster.png',
  notesContentType: 'unknown',
  reportFileChecksum: 'Account Turkmenistan Delaware',
};

export const sampleWithFullData: IReportDesign = {
  id: 22760,
  catalogueNumber: 'c96e4626-09d4-4419-b0aa-545d3bfcb103',
  designation: 'Idaho mobile',
  description: '../fake-data/blob/hipster.txt',
  notes: '../fake-data/blob/hipster.png',
  notesContentType: 'unknown',
  reportFile: '../fake-data/blob/hipster.png',
  reportFileContentType: 'unknown',
  reportFileChecksum: 'web-readiness IB global',
};

export const sampleWithNewData: NewReportDesign = {
  catalogueNumber: 'a1034795-79e3-47d2-8f62-98cfb918e5ea',
  designation: 'Cambridgeshire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
