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
