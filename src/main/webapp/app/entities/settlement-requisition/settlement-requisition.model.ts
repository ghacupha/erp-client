import dayjs from 'dayjs/esm';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IPaymentInvoice } from 'app/entities/payment-invoice/payment-invoice.model';
import { IDeliveryNote } from 'app/entities/delivery-note/delivery-note.model';
import { IJobSheet } from 'app/entities/job-sheet/job-sheet.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PaymentStatus } from 'app/entities/enumerations/payment-status.model';

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
