import * as dayjs from 'dayjs';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IBusinessStamp } from 'app/entities/business-stamp/business-stamp.model';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';

export interface IDeliveryNote {
  id?: number;
  deliveryNoteNumber?: string;
  documentDate?: dayjs.Dayjs;
  description?: string | null;
  serialNumber?: string | null;
  quantity?: number | null;
  remarks?: string | null;
  placeholders?: IPlaceholder[] | null;
  receivedBy?: IDealer;
  deliveryStamps?: IBusinessStamp[] | null;
  purchaseOrder?: IPurchaseOrder | null;
  supplier?: IDealer;
  signatories?: IDealer[] | null;
  otherPurchaseOrders?: IPurchaseOrder[] | null;
}

export class DeliveryNote implements IDeliveryNote {
  constructor(
    public id?: number,
    public deliveryNoteNumber?: string,
    public documentDate?: dayjs.Dayjs,
    public description?: string | null,
    public serialNumber?: string | null,
    public quantity?: number | null,
    public remarks?: string | null,
    public placeholders?: IPlaceholder[] | null,
    public receivedBy?: IDealer,
    public deliveryStamps?: IBusinessStamp[] | null,
    public purchaseOrder?: IPurchaseOrder | null,
    public supplier?: IDealer,
    public signatories?: IDealer[] | null,
    public otherPurchaseOrders?: IPurchaseOrder[] | null
  ) {}
}

export function getDeliveryNoteIdentifier(deliveryNote: IDeliveryNote): number | undefined {
  return deliveryNote.id;
}
