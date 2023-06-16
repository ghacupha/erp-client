import dayjs from 'dayjs/esm';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

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
