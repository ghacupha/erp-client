import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface ISettlementCurrency {
  id: number;
  iso4217CurrencyCode?: string | null;
  currencyName?: string | null;
  country?: string | null;
  numericCode?: string | null;
  minorUnit?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewSettlementCurrency = Omit<ISettlementCurrency, 'id'> & { id: null };
