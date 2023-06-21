import dayjs from 'dayjs/esm';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';

export interface IBusinessStamp {
  id: number;
  stampDate?: dayjs.Dayjs | null;
  purpose?: string | null;
  details?: string | null;
  remarks?: string | null;
  stampHolder?: Pick<IDealer, 'id' | 'dealerName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewBusinessStamp = Omit<IBusinessStamp, 'id'> & { id: null };
