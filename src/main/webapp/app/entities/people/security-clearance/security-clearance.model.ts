import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface ISecurityClearance {
  id: number;
  clearanceLevel?: string | null;
  grantedClearances?: Pick<ISecurityClearance, 'id' | 'clearanceLevel'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewSecurityClearance = Omit<ISecurityClearance, 'id'> & { id: null };
