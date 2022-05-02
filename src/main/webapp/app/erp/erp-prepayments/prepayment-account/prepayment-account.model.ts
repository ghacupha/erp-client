import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { ISettlement } from 'app/entities/settlement/settlement.model';
import { IServiceOutlet } from 'app/entities/service-outlet/service-outlet.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { ITransactionAccount } from 'app/entities/transaction-account/transaction-account.model';

export interface IPrepaymentAccount {
  id?: number;
  catalogueNumber?: string;
  particulars?: string;
  notes?: string | null;
  settlementCurrency?: ISettlementCurrency | null;
  prepaymentTransaction?: ISettlement | null;
  serviceOutlet?: IServiceOutlet | null;
  dealer?: IDealer | null;
  placeholder?: IPlaceholder | null;
  debitAccount?: ITransactionAccount | null;
  transferAccount?: ITransactionAccount | null;
}

export class PrepaymentAccount implements IPrepaymentAccount {
  constructor(
    public id?: number,
    public catalogueNumber?: string,
    public particulars?: string,
    public notes?: string | null,
    public settlementCurrency?: ISettlementCurrency | null,
    public prepaymentTransaction?: ISettlement | null,
    public serviceOutlet?: IServiceOutlet | null,
    public dealer?: IDealer | null,
    public placeholder?: IPlaceholder | null,
    public debitAccount?: ITransactionAccount | null,
    public transferAccount?: ITransactionAccount | null
  ) {}
}

export function getPrepaymentAccountIdentifier(prepaymentAccount: IPrepaymentAccount): number | undefined {
  return prepaymentAccount.id;
}
