import * as dayjs from 'dayjs';
import { IPurchaseOrder } from 'app/erp/erp-settlements/purchase-order/purchase-order.model';
import { ISettlementCurrency } from 'app/erp/erp-settlements/settlement-currency/settlement-currency.model';
import { IPlaceholder } from '../../erp-common/models/placeholder.model';
import { IPaymentLabel } from '../../erp-common/models/payment-label.model';
import { IDealer } from '../../erp-common/models/dealer.model';

export interface IPaymentInvoice {
  id?: number;
  invoiceNumber?: string;
  invoiceDate?: dayjs.Dayjs | null;
  invoiceAmount?: number | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  purchaseOrders?: IPurchaseOrder[] | null;
  placeholders?: IPlaceholder[] | null;
  paymentLabels?: IPaymentLabel[] | null;
  settlementCurrency?: ISettlementCurrency;
  biller?: IDealer;
}

export class PaymentInvoice implements IPaymentInvoice {
  constructor(
    public id?: number,
    public invoiceNumber?: string,
    public invoiceDate?: dayjs.Dayjs | null,
    public invoiceAmount?: number | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public remarks?: string | null,
    public purchaseOrders?: IPurchaseOrder[] | null,
    public placeholders?: IPlaceholder[] | null,
    public paymentLabels?: IPaymentLabel[] | null,
    public settlementCurrency?: ISettlementCurrency,
    public biller?: IDealer
  ) {}
}

export function getPaymentInvoiceIdentifier(paymentInvoice: IPaymentInvoice): number | undefined {
  return paymentInvoice.id;
}
