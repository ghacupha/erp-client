import dayjs from 'dayjs/esm';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IBusinessStamp } from 'app/entities/business-stamp/business-stamp.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';

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
