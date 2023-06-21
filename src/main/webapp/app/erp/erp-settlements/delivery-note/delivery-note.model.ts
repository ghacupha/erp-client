import dayjs from 'dayjs/esm';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IBusinessDocument } from '../../erp-pages/business-document/business-document.model';
import { IPurchaseOrder } from '../purchase-order/purchase-order.model';
import { IBusinessStamp } from '../business-stamp/business-stamp.model';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';

export interface IDeliveryNote {
  id: number;
  deliveryNoteNumber?: string | null;
  documentDate?: dayjs.Dayjs | null;
  description?: string | null;
  serialNumber?: string | null;
  quantity?: number | null;
  remarks?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  receivedBy?: Pick<IDealer, 'id' | 'dealerName'> | null;
  deliveryStamps?: Pick<IBusinessStamp, 'id' | 'details'>[] | null;
  purchaseOrder?: Pick<IPurchaseOrder, 'id' | 'purchaseOrderNumber'> | null;
  supplier?: Pick<IDealer, 'id' | 'dealerName'> | null;
  signatories?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  otherPurchaseOrders?: Pick<IPurchaseOrder, 'id' | 'purchaseOrderNumber'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewDeliveryNote = Omit<IDeliveryNote, 'id'> & { id: null };
