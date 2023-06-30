///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.4
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { M21DealerFormControlComponent } from './dealer-form-controls/m21-dealer-form-control.component';
import { ErpFormattingModule } from '../pipe/erp-formatting.module';
import { OptionViewsModule } from '../option-view-components/option-views.module';
import { M2MDealerFormControlComponent } from './dealer-form-controls/m2m-dealer-form-control.component';
import { M2MPlaceholderFormComponent } from './placeholder-components/m2m-placeholder-form-component';
import { M2MSettlementFormControlComponent } from './settlement-form-components/m2m-settlement-form-control.component';
import { M21SettlementFormControlComponent } from './settlement-form-components/m21-settlement-form-control.component';
import { M21SettlementCurrencyFormControlComponent } from './settlement-currency-form-components/m21-settlement-currency-form-control.component';
import { M2MSettlementCurrencyFormControlComponent } from './settlement-currency-form-components/m2m-settlement-currency-form-control.component';
import { M21PaymentCategoryControlComponent } from './payment-category-form-components/m21-payment-category-control.component';
import { M2MPaymentInvoiceFormControlComponent } from './payment-invoice-control-form-components/m2m-payment-invoice-form-control.component';
import { M21PaymentInvoiceFormControlComponent } from './payment-invoice-control-form-components/m21-payment-invoice-form-control.component';
import { M21PurchaseOrderFormControlComponent } from './purchase-order-form-control-components/m21-purchase-order-form-control.component';
import { M2MJobSheetFormControlComponent } from './job-sheet-form-components/m2m-job-sheet-form-control.component';
import { M2MDeliveryNoteFormControlComponent } from './delivery-note-form-components/m2m-delivery-note-form-control.component';
import { M21ServiceOutletFormControlComponent } from './service-outlet-form-components/m21-service-outlet-form-control.component';
import { M21TransactionAccountFormControlComponent } from './transaction-account-form-components/m21-transaction-account-form-control.component';
import { M2mUniversallyUniqueMappingFormControlComponent } from './unique-mapping-components/m2m-universally-unique-mapping-form-control.component';
import { M21SecurityClearanceFormControlComponent } from './security-clearance-form-components/m21-security-clearance-form-control.component';
import { M21ApplicationUserFormControlComponent } from './application-user-form-components/m21-application-user-form-control.component';
import { M2mPrepaymentMappingFormControlComponent } from './prepayment-mapping-components/m2m-prepayment-mapping-form-control.component';
import { M21PrepaymentAccountFormControlComponent } from './prepayment-account-form-components/m21-prepayment-account-form-control.component';
import { M21ReportDesignControlComponent } from './report-design-form-components/m21-report-design-control.component';
import { M21AlgorithmFormControlComponent } from './algorithm-form-components/m21-algorithm-form-control.component';
import { M21SystemModuleFormControlComponent } from './system-module-form-components/m21-system-module-form-control.component';
import { M2mPaymentLabelFormControlComponent } from './payment-label-form-components/m2m-payment-label-form-control.component';
import { M2mBusinessDocumentFormControlComponent } from './business-document-components/m2m-business-document-form-control.component';
import { M2mContractMetadataFormControlComponent } from './contract-metadata-form-componets/m2m-contract-metadata-form-control.component';
import { M21ContractMetadataFormControlComponent } from './contract-metadata-form-componets/m21-contract-metadata-form-control.component';
import { M21LeaseContractFormControlComponent } from './lease-contract-form-components/m21-lease-contract-form-control.component';
import { M2mLeaseContractFormControlComponent } from './lease-contract-form-components/m2m-lease-contract-form-control.component';
import { M21LeaseModelMetadataFormControlComponent } from './lease-model-metadata/m21-lease-model-metadata-form-control.component';
import { M2mAssetAccessoryFormComponent } from './asset-accessory-components/m2m-asset-accessory-form-component';
import { M2mAssetWarrantyFormComponent } from './asset-warranty-form-components/m2m-asset-warranty-form-component';
import { M21AssetCategoryFormControlComponent } from './asset-category-form-controls/m21-asset-category-form-control.component';
import { M2mPurchaseOrderFormComponent } from './purchase-order-form-control-components/m2m-purchase-order-form-component';
import { M2mServiceOutletFormControlComponent } from './service-outlet-form-components/m2m-service-outlet-form-control.component';

