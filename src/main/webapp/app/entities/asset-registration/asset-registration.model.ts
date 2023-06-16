import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IPaymentInvoice } from 'app/entities/payment-invoice/payment-invoice.model';
import { IServiceOutlet } from 'app/entities/service-outlet/service-outlet.model';
import { ISettlement } from 'app/entities/settlement/settlement.model';
import { IAssetCategory } from 'app/entities/asset-category/asset-category.model';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { IDeliveryNote } from 'app/entities/delivery-note/delivery-note.model';
import { IJobSheet } from 'app/entities/job-sheet/job-sheet.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { IAssetWarranty } from 'app/entities/asset-warranty/asset-warranty.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { IAssetAccessory } from 'app/entities/asset-accessory/asset-accessory.model';

export interface IAssetRegistration {
  id: number;
  assetNumber?: string | null;
  assetTag?: string | null;
  assetDetails?: string | null;
  assetCost?: number | null;
  comments?: string | null;
  commentsContentType?: string | null;
  modelNumber?: string | null;
  serialNumber?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  paymentInvoices?: Pick<IPaymentInvoice, 'id' | 'invoiceNumber'>[] | null;
  mainServiceOutlet?: Pick<IServiceOutlet, 'id' | 'outletCode'> | null;
  settlements?: Pick<ISettlement, 'id' | 'paymentNumber'>[] | null;
  assetCategory?: Pick<IAssetCategory, 'id' | 'assetCategoryName'> | null;
  purchaseOrders?: Pick<IPurchaseOrder, 'id' | 'purchaseOrderNumber'>[] | null;
  deliveryNotes?: Pick<IDeliveryNote, 'id' | 'deliveryNoteNumber'>[] | null;
  jobSheets?: Pick<IJobSheet, 'id' | 'serialNumber'>[] | null;
  dealer?: Pick<IDealer, 'id' | 'dealerName'> | null;
  designatedUsers?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
  assetWarranties?: Pick<IAssetWarranty, 'id' | 'description'>[] | null;
  universallyUniqueMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  assetAccessories?: Pick<IAssetAccessory, 'id' | 'assetDetails'>[] | null;
  serviceOutlets?: Pick<IServiceOutlet, 'id' | 'outletCode'>[] | null;
}

export type NewAssetRegistration = Omit<IAssetRegistration, 'id'> & { id: null };
