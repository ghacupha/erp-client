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

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'asset-accessory',
        data: { pageTitle: 'AssetAccessories' },
        loadChildren: () => import('./assets/asset-accessory/asset-accessory.module').then(m => m.AssetAccessoryModule),
      },
      {
        path: 'fixed-asset-acquisition',
        data: { pageTitle: 'FixedAssetAcquisitions' },
        loadChildren: () =>
          import('./assets/fixed-asset-acquisition/fixed-asset-acquisition.module').then(m => m.ErpServiceFixedAssetAcquisitionModule),
      },
      {
        path: 'fixed-asset-net-book-value',
        data: { pageTitle: 'FixedAssetNetBookValues' },
        loadChildren: () =>
          import('./assets/fixed-asset-net-book-value/fixed-asset-net-book-value.module').then(
            m => m.ErpServiceFixedAssetNetBookValueModule
          ),
      },
      {
        path: 'fixed-asset-depreciation',
        data: { pageTitle: 'FixedAssetDepreciations' },
        loadChildren: () =>
          import('./assets/fixed-asset-depreciation/fixed-asset-depreciation.module').then(m => m.ErpServiceFixedAssetDepreciationModule),
      },
      {
        path: 'file-type',
        data: { pageTitle: 'FileTypes' },
        loadChildren: () => import('./files/file-type/file-type.module').then(m => m.ErpServiceFileTypeModule),
      },
      {
        path: 'file-upload',
        data: { pageTitle: 'FileUploads' },
        loadChildren: () => import('./files/file-upload/file-upload.module').then(m => m.ErpServiceFileUploadModule),
      },
      {
        path: 'message-token',
        data: { pageTitle: 'MessageTokens' },
        loadChildren: () => import('./system/message-token/message-token.module').then(m => m.ErpServiceMessageTokenModule),
      },
      {
        path: 'invoice',
        data: { pageTitle: 'Invoices' },
        loadChildren: () => import('./settlement/invoice/invoice.module').then(m => m.ErpServiceInvoiceModule),
      },
      {
        path: 'payment',
        data: { pageTitle: 'Payments' },
        loadChildren: () => import('./settlement/payment/payment.module').then(m => m.ErpServicePaymentModule),
      },
      {
        path: 'dealer',
        data: { pageTitle: 'Dealers' },
        loadChildren: () => import('./people/dealer/dealer.module').then(m => m.ErpServiceDealerModule),
      },
      {
        path: 'payment-calculation',
        data: { pageTitle: 'PaymentCalculations' },
        loadChildren: () =>
          import('./settlement/payment-calculation/payment-calculation.module').then(m => m.ErpServicePaymentCalculationModule),
      },
      {
        path: 'payment-requisition',
        data: { pageTitle: 'PaymentRequisitions' },
        loadChildren: () =>
          import('./settlement/payment-requisition/payment-requisition.module').then(m => m.ErpServicePaymentRequisitionModule),
      },
      {
        path: 'tax-reference',
        data: { pageTitle: 'TaxReferences' },
        loadChildren: () => import('./tax/tax-reference/tax-reference.module').then(m => m.ErpServiceTaxReferenceModule),
      },
      {
        path: 'tax-rule',
        data: { pageTitle: 'TaxRules' },
        loadChildren: () => import('./tax/tax-rule/tax-rule.module').then(m => m.ErpServiceTaxRuleModule),
      },
      {
        path: 'payment-category',
        data: { pageTitle: 'PaymentCategories' },
        loadChildren: () => import('./settlement/payment-category/payment-category.module').then(m => m.ErpServicePaymentCategoryModule),
      },
      {
        path: 'placeholder',
        data: { pageTitle: 'Placeholders' },
        loadChildren: () => import('./system/placeholder/placeholder.module').then(m => m.ErpServicePlaceholderModule),
      },
      {
        path: 'payment-label',
        data: { pageTitle: 'PaymentLabels' },
        loadChildren: () => import('./settlement/payment-label/payment-label.module').then(m => m.PaymentLabelModule),
      },
      {
        path: 'signed-payment',
        data: { pageTitle: 'SignedPayments' },
        loadChildren: () => import('./settlement/signed-payment/signed-payment.module').then(m => m.SignedPaymentModule),
      },
      {
        path: 'settlement-currency',
        data: { pageTitle: 'SettlementCurrencies' },
        loadChildren: () => import('./settlement/settlement-currency/settlement-currency.module').then(m => m.SettlementCurrencyModule),
      },
      {
        path: 'purchase-order',
        data: { pageTitle: 'PurchaseOrders' },
        loadChildren: () => import('./settlement/purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
      },
      {
        path: 'payment-invoice',
        data: { pageTitle: 'PaymentInvoices' },
        loadChildren: () => import('./settlement/payment-invoice/payment-invoice.module').then(m => m.PaymentInvoiceModule),
      },
      {
        path: 'settlement',
        data: { pageTitle: 'Settlements' },
        loadChildren: () => import('./settlement/settlement/settlement.module').then(m => m.SettlementModule),
      },
      {
        path: 'agency-notice',
        data: { pageTitle: 'AgencyNotices' },
        loadChildren: () => import('./tax/agency-notice/agency-notice.module').then(m => m.AgencyNoticeModule),
      },
      {
        path: 'depreciation-method',
        data: { pageTitle: 'DepreciationMethods' },
        loadChildren: () => import('./assets/depreciation-method/depreciation-method.module').then(m => m.DepreciationMethodModule),
      },
      {
        path: 'asset-category',
        data: { pageTitle: 'AssetCategories' },
        loadChildren: () => import('./assets/asset-category/asset-category.module').then(m => m.AssetCategoryModule),
      },
      {
        path: 'bank-branch-code',
        data: { pageTitle: 'BankBranchCodes' },
        loadChildren: () => import('./data/bank-branch-code/bank-branch-code.module').then(m => m.BankBranchCodeModule),
      },
      {
        path: 'outlet-status',
        data: { pageTitle: 'OutletStatuses' },
        loadChildren: () => import('./data/outlet-status/outlet-status.module').then(m => m.OutletStatusModule),
      },
      {
        path: 'outlet-type',
        data: { pageTitle: 'OutletTypes' },
        loadChildren: () => import('./data/outlet-type/outlet-type.module').then(m => m.OutletTypeModule),
      },
      {
        path: 'county-code',
        data: { pageTitle: 'CountyCodes' },
        loadChildren: () => import('./data/county-code/county-code.module').then(m => m.CountyCodeModule),
      },
      {
        path: 'service-outlet',
        data: { pageTitle: 'ServiceOutlets' },
        loadChildren: () => import('./data/service-outlet/service-outlet.module').then(m => m.ServiceOutletModule),
      },
      {
        path: 'business-stamp',
        data: { pageTitle: 'BusinessStamps' },
        loadChildren: () => import('./settlement/business-stamp/business-stamp.module').then(m => m.BusinessStampModule),
      },
      {
        path: 'delivery-note',
        data: { pageTitle: 'DeliveryNotes' },
        loadChildren: () => import('./settlement/delivery-note/delivery-note.module').then(m => m.DeliveryNoteModule),
      },
      {
        path: 'job-sheet',
        data: { pageTitle: 'JobSheets' },
        loadChildren: () => import('./settlement/job-sheet/job-sheet.module').then(m => m.JobSheetModule),
      },
      {
        path: 'credit-note',
        data: { pageTitle: 'CreditNotes' },
        loadChildren: () => import('./settlement/credit-note/credit-note.module').then(m => m.CreditNoteModule),
      },
      {
        path: 'customer-id-document-type',
        data: { pageTitle: 'CustomerIDDocumentTypes' },
        loadChildren: () =>
          import('./data/customer-id-document-type/customer-id-document-type.module').then(m => m.CustomerIDDocumentTypeModule),
      },
      {
        path: 'institution-code',
        data: { pageTitle: 'InstitutionCodes' },
        loadChildren: () => import('./data/institution-code/institution-code.module').then(m => m.InstitutionCodeModule),
      },
      {
        path: 'mfb-branch-code',
        data: { pageTitle: 'MfbBranchCodes' },
        loadChildren: () => import('./data/mfb-branch-code/mfb-branch-code.module').then(m => m.MfbBranchCodeModule),
      },
      {
        path: 'iso-country-code',
        data: { pageTitle: 'IsoCountryCodes' },
        loadChildren: () => import('./data/iso-country-code/iso-country-code.module').then(m => m.IsoCountryCodeModule),
      },
      {
        path: 'sub-county-code',
        data: { pageTitle: 'SubCountyCodes' },
        loadChildren: () => import('./data/sub-county-code/sub-county-code.module').then(m => m.SubCountyCodeModule),
      },
      {
        path: 'asset-registration',
        data: { pageTitle: 'AssetRegistrations' },
        loadChildren: () => import('./assets/asset-registration/asset-registration.module').then(m => m.AssetRegistrationModule),
      },
      {
        path: 'work-in-progress-registration',
        data: { pageTitle: 'WorkInProgressRegistrations' },
        loadChildren: () =>
          import('./assets/work-in-progress-registration/work-in-progress-registration.module').then(m => m.WorkInProgressRegistrationModule),
      },
      {
        path: 'work-in-progress-transfer',
        data: { pageTitle: 'WorkInProgressTransfers' },
        loadChildren: () =>
          import('./assets/work-in-progress-transfer/work-in-progress-transfer.module').then(m => m.WorkInProgressTransferModule),
      },
      {
        path: 'work-project-register',
        data: { pageTitle: 'WorkProjectRegisters' },
        loadChildren: () => import('./assets/work-project-register/work-project-register.module').then(m => m.WorkProjectRegisterModule),
      },
      {
        path: 'transaction-account',
        data: { pageTitle: 'TransactionAccounts' },
        loadChildren: () => import('./accounting/transaction-account/transaction-account.module').then(m => m.TransactionAccountModule),
      },
      {
        path: 'prepayment-account',
        data: { pageTitle: 'PrepaymentAccounts' },
        loadChildren: () => import('./prepayments/prepayment-account/prepayment-account.module').then(m => m.PrepaymentAccountModule),
      },
      {
        path: 'prepayment-marshalling',
        data: { pageTitle: 'PrepaymentMarshallings' },
        loadChildren: () => import('./prepayments/prepayment-marshalling/prepayment-marshalling.module').then(m => m.PrepaymentMarshallingModule),
      },
      {
        path: 'prepayment-amortization',
        data: { pageTitle: 'PrepaymentAmortizations' },
        loadChildren: () => import('./prepayments/prepayment-amortization/prepayment-amortization.module').then(m => m.PrepaymentAmortizationModule),
      },
      {
        path: 'report-template',
        data: { pageTitle: 'ReportTemplates' },
        loadChildren: () => import('./reports/report-template/report-template.module').then(m => m.ReportTemplateModule),
      },
      {
        path: 'pdf-report-requisition',
        data: { pageTitle: 'PdfReportRequisitions' },
        loadChildren: () => import('./reports/pdf-report-requisition/pdf-report-requisition.module').then(m => m.PdfReportRequisitionModule),
      },
      {
        path: 'xlsx-report-requisition',
        data: { pageTitle: 'XlsxReportRequisitions' },
        loadChildren: () => import('./reports/xlsx-report-requisition/xlsx-report-requisition.module').then(m => m.XlsxReportRequisitionModule),
      },
      {
        path: 'universally-unique-mapping',
        data: { pageTitle: 'UniversallyUniqueMappings' },
        loadChildren: () =>
          import('./system/universally-unique-mapping/universally-unique-mapping.module').then(m => m.UniversallyUniqueMappingModule),
      },
      {
        path: 'report-requisition',
        data: { pageTitle: 'ReportRequisitions' },
        loadChildren: () => import('./reports/report-requisition/report-requisition.module').then(m => m.ReportRequisitionModule),
      },
      {
        path: 'system-content-type',
        data: { pageTitle: 'SystemContentTypes' },
        loadChildren: () => import('./system/system-content-type/system-content-type.module').then(m => m.SystemContentTypeModule),
      },
      {
        path: 'report-content-type',
        data: { pageTitle: 'ReportContentTypes' },
        loadChildren: () => import('./reports/report-content-type/report-content-type.module').then(m => m.ReportContentTypeModule),
      },
      {
        path: 'excel-report-export',
        data: { pageTitle: 'ExcelReportExports' },
        loadChildren: () => import('./reports/excel-report-export/excel-report-export.module').then(m => m.ExcelReportExportModule),
      },
      {
        path: 'process-status',
        data: { pageTitle: 'ProcessStatuses' },
        loadChildren: () => import('./system/process-status/process-status.module').then(m => m.ProcessStatusModule),
      },
      {
        path: 'report-status',
        data: { pageTitle: 'ReportStatuses' },
        loadChildren: () => import('./reports/report-status/report-status.module').then(m => m.ReportStatusModule),
      },
      {
        path: 'algorithm',
        data: { pageTitle: 'Algorithms' },
        loadChildren: () => import('./system/algorithm/algorithm.module').then(m => m.AlgorithmModule),
      },
      {
        path: 'security-clearance',
        data: { pageTitle: 'SecurityClearances' },
        loadChildren: () => import('./people/security-clearance/security-clearance.module').then(m => m.SecurityClearanceModule),
      },
      {
        path: 'application-user',
        data: { pageTitle: 'ApplicationUsers' },
        loadChildren: () => import('./people/application-user/application-user.module').then(m => m.ApplicationUserModule),
      },
      {
        path: 'report-design',
        data: { pageTitle: 'ReportDesigns' },
        loadChildren: () => import('./reports/report-design/report-design.module').then(m => m.ReportDesignModule),
      },
      {
        path: 'system-module',
        data: { pageTitle: 'SystemModules' },
        loadChildren: () => import('./system/system-module/system-module.module').then(m => m.SystemModuleModule),
      },
      {
        path: 'prepayment-mapping',
        data: { pageTitle: 'PrepaymentMappings' },
        loadChildren: () => import('./prepayments/prepayment-mapping/prepayment-mapping.module').then(m => m.PrepaymentMappingModule),
      },
      {
        path: 'amortization-recurrence',
        data: { pageTitle: 'AmortizationRecurrences' },
        loadChildren: () => import('./prepayments/amortization-recurrence/amortization-recurrence.module').then(m => m.AmortizationRecurrenceModule),
      },
      {
        path: 'amortization-sequence',
        data: { pageTitle: 'AmortizationSequences' },
        loadChildren: () => import('./prepayments/amortization-sequence/amortization-sequence.module').then(m => m.AmortizationSequenceModule),
      },
      {
        path: 'question-base',
        data: { pageTitle: 'QuestionBases' },
        loadChildren: () => import('./system/question-base/question-base.module').then(m => m.QuestionBaseModule),
      },
      {
        path: 'business-document',
        data: { pageTitle: 'BusinessDocuments' },
        loadChildren: () => import('./documentation/business-document/business-document.module').then(m => m.BusinessDocumentModule),
      },
      {
        path: 'settlement-requisition',
        data: { pageTitle: 'SettlementRequisitions' },
        loadChildren: () => import('./settlement/settlement-requisition/settlement-requisition.module').then(m => m.SettlementRequisitionModule),
      },
      {
        path: 'string-question-base',
        data: { pageTitle: 'StringQuestionBases' },
        loadChildren: () => import('./system/string-question-base/string-question-base.module').then(m => m.StringQuestionBaseModule),
      },
      {
        path: 'lease-contract',
        data: { pageTitle: 'LeaseContracts' },
        loadChildren: () => import('./leases/lease-contract/lease-contract.module').then(m => m.LeaseContractModule),
      },
      {
        path: 'contract-metadata',
        data: { pageTitle: 'ContractMetadata' },
        loadChildren: () => import('./contract/contract-metadata/contract-metadata.module').then(m => m.ContractMetadataModule),
      },
      {
        path: 'lease-model-metadata',
        data: { pageTitle: 'LeaseModelMetadata' },
        loadChildren: () => import('./leases/lease-model-metadata/lease-model-metadata.module').then(m => m.LeaseModelMetadataModule),
      },
      {
        path: 'lease-liability-schedule-item',
        data: { pageTitle: 'LeaseLiabilityScheduleItems' },
        loadChildren: () =>
          import('./leases/lease-liability-schedule-item/lease-liability-schedule-item.module').then(m => m.LeaseLiabilityScheduleItemModule),
      },
      {
        path: 'asset-warranty',
        data: { pageTitle: 'AssetWarranties' },
        loadChildren: () => import('./assets/asset-warranty/asset-warranty.module').then(m => m.AssetWarrantyModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
