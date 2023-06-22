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

import dayjs from 'dayjs/esm';

import { IExcelReportExport, NewExcelReportExport } from './excel-report-export.model';

export const sampleWithRequiredData: IExcelReportExport = {
  id: 43996,
  reportName: 'copying Accountability',
  reportPassword: 'Soft Virginia Industrial',
  reportTimeStamp: dayjs('2022-06-29T10:09'),
  reportId: '70298955-8428-4600-aedd-b657fe33790c',
};

export const sampleWithPartialData: IExcelReportExport = {
  id: 27063,
  reportName: 'navigating index PCI',
  reportPassword: 'Pizza',
  fileCheckSum: '../fake-data/blob/hipster.txt',
  reportFile: '../fake-data/blob/hipster.png',
  reportFileContentType: 'unknown',
  reportTimeStamp: dayjs('2022-06-29T05:30'),
  reportId: '7050b4f3-ff1e-49c0-9f5b-84ef232bd70d',
};

export const sampleWithFullData: IExcelReportExport = {
  id: 22133,
  reportName: 'Account Pitcairn orchestration',
  reportPassword: 'Pizza Shoes invoice',
  reportNotes: '../fake-data/blob/hipster.png',
  reportNotesContentType: 'unknown',
  fileCheckSum: '../fake-data/blob/hipster.txt',
  reportFile: '../fake-data/blob/hipster.png',
  reportFileContentType: 'unknown',
  reportTimeStamp: dayjs('2022-06-29T07:30'),
  reportId: '7df81b3d-e724-4d4b-a474-ce5bcdcc7656',
};

export const sampleWithNewData: NewExcelReportExport = {
  reportName: 'Sausages Account product',
  reportPassword: 'Towels paradigm',
  reportTimeStamp: dayjs('2022-06-28T21:02'),
  reportId: '0964c92d-9b30-4454-978f-d238f2b8e2d3',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
