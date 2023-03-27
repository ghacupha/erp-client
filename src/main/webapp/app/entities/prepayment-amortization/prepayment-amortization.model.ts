import * as dayjs from 'dayjs';
import { IPrepaymentAccount } from 'app/entities/prepayment-account/prepayment-account.model';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { ITransactionAccount } from 'app/entities/transaction-account/transaction-account.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IPrepaymentAmortization {
  id?: number;
  description?: string | null;
  prepaymentPeriod?: dayjs.Dayjs | null;
  prepaymentAmount?: number | null;
  inactive?: boolean | null;
  prepaymentAccount?: IPrepaymentAccount | null;
  settlementCurrency?: ISettlementCurrency | null;
  debitAccount?: ITransactionAccount | null;
  creditAccount?: ITransactionAccount | null;
  placeholders?: IPlaceholder[] | null;
}

export class PrepaymentAmortization implements IPrepaymentAmortization {
  constructor(
    public id?: number,
    public description?: string | null,
    public prepaymentPeriod?: dayjs.Dayjs | null,
    public prepaymentAmount?: number | null,
    public inactive?: boolean | null,
    public prepaymentAccount?: IPrepaymentAccount | null,
    public settlementCurrency?: ISettlementCurrency | null,
    public debitAccount?: ITransactionAccount | null,
    public creditAccount?: ITransactionAccount | null,
    public placeholders?: IPlaceholder[] | null
  ) {
    this.inactive = this.inactive ?? false;
  }
}

export function getPrepaymentAmortizationIdentifier(prepaymentAmortization: IPrepaymentAmortization): number | undefined {
  return prepaymentAmortization.id;
}
