import * as dayjs from 'dayjs';
import { IPurchaseOrder } from '../purchase-order/purchase-order.model';
import { IPaymentInvoice } from '../payment-invoice/payment-invoice.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IPaymentLabel } from '../../erp-pages/payment-label/payment-label.model';

export interface ICreditNote {
  id?: number;
  creditNumber?: string;
  creditNoteDate?: dayjs.Dayjs;
  creditAmount?: number;
  remarks?: string | null;
  purchaseOrders?: IPurchaseOrder[] | null;
  invoices?: IPaymentInvoice[] | null;
  paymentLabels?: IPaymentLabel[] | null;
  placeholders?: IPlaceholder[] | null;
}

export class CreditNote implements ICreditNote {
  constructor(
    public id?: number,
    public creditNumber?: string,
    public creditNoteDate?: dayjs.Dayjs,
    public creditAmount?: number,
    public remarks?: string | null,
    public purchaseOrders?: IPurchaseOrder[] | null,
    public invoices?: IPaymentInvoice[] | null,
    public paymentLabels?: IPaymentLabel[] | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getCreditNoteIdentifier(creditNote: ICreditNote): number | undefined {
  return creditNote.id;
}
