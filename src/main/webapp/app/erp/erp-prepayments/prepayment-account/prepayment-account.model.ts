import { ISettlementCurrency } from '../../erp-settlements/settlement-currency/settlement-currency.model';
import { ISettlement } from '../../erp-settlements/settlement/settlement.model';
import { IServiceOutlet } from '../../erp-granular/service-outlet/service-outlet.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ITransactionAccount } from '../../erp-accounts/transaction-account/transaction-account.model';
import { IDealer } from '../../erp-common/models/dealer.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { IPrepaymentMapping } from '../prepayment-mapping/prepayment-mapping.model';

export interface IPrepaymentAccount {
  id?: number;
  catalogueNumber?: string;
  particulars?: string;
  notes?: string | null;
  prepaymentAmount?: number | null;
  prepaymentGuid?: string | null;
  settlementCurrency?: ISettlementCurrency | null;
  prepaymentTransaction?: ISettlement | null;
  serviceOutlet?: IServiceOutlet | null;
  dealer?: IDealer | null;
  debitAccount?: ITransactionAccount | null;
  transferAccount?: ITransactionAccount | null;
  placeholders?: IPlaceholder[] | null;
  generalParameters?: IUniversallyUniqueMapping[] | null;
  prepaymentParameters?: IPrepaymentMapping[] | null;
}

export class PrepaymentAccount implements IPrepaymentAccount {
  constructor(
    public id?: number,
    public catalogueNumber?: string,
    public particulars?: string,
    public notes?: string | null,
    public prepaymentAmount?: number | null,
    public prepaymentGuid?: string | null,
    public settlementCurrency?: ISettlementCurrency | null,
    public prepaymentTransaction?: ISettlement | null,
    public serviceOutlet?: IServiceOutlet | null,
    public dealer?: IDealer | null,
    public debitAccount?: ITransactionAccount | null,
    public transferAccount?: ITransactionAccount | null,
    public placeholders?: IPlaceholder[] | null,
    public generalParameters?: IUniversallyUniqueMapping[] | null,
    public prepaymentParameters?: IPrepaymentMapping[] | null
  ) {}
}

export function getPrepaymentAccountIdentifier(prepaymentAccount: IPrepaymentAccount): number | undefined {
  return prepaymentAccount.id;
}

