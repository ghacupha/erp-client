import dayjs from 'dayjs/esm';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';

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
