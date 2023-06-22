import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { IBusinessStamp } from 'app/entities/settlement/business-stamp/business-stamp.model';
import { IPurchaseOrder } from 'app/entities/settlement/purchase-order/purchase-order.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';

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
