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

import { ILeaseModelMetadata, NewLeaseModelMetadata } from './lease-model-metadata.model';

export const sampleWithRequiredData: ILeaseModelMetadata = {
  id: 42129,
  modelTitle: 'Associate',
  modelVersion: 48195,
  annualDiscountingRate: 66613,
  commencementDate: dayjs('2023-03-28'),
  terminalDate: dayjs('2023-03-28'),
};

export const sampleWithPartialData: ILeaseModelMetadata = {
  id: 45468,
  modelTitle: 'payment Berkshire',
  modelVersion: 62103,
  description: 'fuchsia Automotive Parks',
  annualDiscountingRate: 6482,
  commencementDate: dayjs('2023-03-28'),
  terminalDate: dayjs('2023-03-28'),
  totalReportingPeriods: 11989,
  reportingPeriodsPerYear: 610,
  settlementPeriodsPerYear: 25970,
  totalDepreciationPeriods: 45377,
};

export const sampleWithFullData: ILeaseModelMetadata = {
  id: 52448,
  modelTitle: 'logistical SAS',
  modelVersion: 48962,
  description: 'Applications Orchestrator EXE',
  modelNotes: '../fake-data/blob/hipster.png',
  modelNotesContentType: 'unknown',
  annualDiscountingRate: 88742,
  commencementDate: dayjs('2023-03-28'),
  terminalDate: dayjs('2023-03-27'),
  totalReportingPeriods: 68134,
  reportingPeriodsPerYear: 86159,
  settlementPeriodsPerYear: 52191,
  initialLiabilityAmount: 30691,
  initialROUAmount: 31129,
  totalDepreciationPeriods: 22891,
};

export const sampleWithNewData: NewLeaseModelMetadata = {
  modelTitle: 'Paradigm Ball',
  modelVersion: 84849,
  annualDiscountingRate: 70552,
  commencementDate: dayjs('2023-03-28'),
  terminalDate: dayjs('2023-03-28'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
