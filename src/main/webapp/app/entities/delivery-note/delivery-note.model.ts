///
/// Erp System - Mark II No 20 (Baruch Series) Client v 0.0.9-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
