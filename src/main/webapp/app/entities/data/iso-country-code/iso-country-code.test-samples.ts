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

import { IIsoCountryCode, NewIsoCountryCode } from './iso-country-code.model';

export const sampleWithRequiredData: IIsoCountryCode = {
  id: 18877,
};

export const sampleWithPartialData: IIsoCountryCode = {
  id: 52383,
  countryDescription: 'models XSS Haiti',
};

export const sampleWithFullData: IIsoCountryCode = {
  id: 41681,
  countryCode: 'CI',
  countryDescription: 'Cayman',
};

export const sampleWithNewData: NewIsoCountryCode = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
