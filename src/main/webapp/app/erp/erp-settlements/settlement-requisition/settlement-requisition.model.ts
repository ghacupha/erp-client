import dayjs from 'dayjs/esm';
import { PaymentStatus } from '../../erp-common/enumerations/payment-status.model';
import { ISettlementCurrency } from '../settlement-currency/settlement-currency.model';
import { IJobSheet } from '../job-sheet/job-sheet.model';
import { IBusinessDocument } from '../../erp-pages/business-document/business-document.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IDeliveryNote } from '../delivery-note/delivery-note.model';
import { IPaymentInvoice } from '../payment-invoice/payment-invoice.model';
import { IApplicationUser } from '../../erp-pages/application-user/application-user.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';

export interface ISettlementRequisition {
  id: number;
  description?: string | null;
  serialNumber?: string | null;
  timeOfRequisition?: dayjs.Dayjs | null;
  requisitionNumber?: string | null;
  paymentAmount?: number | null;
  paymentStatus?: PaymentStatus | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  currentOwner?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
  nativeOwner?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
  nativeDepartment?: Pick<IDealer, 'id' | 'dealerName'> | null;
  biller?: Pick<IDealer, 'id' | 'dealerName'> | null;
  paymentInvoices?: Pick<IPaymentInvoice, 'id' | 'invoiceNumber'>[] | null;
  deliveryNotes?: Pick<IDeliveryNote, 'id' | 'deliveryNoteNumber'>[] | null;
  jobSheets?: Pick<IJobSheet, 'id' | 'serialNumber'>[] | null;
  signatures?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
  applicationMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewSettlementRequisition = Omit<ISettlementRequisition, 'id'> & { id: null };
