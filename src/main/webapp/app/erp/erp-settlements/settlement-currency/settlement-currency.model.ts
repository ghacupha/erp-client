import { IPlaceholder } from '../../erp-common/models/placeholder.model';

export interface ISettlementCurrency {
  id?: number;
  iso4217CurrencyCode?: string;
  currencyName?: string;
  country?: string;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export class SettlementCurrency implements ISettlementCurrency {
  constructor(
    public id?: number,
    public iso4217CurrencyCode?: string,
    public currencyName?: string,
    public country?: string,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getSettlementCurrencyIdentifier(settlementCurrency: ISettlementCurrency): number | undefined {
  return settlementCurrency.id;
}
