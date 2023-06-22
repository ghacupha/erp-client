import dayjs from 'dayjs/esm';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { IBusinessStamp } from 'app/entities/settlement/business-stamp/business-stamp.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';

export interface IJobSheet {
  id: number;
  serialNumber?: string | null;
  jobSheetDate?: dayjs.Dayjs | null;
  details?: string | null;
  remarks?: string | null;
  biller?: Pick<IDealer, 'id' | 'dealerName'> | null;
  signatories?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  contactPerson?: Pick<IDealer, 'id' | 'dealerName'> | null;
  businessStamps?: Pick<IBusinessStamp, 'id' | 'details'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewJobSheet = Omit<IJobSheet, 'id'> & { id: null };
