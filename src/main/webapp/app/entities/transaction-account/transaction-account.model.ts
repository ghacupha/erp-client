import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface ITransactionAccount {
  id: number;
  accountNumber?: string | null;
  accountName?: string | null;
  notes?: string | null;
  notesContentType?: string | null;
  parentAccount?: Pick<ITransactionAccount, 'id' | 'accountNumber'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewTransactionAccount = Omit<ITransactionAccount, 'id'> & { id: null };
