import * as dayjs from 'dayjs';
import { IDealer } from '../../erp-common/models/dealer.model';
import { IPlaceholder } from '../../erp-common/models/placeholder.model';

export interface IBusinessStamp {
  id?: number;
  stampDate?: dayjs.Dayjs | null;
  purpose?: string | null;
  details?: string | null;
  stampHolder?: IDealer;
  placeholders?: IPlaceholder[] | null;
}

export class BusinessStamp implements IBusinessStamp {
  constructor(
    public id?: number,
    public stampDate?: dayjs.Dayjs | null,
    public purpose?: string | null,
    public details?: string | null,
    public stampHolder?: IDealer,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getBusinessStampIdentifier(businessStamp: IBusinessStamp): number | undefined {
  return businessStamp.id;
}
