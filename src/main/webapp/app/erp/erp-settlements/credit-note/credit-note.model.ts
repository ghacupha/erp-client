import dayjs from 'dayjs/esm';
import { IPurchaseOrder } from '../purchase-order/purchase-order.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ISettlementCurrency } from '../settlement-currency/settlement-currency.model';
import { IPaymentLabel } from '../../erp-pages/payment-label/payment-label.model';
import { IPaymentInvoice } from '../payment-invoice/payment-invoice.model';

export interface ICreditNote {
  id: number;
  creditNumber?: string | null;
  creditNoteDate?: dayjs.Dayjs | null;
  creditAmount?: number | null;
  remarks?: string | null;
  purchaseOrders?: Pick<IPurchaseOrder, 'id' | 'purchaseOrderNumber'>[] | null;
  invoices?: Pick<IPaymentInvoice, 'id' | 'invoiceNumber'>[] | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
}

export type NewCreditNote = Omit<ICreditNote, 'id'> & { id: null };
