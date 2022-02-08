import * as dayjs from 'dayjs';
import { ISettlementCurrency } from 'app/erp/erp-common/models/settlement-currency.model';
import { IPlaceholder } from './placeholder.model';
import { IDealer } from './dealer.model';

export interface IPurchaseOrder {
  id?: number;
  purchaseOrderNumber?: string;
  purchaseOrderDate?: dayjs.Dayjs | null;
  purchaseOrderAmount?: number | null;
  description?: string | null;
  notes?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  settlementCurrency?: ISettlementCurrency | null;
  placeholders?: IPlaceholder[] | null;
  signatories?: IDealer[] | null;
  vendor?: IDealer;
}

export class PurchaseOrder implements IPurchaseOrder {
  constructor(
    public id?: number,
    public purchaseOrderNumber?: string,
    public purchaseOrderDate?: dayjs.Dayjs | null,
    public purchaseOrderAmount?: number | null,
    public description?: string | null,
    public notes?: string | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public settlementCurrency?: ISettlementCurrency | null,
    public placeholders?: IPlaceholder[] | null,
    public signatories?: IDealer[] | null,
    public vendor?: IDealer
  ) {}
}

export function getPurchaseOrderIdentifier(purchaseOrder: IPurchaseOrder): number | undefined {
  return purchaseOrder.id;
}
