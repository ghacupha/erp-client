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
