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
  id?: number;
  assetNumber?: string;
  assetTag?: string;
  assetDetails?: string | null;
  assetCost?: number;
  commentsContentType?: string | null;
  comments?: string | null;
  modelNumber?: string | null;
  serialNumber?: string | null;
  placeholders?: IPlaceholder[] | null;
  paymentInvoices?: IPaymentInvoice[] | null;
  mainServiceOutlet?: IServiceOutlet | null;
  settlements?: ISettlement[];
  assetCategory?: IAssetCategory;
  purchaseOrders?: IPurchaseOrder[] | null;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
  dealer?: IDealer;
  designatedUsers?: IDealer[] | null;
  settlementCurrency?: ISettlementCurrency | null;
  businessDocuments?: IBusinessDocument[] | null;
  assetWarranties?: IAssetWarranty[] | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
  assetAccessories?: IAssetAccessory[] | null;
  serviceOutlets?: IServiceOutlet[] | null;
}

export class AssetRegistration implements IAssetRegistration {
  constructor(
    public id?: number,
    public assetNumber?: string,
    public assetTag?: string,
    public assetDetails?: string | null,
    public assetCost?: number,
    public commentsContentType?: string | null,
    public comments?: string | null,
    public modelNumber?: string | null,
    public serialNumber?: string | null,
    public placeholders?: IPlaceholder[] | null,
    public paymentInvoices?: IPaymentInvoice[] | null,
    public mainServiceOutlet?: IServiceOutlet | null,
    public settlements?: ISettlement[],
    public assetCategory?: IAssetCategory,
    public purchaseOrders?: IPurchaseOrder[] | null,
    public deliveryNotes?: IDeliveryNote[] | null,
    public jobSheets?: IJobSheet[] | null,
    public dealer?: IDealer,
    public designatedUsers?: IDealer[] | null,
    public settlementCurrency?: ISettlementCurrency | null,
    public businessDocuments?: IBusinessDocument[] | null,
    public assetWarranties?: IAssetWarranty[] | null,
    public universallyUniqueMappings?: IUniversallyUniqueMapping[] | null,
    public assetAccessories?: IAssetAccessory[] | null,
    public serviceOutlets?: IServiceOutlet[] | null
  ) {}
}

export function getAssetRegistrationIdentifier(assetRegistration: IAssetRegistration): number | undefined {
  return assetRegistration.id;
}
