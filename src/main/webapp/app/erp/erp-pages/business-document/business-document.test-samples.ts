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

import { IBusinessDocument, NewBusinessDocument } from './business-document.model';

export const sampleWithRequiredData: IBusinessDocument = {
  id: 61865,
  documentTitle: 'Omani optical',
  documentSerial: 'ac6ad0a6-f5d5-4459-aff8-13f48f90b10f',
  attachmentFilePath: 'Bedfordshire',
  documentFile: '../fake-data/blob/hipster.png',
  documentFileContentType: 'unknown',
  documentFileChecksum: 'circuit Ranch',
};

export const sampleWithPartialData: IBusinessDocument = {
  id: 64856,
  documentTitle: 'SCSI Response syndicate',
  documentSerial: '1957cac3-9e6f-4211-9abe-1028b7e58126',
  lastModified: dayjs('2022-10-19T01:41'),
  attachmentFilePath: 'View sexy',
  documentFile: undefined,
  documentFileContentType: 'unknown',
  documentFileChecksum: 'withdrawal',
};

export const sampleWithFullData: IBusinessDocument = {
  id: 62523,
  documentTitle: 'frame cross-media Towels',
  description: 'Michigan',
  documentSerial: 'f13d43fb-bf9c-4904-a77d-69c812b92f43',
  lastModified: dayjs('2022-10-19T09:51'),
  attachmentFilePath: 'navigate hacking',
  documentFile: undefined,
  documentFileContentType: 'unknown',
  fileTampered: true,
  documentFileChecksum: 'Dalasi',
};

export const sampleWithNewData: NewBusinessDocument = {
  documentTitle: 'open-source',
  documentSerial: '45fcae1b-500b-4643-8f0d-c6a4e0c71c2e',
  attachmentFilePath: 'turn-key Licensed',
  documentFile: undefined,
  documentFileContentType: 'unknown',
  documentFileChecksum: 'User-centric Station Agent',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
