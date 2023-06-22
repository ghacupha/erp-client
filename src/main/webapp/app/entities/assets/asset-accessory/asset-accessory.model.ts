///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
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

import { IAssetWarranty } from 'app/entities/assets/asset-warranty/asset-warranty.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IPaymentInvoice } from 'app/entities/settlement/payment-invoice/payment-invoice.model';
import { IServiceOutlet } from 'app/entities/data/service-outlet/service-outlet.model';
import { ISettlement } from 'app/entities/settlement/settlement/settlement.model';
import { IAssetCategory } from 'app/entities/assets/asset-category/asset-category.model';
import { IPurchaseOrder } from 'app/entities/settlement/purchase-order/purchase-order.model';
import { IDeliveryNote } from 'app/entities/settlement/delivery-note/delivery-note.model';
import { IJobSheet } from 'app/entities/settlement/job-sheet/job-sheet.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';

export interface IAssetAccessory {
  id: number;
  assetTag?: string | null;
  assetDetails?: string | null;
  comments?: string | null;
  commentsContentType?: string | null;
  modelNumber?: string | null;
  serialNumber?: string | null;
  assetWarranties?: Pick<IAssetWarranty, 'id' | 'description'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  paymentInvoices?: Pick<IPaymentInvoice, 'id' | 'invoiceNumber'>[] | null;
  serviceOutlet?: Pick<IServiceOutlet, 'id' | 'outletCode'> | null;
  settlements?: Pick<ISettlement, 'id' | 'paymentNumber'>[] | null;
  assetCategory?: Pick<IAssetCategory, 'id' | 'assetCategoryName'> | null;
  purchaseOrders?: Pick<IPurchaseOrder, 'id' | 'purchaseOrderNumber'>[] | null;
  deliveryNotes?: Pick<IDeliveryNote, 'id' | 'deliveryNoteNumber'>[] | null;
  jobSheets?: Pick<IJobSheet, 'id' | 'serialNumber'>[] | null;
  dealer?: Pick<IDealer, 'id' | 'dealerName'> | null;
  designatedUsers?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
  universallyUniqueMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
}

export type NewAssetAccessory = Omit<IAssetAccessory, 'id'> & { id: null };
