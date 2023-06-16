import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IIsoCountryCode {
  id: number;
  countryCode?: string | null;
  countryDescription?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewIsoCountryCode = Omit<IIsoCountryCode, 'id'> & { id: null };
