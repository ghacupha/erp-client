import dayjs from 'dayjs/esm';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IDeliveryNote } from 'app/entities/delivery-note/delivery-note.model';
import { IJobSheet } from 'app/entities/job-sheet/job-sheet.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';

export interface IPaymentInvoice {
  id: number;
  invoiceNumber?: string | null;
  invoiceDate?: dayjs.Dayjs | null;
  invoiceAmount?: number | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  purchaseOrders?: Pick<IPurchaseOrder, 'id' | 'purchaseOrderNumber'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  biller?: Pick<IDealer, 'id' | 'dealerName'> | null;
  deliveryNotes?: Pick<IDeliveryNote, 'id' | 'deliveryNoteNumber'>[] | null;
  jobSheets?: Pick<IJobSheet, 'id' | 'serialNumber'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewPaymentInvoice = Omit<IPaymentInvoice, 'id'> & { id: null };
