import * as dayjs from 'dayjs';
import { ILeaseModelMetadata } from '../lease-model-metadata/lease-model-metadata.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { ILeaseContract } from '../lease-contract/lease-contract.model';

export interface ILeaseLiabilityScheduleItem {
  id?: number;
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
  placeholders?: IPlaceholder[] | null;
  leaseContract?: ILeaseContract;
  leaseModelMetadata?: ILeaseModelMetadata | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
}

export class LeaseLiabilityScheduleItem implements ILeaseLiabilityScheduleItem {
  constructor(
    public id?: number,
    public sequenceNumber?: number | null,
    public periodIncluded?: boolean | null,
    public periodStartDate?: dayjs.Dayjs | null,
    public periodEndDate?: dayjs.Dayjs | null,
    public openingBalance?: number | null,
    public cashPayment?: number | null,
    public principalPayment?: number | null,
    public interestPayment?: number | null,
    public outstandingBalance?: number | null,
    public interestPayableOpening?: number | null,
    public interestExpenseAccrued?: number | null,
    public interestPayableBalance?: number | null,
    public placeholders?: IPlaceholder[] | null,
    public leaseContract?: ILeaseContract,
    public leaseModelMetadata?: ILeaseModelMetadata | null,
    public universallyUniqueMappings?: IUniversallyUniqueMapping[] | null
  ) {
    this.periodIncluded = this.periodIncluded ?? false;
  }
}

export function getLeaseLiabilityScheduleItemIdentifier(leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem): number | undefined {
  return leaseLiabilityScheduleItem.id;
}
