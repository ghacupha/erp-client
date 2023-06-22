import dayjs from 'dayjs/esm';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IPaymentRequisition {
  id: number;
  receptionDate?: dayjs.Dayjs | null;
  dealerName?: string | null;
  briefDescription?: string | null;
  requisitionNumber?: string | null;
  invoicedAmount?: number | null;
  disbursementCost?: number | null;
  taxableAmount?: number | null;
  requisitionProcessed?: boolean | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewPaymentRequisition = Omit<IPaymentRequisition, 'id'> & { id: null };
