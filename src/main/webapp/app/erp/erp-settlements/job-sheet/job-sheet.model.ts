import dayjs from 'dayjs/esm';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IBusinessDocument } from '../../erp-pages/business-document/business-document.model';
import { IPaymentLabel } from '../../erp-pages/payment-label/payment-label.model';
import { IBusinessStamp } from '../business-stamp/business-stamp.model';

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
