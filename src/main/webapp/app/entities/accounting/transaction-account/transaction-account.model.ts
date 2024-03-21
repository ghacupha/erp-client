import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface ITransactionAccount {
  id?: number;
  accountNumber?: string;
  accountName?: string;
  notesContentType?: string | null;
  notes?: string | null;
  parentAccount?: ITransactionAccount | null;
  placeholders?: IPlaceholder[] | null;
}

export class TransactionAccount implements ITransactionAccount {
  constructor(
    public id?: number,
    public accountNumber?: string,
    public accountName?: string,
    public notesContentType?: string | null,
    public notes?: string | null,
    public parentAccount?: ITransactionAccount | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getTransactionAccountIdentifier(transactionAccount: ITransactionAccount): number | undefined {
  return transactionAccount.id;
}
