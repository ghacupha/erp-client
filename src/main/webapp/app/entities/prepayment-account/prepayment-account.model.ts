import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { ISettlement } from 'app/entities/settlement/settlement.model';
import { IServiceOutlet } from 'app/entities/service-outlet/service-outlet.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { ITransactionAccount } from 'app/entities/transaction-account/transaction-account.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { IPrepaymentMapping } from 'app/entities/prepayment-mapping/prepayment-mapping.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';

export interface IPrepaymentAccount {
  id: number;
  catalogueNumber?: string | null;
  particulars?: string | null;
  notes?: string | null;
  prepaymentAmount?: number | null;
  prepaymentGuid?: string | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  prepaymentTransaction?: Pick<ISettlement, 'id' | 'paymentNumber'> | null;
  serviceOutlet?: Pick<IServiceOutlet, 'id' | 'outletCode'> | null;
  dealer?: Pick<IDealer, 'id' | 'dealerName'> | null;
  debitAccount?: Pick<ITransactionAccount, 'id' | 'accountName'> | null;
  transferAccount?: Pick<ITransactionAccount, 'id' | 'accountName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  generalParameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  prepaymentParameters?: Pick<IPrepaymentMapping, 'id' | 'parameterKey'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewPrepaymentAccount = Omit<IPrepaymentAccount, 'id'> & { id: null };
