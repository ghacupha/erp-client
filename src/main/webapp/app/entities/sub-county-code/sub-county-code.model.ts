import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface ISubCountyCode {
  id: number;
  countyCode?: string | null;
  countyName?: string | null;
  subCountyCode?: string | null;
  subCountyName?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewSubCountyCode = Omit<ISubCountyCode, 'id'> & { id: null };
