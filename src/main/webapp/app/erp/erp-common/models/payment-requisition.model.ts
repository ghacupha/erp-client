import * as dayjs from 'dayjs';
import { IPlaceholder } from 'app/erp/erp-common/models/placeholder.model';
import { IPaymentLabel } from './payment-label.model';

export interface IPaymentRequisition {
  id?: number;
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
  paymentLabels?: IPaymentLabel[] | null;
  placeholders?: IPlaceholder[] | null;
}

export class PaymentRequisition implements IPaymentRequisition {
  constructor(
    public id?: number,
    public receptionDate?: dayjs.Dayjs | null,
    public dealerName?: string | null,
    public briefDescription?: string | null,
    public requisitionNumber?: string | null,
    public invoicedAmount?: number | null,
    public disbursementCost?: number | null,
    public taxableAmount?: number | null,
    public requisitionProcessed?: boolean | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public paymentLabels?: IPaymentLabel[] | null,
    public placeholders?: IPlaceholder[] | null
  ) {
    this.requisitionProcessed = this.requisitionProcessed ?? false;
  }
}

export function getPaymentRequisitionIdentifier(paymentRequisition: IPaymentRequisition): number | undefined {
  return paymentRequisition.id;
}
