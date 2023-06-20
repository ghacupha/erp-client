import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IPaymentInvoice } from 'app/entities/payment-invoice/payment-invoice.model';
import { IServiceOutlet } from 'app/entities/service-outlet/service-outlet.model';
import { ISettlement } from 'app/entities/settlement/settlement.model';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { IDeliveryNote } from 'app/entities/delivery-note/delivery-note.model';
import { IJobSheet } from 'app/entities/job-sheet/job-sheet.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { IWorkProjectRegister } from 'app/entities/work-project-register/work-project-register.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { IAssetAccessory } from 'app/entities/asset-accessory/asset-accessory.model';
import { IAssetWarranty } from 'app/entities/asset-warranty/asset-warranty.model';

export interface IWorkInProgressRegistration {
  id: number;
  sequenceNumber?: string | null;
  particulars?: string | null;
  instalmentAmount?: number | null;
  comments?: string | null;
  commentsContentType?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  paymentInvoices?: Pick<IPaymentInvoice, 'id' | 'invoiceNumber'>[] | null;
  serviceOutlets?: Pick<IServiceOutlet, 'id' | 'outletCode'>[] | null;
  settlements?: Pick<ISettlement, 'id' | 'paymentNumber'>[] | null;
  purchaseOrders?: Pick<IPurchaseOrder, 'id' | 'purchaseOrderNumber'>[] | null;
  deliveryNotes?: Pick<IDeliveryNote, 'id' | 'deliveryNoteNumber'>[] | null;
  jobSheets?: Pick<IJobSheet, 'id' | 'serialNumber'>[] | null;
  dealer?: Pick<IDealer, 'id' | 'dealerName'> | null;
  workInProgressGroup?: Pick<IWorkInProgressRegistration, 'id' | 'sequenceNumber'> | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  workProjectRegister?: Pick<IWorkProjectRegister, 'id' | 'catalogueNumber'> | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
  assetAccessories?: Pick<IAssetAccessory, 'id' | 'assetDetails'>[] | null;
  assetWarranties?: Pick<IAssetWarranty, 'id' | 'description'>[] | null;
}

export type NewWorkInProgressRegistration = Omit<IWorkInProgressRegistration, 'id'> & { id: null };
