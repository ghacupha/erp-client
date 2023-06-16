import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IInstitutionCode {
  id: number;
  institutionCode?: string | null;
  institutionName?: string | null;
  shortName?: string | null;
  category?: string | null;
  institutionCategory?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewInstitutionCode = Omit<IInstitutionCode, 'id'> & { id: null };
