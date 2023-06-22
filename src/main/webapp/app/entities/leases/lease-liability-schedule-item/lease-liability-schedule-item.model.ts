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
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { ILeaseContract } from 'app/entities/leases/lease-contract/lease-contract.model';
import { ILeaseModelMetadata } from 'app/entities/leases/lease-model-metadata/lease-model-metadata.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';

export interface ILeaseLiabilityScheduleItem {
  id: number;
  sequenceNumber?: number | null;
  periodIncluded?: boolean | null;
  periodStartDate?: dayjs.Dayjs | null;
  periodEndDate?: dayjs.Dayjs | null;
  openingBalance?: number | null;
  cashPayment?: number | null;
  principalPayment?: number | null;
  interestPayment?: number | null;
  outstandingBalance?: number | null;
  interestPayableOpening?: number | null;
  interestExpenseAccrued?: number | null;
  interestPayableBalance?: number | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  leaseContract?: Pick<ILeaseContract, 'id' | 'bookingId'> | null;
  leaseModelMetadata?: Pick<ILeaseModelMetadata, 'id' | 'modelTitle'> | null;
  universallyUniqueMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
}

export type NewLeaseLiabilityScheduleItem = Omit<ILeaseLiabilityScheduleItem, 'id'> & { id: null };
