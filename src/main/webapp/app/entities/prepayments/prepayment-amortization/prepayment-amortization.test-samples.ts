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

import { IPrepaymentAmortization, NewPrepaymentAmortization } from './prepayment-amortization.model';

export const sampleWithRequiredData: IPrepaymentAmortization = {
  id: 35317,
};

export const sampleWithPartialData: IPrepaymentAmortization = {
  id: 10743,
  description: 'calculate invoice Avon',
  prepaymentPeriod: dayjs('2022-05-03'),
  inactive: true,
};

export const sampleWithFullData: IPrepaymentAmortization = {
  id: 54271,
  description: 'Team-oriented',
  prepaymentPeriod: dayjs('2022-05-02'),
  prepaymentAmount: 17994,
  inactive: false,
};

export const sampleWithNewData: NewPrepaymentAmortization = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
