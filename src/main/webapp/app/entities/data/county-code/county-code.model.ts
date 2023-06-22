import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface ICountyCode {
  id: number;
  countyCode?: number | null;
  countyName?: string | null;
  subCountyCode?: number | null;
  subCountyName?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewCountyCode = Omit<ICountyCode, 'id'> & { id: null };
