import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IBusinessStamp } from 'app/entities/business-stamp/business-stamp.model';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';

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
