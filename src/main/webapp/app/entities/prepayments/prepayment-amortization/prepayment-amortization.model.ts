import dayjs from 'dayjs/esm';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { ITransactionAccount } from 'app/entities/accounting/transaction-account/transaction-account.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IPrepaymentAmortization {
  id: number;
  description?: string | null;
  prepaymentPeriod?: dayjs.Dayjs | null;
  prepaymentAmount?: number | null;
  inactive?: boolean | null;
  prepaymentAccount?: Pick<IPrepaymentAccount, 'id' | 'catalogueNumber'> | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  debitAccount?: Pick<ITransactionAccount, 'id' | 'accountNumber'> | null;
  creditAccount?: Pick<ITransactionAccount, 'id' | 'accountNumber'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewPrepaymentAmortization = Omit<IPrepaymentAmortization, 'id'> & { id: null };
