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
