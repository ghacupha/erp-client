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

import { IDealer, NewDealer } from './dealer.model';

export const sampleWithRequiredData: IDealer = {
  id: 47955,
  dealerName: 'Movies Montana Bedfordshire',
};

export const sampleWithPartialData: IDealer = {
  id: 8421,
  dealerName: 'Solomon SAS',
  department: 'Michigan Sports Saudi',
  postalAddress: 'Intelligent Bridge',
  otherNames: 'Kenyan',
};

export const sampleWithFullData: IDealer = {
  id: 64497,
  dealerName: 'killer Mountains Personal',
  taxNumber: 'recontextualize Frozen',
  identificationDocumentNumber: 'Dynamic Producer deposit',
  organizationName: 'AI Club haptic',
  department: 'Borders',
  position: 'reboot capacitor Clothing',
  postalAddress: 'SDD',
  physicalAddress: 'withdrawal Outdoors interfaces',
  accountName: 'Home Loan Account',
  accountNumber: 'Burundi Table Gloves',
  bankersName: 'programming wireless',
  bankersBranch: 'Nebraska Wyoming',
  bankersSwiftCode: 'Lek Flat',
  fileUploadToken: 'engineer Checking',
  compilationToken: 'Granite Moldovan',
  remarks: '../fake-data/blob/hipster.txt',
  otherNames: 'Polarised vertical District',
};

export const sampleWithNewData: NewDealer = {
  dealerName: 'Forward',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
