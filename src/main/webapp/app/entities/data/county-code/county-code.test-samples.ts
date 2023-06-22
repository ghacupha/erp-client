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

import { ICountyCode, NewCountyCode } from './county-code.model';

export const sampleWithRequiredData: ICountyCode = {
  id: 3983,
  countyCode: 99982,
  countyName: 'Towels',
  subCountyCode: 72083,
  subCountyName: 'Developer Stravenue Uganda',
};

export const sampleWithPartialData: ICountyCode = {
  id: 13188,
  countyCode: 10814,
  countyName: 'Dynamic',
  subCountyCode: 43335,
  subCountyName: 'tan Configuration',
};

export const sampleWithFullData: ICountyCode = {
  id: 49980,
  countyCode: 18258,
  countyName: 'heuristic value-added',
  subCountyCode: 19122,
  subCountyName: 'invoice',
};

export const sampleWithNewData: NewCountyCode = {
  countyCode: 81717,
  countyName: 'matrix XML',
  subCountyCode: 16629,
  subCountyName: 'infomediaries implement up',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
