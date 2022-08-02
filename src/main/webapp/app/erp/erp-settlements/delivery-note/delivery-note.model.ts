import * as dayjs from 'dayjs';
import { IPlaceholder } from '../../erp-common/models/placeholder.model';
import { IBusinessStamp } from '../business-stamp/business-stamp.model';
import { IDealer } from '../../erp-common/models/dealer.model';
import { IPurchaseOrder } from '../purchase-order/purchase-order.model';

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
    public signatories?: IDealer[] | null
  ) {}
}

export function getDeliveryNoteIdentifier(deliveryNote: IDeliveryNote): number | undefined {
  return deliveryNote.id;
}
