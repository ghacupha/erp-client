///
/// Erp System - Mark III No 15 (Caleb Series) Client 1.3.4
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

import { IAssetRegistration } from 'app/entities/asset-registration/asset-registration.model';
import { IAssetWarranty } from 'app/entities/asset-warranty/asset-warranty.model';
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
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';

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
