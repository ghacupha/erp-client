import * as dayjs from 'dayjs';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IPrepaymentMarshalling {
  id?: number;
  inactive?: boolean;
  amortizationCommencementDate?: dayjs.Dayjs | null;
  amortizationPeriods?: number | null;
  prepaymentAccount?: IPrepaymentAccount;
  placeholders?: IPlaceholder[] | null;
}

export class PrepaymentMarshalling implements IPrepaymentMarshalling {
  constructor(
    public id?: number,
    public inactive?: boolean,
    public amortizationCommencementDate?: dayjs.Dayjs | null,
    public amortizationPeriods?: number | null,
    public prepaymentAccount?: IPrepaymentAccount,
    public placeholders?: IPlaceholder[] | null
  ) {
    this.inactive = this.inactive ?? false;
  }
}

export function getPrepaymentMarshallingIdentifier(prepaymentMarshalling: IPrepaymentMarshalling): number | undefined {
  return prepaymentMarshalling.id;
}
