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

import { IServiceOutlet, NewServiceOutlet } from './service-outlet.model';

export const sampleWithRequiredData: IServiceOutlet = {
  id: 81660,
  outletCode: 'Senior XSS',
  outletName: 'Specialist',
};

export const sampleWithPartialData: IServiceOutlet = {
  id: 78619,
  outletCode: 'Operations Account',
  outletName: 'Plain services',
  parliamentaryConstituency: 'Togo',
  gpsCoordinates: 'Branding Identity',
  outletClosureDate: dayjs('2022-02-28'),
  licenseFeePayable: 10053,
};

export const sampleWithFullData: IServiceOutlet = {
  id: 69485,
  outletCode: 'Buckinghamshire Team-oriented',
  outletName: 'seamless mint',
  town: 'purple',
  parliamentaryConstituency: 'Passage hack ROI',
  gpsCoordinates: 'transition Investment',
  outletOpeningDate: dayjs('2022-03-01'),
  regulatorApprovalDate: dayjs('2022-03-01'),
  outletClosureDate: dayjs('2022-03-01'),
  dateLastModified: dayjs('2022-02-28'),
  licenseFeePayable: 7227,
};

export const sampleWithNewData: NewServiceOutlet = {
  outletCode: 'Outdoors Personal',
  outletName: 'Representative Tajikistan parse',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
