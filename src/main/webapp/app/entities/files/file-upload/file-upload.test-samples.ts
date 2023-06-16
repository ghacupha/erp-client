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
