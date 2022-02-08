import * as dayjs from 'dayjs';
import { IPurchaseOrder } from 'app/erp/erp-settlements/purchase-order/purchase-order.model';
import { ISettlementCurrency } from 'app/erp/erp-settlements/settlement-currency/settlement-currency.model';
import { IPlaceholder } from '../../erp-common/models/placeholder.model';
import { IPaymentLabel } from '../../erp-common/models/payment-label.model';

export interface IPaymentInvoice {
  id?: number;
  invoiceNumber?: string;
  invoiceDate?: dayjs.Dayjs | null;
  invoiceAmount?: number | null;
  paymentReference?: string | null;
  dealerName?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  purchaseOrders?: IPurchaseOrder[] | null;
  placeholders?: IPlaceholder[] | null;
  paymentLabels?: IPaymentLabel[] | null;
  settlementCurrency?: ISettlementCurrency;
}

export class PaymentInvoice implements IPaymentInvoice {
  constructor(
    public id?: number,
    public invoiceNumber?: string,
    public invoiceDate?: dayjs.Dayjs | null,
    public invoiceAmount?: number | null,
    public paymentReference?: string | null,
    public dealerName?: string | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public purchaseOrders?: IPurchaseOrder[] | null,
    public placeholders?: IPlaceholder[] | null,
    public paymentLabels?: IPaymentLabel[] | null,
    public settlementCurrency?: ISettlementCurrency
  ) {}
}

export function getPaymentInvoiceIdentifier(paymentInvoice: IPaymentInvoice): number | undefined {
  return paymentInvoice.id;
}
