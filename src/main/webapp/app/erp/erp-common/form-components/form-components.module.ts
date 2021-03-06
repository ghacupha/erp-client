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
  ]
})
export class FormComponentsModule {
}
