import dayjs from 'dayjs/esm';
import { IPurchaseOrder } from 'app/entities/settlement/purchase-order/purchase-order.model';
import { IPaymentInvoice } from 'app/entities/settlement/payment-invoice/payment-invoice.model';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';

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
