import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { IPaymentCategory } from 'app/entities/payments/payment-category/payment-category.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IPaymentInvoice } from 'app/entities/payment-invoice/payment-invoice.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';

export interface ISettlement {
  id: number;
  paymentNumber?: string | null;
  paymentDate?: dayjs.Dayjs | null;
  paymentAmount?: number | null;
  description?: string | null;
  notes?: string | null;
  calculationFile?: string | null;
  calculationFileContentType?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  paymentCategory?: Pick<IPaymentCategory, 'id' | 'categoryName'> | null;
  groupSettlement?: Pick<ISettlement, 'id'> | null;
  biller?: Pick<IDealer, 'id' | 'dealerName'> | null;
  paymentInvoices?: Pick<IPaymentInvoice, 'id' | 'invoiceNumber'>[] | null;
  signatories?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewSettlement = Omit<ISettlement, 'id'> & { id: null };
