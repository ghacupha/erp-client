import { IAssetRegistration } from '../asset-registration/asset-registration.model';
import { IAssetCategory } from '../asset-category/asset-category.model';
import { IJobSheet } from '../../erp-settlements/job-sheet/job-sheet.model';
import { ISettlementCurrency } from '../../erp-settlements/settlement-currency/settlement-currency.model';
import { IDeliveryNote } from '../../erp-settlements/delivery-note/delivery-note.model';
import { IPaymentInvoice } from '../../erp-settlements/payment-invoice/payment-invoice.model';
import { IAssetWarranty } from '../asset-warranty/asset-warranty.model';
import { IServiceOutlet } from '../../erp-granular/service-outlet/service-outlet.model';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IBusinessDocument } from '../../erp-pages/business-document/business-document.model';
import { IPurchaseOrder } from '../../erp-settlements/purchase-order/purchase-order.model';
import { ISettlement } from '../../erp-settlements/settlement/settlement.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

export interface IAssetAccessory {
  id?: number;
  assetTag?: string | null;
  assetDetails?: string | null;
  commentsContentType?: string | null;
  comments?: string | null;
  modelNumber?: string | null;
  serialNumber?: string | null;
  assetRegistration?: IAssetRegistration | null;
  assetWarranties?: IAssetWarranty[] | null;
  placeholders?: IPlaceholder[] | null;
  paymentInvoices?: IPaymentInvoice[] | null;
  serviceOutlets?: IServiceOutlet[];
  settlements?: ISettlement[];
  assetCategory?: IAssetCategory;
  purchaseOrders?: IPurchaseOrder[] | null;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
  dealer?: IDealer;
  designatedUsers?: IDealer[] | null;
  settlementCurrency?: ISettlementCurrency | null;
  businessDocuments?: IBusinessDocument[] | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
}

export class AssetAccessory implements IAssetAccessory {
  constructor(
    public id?: number,
    public assetTag?: string | null,
    public assetDetails?: string | null,
    public commentsContentType?: string | null,
    public comments?: string | null,
    public modelNumber?: string | null,
    public serialNumber?: string | null,
    public assetRegistration?: IAssetRegistration | null,
    public assetWarranties?: IAssetWarranty[] | null,
    public placeholders?: IPlaceholder[] | null,
    public paymentInvoices?: IPaymentInvoice[] | null,
    public serviceOutlets?: IServiceOutlet[],
    public settlements?: ISettlement[],
    public assetCategory?: IAssetCategory,
    public purchaseOrders?: IPurchaseOrder[] | null,
    public deliveryNotes?: IDeliveryNote[] | null,
    public jobSheets?: IJobSheet[] | null,
    public dealer?: IDealer,
    public designatedUsers?: IDealer[] | null,
    public settlementCurrency?: ISettlementCurrency | null,
    public businessDocuments?: IBusinessDocument[] | null,
    public universallyUniqueMappings?: IUniversallyUniqueMapping[] | null
  ) {}
}

export function getAssetAccessoryIdentifier(assetAccessory: IAssetAccessory): number | undefined {
  return assetAccessory.id;
}
