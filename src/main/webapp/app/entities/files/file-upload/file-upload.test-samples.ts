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

import { IFileUpload, NewFileUpload } from './file-upload.model';

export const sampleWithRequiredData: IFileUpload = {
  id: 39985,
  description: 'Computers contingency',
  fileName: 'Account black',
  fileTypeId: 25137,
  dataFile: '../fake-data/blob/hipster.png',
  dataFileContentType: 'unknown',
};

export const sampleWithPartialData: IFileUpload = {
  id: 12659,
  description: 'bleeding-edge Engineer Wooden',
  fileName: 'Administrator Frozen Dynamic',
  periodFrom: dayjs('2021-04-14'),
  fileTypeId: 40235,
  dataFile: '../fake-data/blob/hipster.png',
  dataFileContentType: 'unknown',
  uploadSuccessful: true,
  uploadToken: 'haptic 1080p maximized',
};

export const sampleWithFullData: IFileUpload = {
  id: 92386,
  description: 'hub',
  fileName: 'red',
  periodFrom: dayjs('2021-04-14'),
  periodTo: dayjs('2021-04-13'),
  fileTypeId: 68782,
  dataFile: '../fake-data/blob/hipster.png',
  dataFileContentType: 'unknown',
  uploadSuccessful: true,
  uploadProcessed: false,
  uploadToken: 'Lebanon deposit',
};

export const sampleWithNewData: NewFileUpload = {
  description: 'Manor Peso archive',
  fileName: 'wireless firewall Rubber',
  fileTypeId: 2975,
  dataFile: '../fake-data/blob/hipster.png',
  dataFileContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
