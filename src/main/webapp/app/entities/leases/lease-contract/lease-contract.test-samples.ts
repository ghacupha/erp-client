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

import { ILeaseContract, NewLeaseContract } from './lease-contract.model';

export const sampleWithRequiredData: ILeaseContract = {
  id: 91546,
  bookingId: 'Plaza',
  leaseTitle: 'lavender',
  identifier: 'c0d4fba0-9cd5-4bf8-b16c-d6426966e342',
  commencementDate: dayjs('2023-01-09'),
  terminalDate: dayjs('2023-01-09'),
};

export const sampleWithPartialData: ILeaseContract = {
  id: 87875,
  bookingId: 'transmit bypass back-end',
  leaseTitle: 'Legacy Incredible Idaho',
  identifier: '377f07e1-18eb-495e-8e75-cc92e8a40be1',
  commencementDate: dayjs('2023-01-08'),
  terminalDate: dayjs('2023-01-08'),
};

export const sampleWithFullData: ILeaseContract = {
  id: 4737,
  bookingId: 'collaboration',
  leaseTitle: 'Avon moderator',
  identifier: '708c14e3-8982-47b7-ba5d-bf26f20e798b',
  description: 'copying revolutionary',
  commencementDate: dayjs('2023-01-09'),
  terminalDate: dayjs('2023-01-09'),
};

export const sampleWithNewData: NewLeaseContract = {
  bookingId: 'Electronics',
  leaseTitle: 'visionary olive Bike',
  identifier: '944a1037-4604-451f-ac99-4b3e56b0b937',
  commencementDate: dayjs('2023-01-08'),
  terminalDate: dayjs('2023-01-09'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
