import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';

export interface IWorkProjectRegister {
  id: number;
  catalogueNumber?: string | null;
  description?: string | null;
  details?: string | null;
  detailsContentType?: string | null;
  totalProjectCost?: number | null;
  additionalNotes?: string | null;
  additionalNotesContentType?: string | null;
  dealers?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewWorkProjectRegister = Omit<IWorkProjectRegister, 'id'> & { id: null };
