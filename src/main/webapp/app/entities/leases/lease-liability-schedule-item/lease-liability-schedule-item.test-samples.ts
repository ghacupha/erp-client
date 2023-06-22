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

import { ILeaseLiabilityScheduleItem, NewLeaseLiabilityScheduleItem } from './lease-liability-schedule-item.model';

export const sampleWithRequiredData: ILeaseLiabilityScheduleItem = {
  id: 12564,
};

export const sampleWithPartialData: ILeaseLiabilityScheduleItem = {
  id: 25513,
  sequenceNumber: 82807,
  periodIncluded: true,
  periodStartDate: dayjs('2023-03-28'),
  openingBalance: 37943,
  principalPayment: 2796,
  interestPayment: 43965,
  outstandingBalance: 94730,
  interestExpenseAccrued: 36354,
  interestPayableBalance: 92980,
};

export const sampleWithFullData: ILeaseLiabilityScheduleItem = {
  id: 21828,
  sequenceNumber: 87392,
  periodIncluded: false,
  periodStartDate: dayjs('2023-03-28'),
  periodEndDate: dayjs('2023-03-27'),
  openingBalance: 8783,
  cashPayment: 7698,
  principalPayment: 97562,
  interestPayment: 46129,
  outstandingBalance: 96752,
  interestPayableOpening: 84907,
  interestExpenseAccrued: 4071,
  interestPayableBalance: 86595,
};

export const sampleWithNewData: NewLeaseLiabilityScheduleItem = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
