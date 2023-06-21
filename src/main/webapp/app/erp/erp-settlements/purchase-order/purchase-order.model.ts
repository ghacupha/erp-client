import dayjs from 'dayjs/esm';
import { ISettlementCurrency } from '../settlement-currency/settlement-currency.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IBusinessDocument } from '../../erp-pages/business-document/business-document.model';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';

export interface IPurchaseOrder {
  id: number;
  purchaseOrderNumber?: string | null;
  purchaseOrderDate?: dayjs.Dayjs | null;
  purchaseOrderAmount?: number | null;
  description?: string | null;
  notes?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  signatories?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  vendor?: Pick<IDealer, 'id' | 'dealerName'> | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewPurchaseOrder = Omit<IPurchaseOrder, 'id'> & { id: null };
