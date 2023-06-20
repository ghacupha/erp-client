import dayjs from 'dayjs/esm';
import { IPrepaymentAccount } from 'app/entities/prepayment-account/prepayment-account.model';
import { IAmortizationRecurrence } from 'app/entities/amortization-recurrence/amortization-recurrence.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IPrepaymentMapping } from 'app/entities/prepayment-mapping/prepayment-mapping.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';

export interface IAmortizationSequence {
  id: number;
  prepaymentAccountGuid?: string | null;
  recurrenceGuid?: string | null;
  sequenceNumber?: number | null;
  particulars?: string | null;
  currentAmortizationDate?: dayjs.Dayjs | null;
  previousAmortizationDate?: dayjs.Dayjs | null;
  nextAmortizationDate?: dayjs.Dayjs | null;
  isCommencementSequence?: boolean | null;
  isTerminalSequence?: boolean | null;
  amortizationAmount?: number | null;
  sequenceGuid?: string | null;
  prepaymentAccount?: Pick<IPrepaymentAccount, 'id' | 'catalogueNumber'> | null;
  amortizationRecurrence?: Pick<IAmortizationRecurrence, 'id' | 'particulars'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  prepaymentMappings?: Pick<IPrepaymentMapping, 'id' | 'parameter'>[] | null;
  applicationParameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
}

export type NewAmortizationSequence = Omit<IAmortizationSequence, 'id'> & { id: null };
