import dayjs from 'dayjs/esm';
import { IPrepaymentAccount } from 'app/entities/prepayment-account/prepayment-account.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IPrepaymentMarshalling {
  id: number;
  inactive?: boolean | null;
  amortizationCommencementDate?: dayjs.Dayjs | null;
  amortizationPeriods?: number | null;
  prepaymentAccount?: Pick<IPrepaymentAccount, 'id' | 'catalogueNumber'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewPrepaymentMarshalling = Omit<IPrepaymentMarshalling, 'id'> & { id: null };
