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
