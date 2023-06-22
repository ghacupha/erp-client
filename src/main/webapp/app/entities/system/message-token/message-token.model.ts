import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IMessageToken {
  id: number;
  description?: string | null;
  timeSent?: number | null;
  tokenValue?: string | null;
  received?: boolean | null;
  actioned?: boolean | null;
  contentFullyEnqueued?: boolean | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewMessageToken = Omit<IMessageToken, 'id'> & { id: null };
