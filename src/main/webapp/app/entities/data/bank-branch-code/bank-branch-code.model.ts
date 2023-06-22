import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IBankBranchCode {
  id: number;
  bankCode?: string | null;
  bankName?: string | null;
  branchCode?: string | null;
  branchName?: string | null;
  notes?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewBankBranchCode = Omit<IBankBranchCode, 'id'> & { id: null };
