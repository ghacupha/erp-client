import * as dayjs from 'dayjs';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { ISettlementCurrency } from 'app/entities/system/settlement-currency/settlement-currency.model';
import { ITransactionAccount } from 'app/entities/accounting/transaction-account/transaction-account.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IFiscalMonth } from 'app/entities/system/fiscal-month/fiscal-month.model';
import { IPrepaymentCompilationRequest } from 'app/entities/prepayments/prepayment-compilation-request/prepayment-compilation-request.model';

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
  fiscalMonth?: IFiscalMonth;
  prepaymentCompilationRequest?: IPrepaymentCompilationRequest;
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
    public placeholders?: IPlaceholder[] | null,
    public fiscalMonth?: IFiscalMonth,
    public prepaymentCompilationRequest?: IPrepaymentCompilationRequest
  ) {
    this.inactive = this.inactive ?? false;
  }
}

export function getPrepaymentAmortizationIdentifier(prepaymentAmortization: IPrepaymentAmortization): number | undefined {
  return prepaymentAmortization.id;
}
