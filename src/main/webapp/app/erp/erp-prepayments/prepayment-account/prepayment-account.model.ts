import { ISettlementCurrency } from '../../erp-settlements/settlement-currency/settlement-currency.model';
import { IDealer } from '../../erp-common/models/dealer.model';
import { ISettlement } from '../../erp-settlements/settlement/settlement.model';
import { IServiceOutlet } from '../../erp-granular/service-outlet/service-outlet.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ITransactionAccount } from '../../erp-accounts/transaction-account/transaction-account.model';

export interface IPrepaymentAccount {
  id?: number;
  catalogueNumber?: string;
  particulars?: string;
  notes?: string | null;
  prepaymentAmount?: number | null;
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
    public prepaymentAmount?: number | null,
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