@NgModule({
  declarations: [
    M21DealerFormControlComponent,
    M2MDealerFormControlComponent,
    M2MPlaceholderFormComponent,
    M2MSettlementFormControlComponent,
    M21SettlementFormControlComponent,
    M21SettlementCurrencyFormControlComponent,
    M2MSettlementCurrencyFormControlComponent,
    M21PaymentCategoryControlComponent,
    M2MPaymentInvoiceFormControlComponent,
    M21PaymentInvoiceFormControlComponent,
    M21PurchaseOrderFormControlComponent,
    M2MJobSheetFormControlComponent,
    M2MDeliveryNoteFormControlComponent,
    M21ServiceOutletFormControlComponent,
    M21TransactionAccountFormControlComponent,
    M2mUniversallyUniqueMappingFormControlComponent,
    M21SecurityClearanceFormControlComponent,
    M21ApplicationUserFormControlComponent,
    M2mPrepaymentMappingFormControlComponent,
    M21PrepaymentAccountFormControlComponent,
    M21ReportDesignControlComponent,
    M21AlgorithmFormControlComponent,
    M21SystemModuleFormControlComponent,
    M2mPaymentLabelFormControlComponent,
    M2mBusinessDocumentFormControlComponent,
    M2mContractMetadataFormControlComponent,
    M21ContractMetadataFormControlComponent,
    M21LeaseContractFormControlComponent,
    M2mLeaseContractFormControlComponent,
    M21LeaseModelMetadataFormControlComponent,
    M2mAssetAccessoryFormComponent,
    M2mAssetWarrantyFormComponent,
    M21AssetCategoryFormControlComponent,
    M2mPurchaseOrderFormComponent,
    M2mServiceOutletFormControlComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ErpFormattingModule,
    OptionViewsModule
  ],
  exports: [
    M21DealerFormControlComponent,
    M2MDealerFormControlComponent,
    M2MPlaceholderFormComponent,
    M2MSettlementFormControlComponent,
    M21SettlementFormControlComponent,
    M21SettlementCurrencyFormControlComponent,
    M2MSettlementCurrencyFormControlComponent,
    M21PaymentCategoryControlComponent,
    M2MPaymentInvoiceFormControlComponent,
    M21PaymentInvoiceFormControlComponent,
    M21PurchaseOrderFormControlComponent,
    M2MJobSheetFormControlComponent,
    M2MDeliveryNoteFormControlComponent,
    M21ServiceOutletFormControlComponent,
    M21TransactionAccountFormControlComponent,
    M2mUniversallyUniqueMappingFormControlComponent,
    M21SecurityClearanceFormControlComponent,
    M21ApplicationUserFormControlComponent,
    M2mPrepaymentMappingFormControlComponent,
    M21PrepaymentAccountFormControlComponent,
    M21ReportDesignControlComponent,
    M21AlgorithmFormControlComponent,
    M21SystemModuleFormControlComponent,
    M2mPaymentLabelFormControlComponent,
    M2mBusinessDocumentFormControlComponent,
    M2mContractMetadataFormControlComponent,
    M21ContractMetadataFormControlComponent,
    M21LeaseContractFormControlComponent,
    M2mLeaseContractFormControlComponent,
    M21LeaseModelMetadataFormControlComponent,
    M2mAssetAccessoryFormComponent,
    M2mAssetWarrantyFormComponent,
    M21AssetCategoryFormControlComponent,
    M2mPurchaseOrderFormComponent,
    M2mServiceOutletFormControlComponent,
  ]
})
export class FormComponentsModule {
}
