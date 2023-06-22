import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IMfbBranchCode {
  id: number;
  bankCode?: string | null;
  bankName?: string | null;
  branchCode?: string | null;
  branchName?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewMfbBranchCode = Omit<IMfbBranchCode, 'id'> & { id: null };
