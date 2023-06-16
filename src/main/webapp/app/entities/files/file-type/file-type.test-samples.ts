import { FileMediumTypes } from 'app/entities/enumerations/file-medium-types.model';
import { FileModelType } from 'app/entities/enumerations/file-model-type.model';

import { IFileType, NewFileType } from './file-type.model';

export const sampleWithRequiredData: IFileType = {
  id: 51381,
  fileTypeName: 'interactive systematic',
  fileMediumType: FileMediumTypes['EXCEL_XLSB'],
  fileType: FileModelType['SIGNED_PAYMENT'],
};

export const sampleWithPartialData: IFileType = {
  id: 24450,
  fileTypeName: 'gold SDD',
  fileMediumType: FileMediumTypes['EXCEL_XML'],
  description: 'Account',
  fileTemplate: '../fake-data/blob/hipster.png',
  fileTemplateContentType: 'unknown',
  fileType: FileModelType['PAYMENT_CATEGORY'],
};

export const sampleWithFullData: IFileType = {
  id: 25874,
  fileTypeName: 'Engineer Operative Concrete',
  fileMediumType: FileMediumTypes['HTML5'],
  description: 'Plastic Borders',
  fileTemplate: '../fake-data/blob/hipster.png',
  fileTemplateContentType: 'unknown',
  fileType: FileModelType['INVOICE'],
};

export const sampleWithNewData: NewFileType = {
  fileTypeName: 'ivory',
  fileMediumType: FileMediumTypes['JSON'],
  fileType: FileModelType['DEALER'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
