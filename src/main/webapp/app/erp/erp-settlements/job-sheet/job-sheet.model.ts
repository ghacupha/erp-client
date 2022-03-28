import * as dayjs from 'dayjs';
import { IDealer } from '../../erp-common/models/dealer.model';
import { IBusinessStamp } from '../business-stamp/business-stamp.model';
import { IPaymentLabel } from '../../erp-common/models/payment-label.model';
import { IPlaceholder } from '../../erp-common/models/placeholder.model';

export interface IJobSheet {
  id?: number;
  serialNumber?: string;
  jobSheetDate?: dayjs.Dayjs | null;
  details?: string | null;
  remarks?: string | null;
  biller?: IDealer;
  signatories?: IDealer[] | null;
  contactPerson?: IDealer | null;
  businessStamps?: IBusinessStamp[] | null;
  placeholders?: IPlaceholder[] | null;
  paymentLabels?: IPaymentLabel[] | null;
}

export class JobSheet implements IJobSheet {
  constructor(
    public id?: number,
    public serialNumber?: string,
    public jobSheetDate?: dayjs.Dayjs | null,
    public details?: string | null,
    public remarks?: string | null,
    public biller?: IDealer,
    public signatories?: IDealer[] | null,
    public contactPerson?: IDealer | null,
    public businessStamps?: IBusinessStamp[] | null,
    public placeholders?: IPlaceholder[] | null,
    public paymentLabels?: IPaymentLabel[] | null
  ) {}
}

export function getJobSheetIdentifier(jobSheet: IJobSheet): number | undefined {
  return jobSheet.id;
}
