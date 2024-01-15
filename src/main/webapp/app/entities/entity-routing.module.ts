///
/// Erp System - Mark X No 1 (Jehoiada Series) Client 1.7.1
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
        path: 'work-in-progress-outstanding-report',
        data: { pageTitle: 'WorkInProgressOutstandingReports' },
        loadChildren: () =>
          import('./reports/work-in-progress-outstanding-report/work-in-progress-outstanding-report.module').then(
            m => m.WorkInProgressOutstandingReportModule
          ),
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
        loadChildren: () => import('./gdi/settlement-currency/settlement-currency.module').then(m => m.SettlementCurrencyModule),
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
        loadChildren: () => import('./gdi/bank-branch-code/bank-branch-code.module').then(m => m.BankBranchCodeModule),
      },
      {
        path: 'outlet-status',
        data: { pageTitle: 'OutletStatuses' },
        loadChildren: () => import('./gdi/outlet-status/outlet-status.module').then(m => m.OutletStatusModule),
      },
      {
        path: 'outlet-type',
        data: { pageTitle: 'OutletTypes' },
        loadChildren: () => import('./gdi/outlet-type/outlet-type.module').then(m => m.OutletTypeModule),
      },
      {
        path: 'county-code',
        data: { pageTitle: 'CountyCodes' },
        loadChildren: () => import('./gdi/county-code/county-code.module').then(m => m.CountyCodeModule),
      },
      {
        path: 'service-outlet',
        data: { pageTitle: 'ServiceOutlets' },
        loadChildren: () => import('./gdi/service-outlet/service-outlet.module').then(m => m.ServiceOutletModule),
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
          import('./gdi/customer-id-document-type/customer-id-document-type.module').then(m => m.CustomerIDDocumentTypeModule),
      },
      {
        path: 'institution-code',
        data: { pageTitle: 'InstitutionCodes' },
        loadChildren: () => import('./gdi/institution-code/institution-code.module').then(m => m.InstitutionCodeModule),
      },
      {
        path: 'mfb-branch-code',
        data: { pageTitle: 'MfbBranchCodes' },
        loadChildren: () => import('./gdi/mfb-branch-code/mfb-branch-code.module').then(m => m.MfbBranchCodeModule),
      },
      {
        path: 'iso-country-code',
        data: { pageTitle: 'IsoCountryCodes' },
        loadChildren: () => import('./gdi/iso-country-code/iso-country-code.module').then(m => m.IsoCountryCodeModule),
      },
      {
        path: 'sub-county-code',
        data: { pageTitle: 'SubCountyCodes' },
        loadChildren: () => import('./gdi/sub-county-code/sub-county-code.module').then(m => m.SubCountyCodeModule),
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
          import('./assets/work-in-progress-registration/work-in-progress-registration.module').then(
            m => m.WorkInProgressRegistrationModule
          ),
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
        loadChildren: () =>
          import('./prepayments/prepayment-marshalling/prepayment-marshalling.module').then(m => m.PrepaymentMarshallingModule),
      },
      {
        path: 'prepayment-amortization',
        data: { pageTitle: 'PrepaymentAmortizations' },
        loadChildren: () =>
          import('./prepayments/prepayment-amortization/prepayment-amortization.module').then(m => m.PrepaymentAmortizationModule),
      },
      {
        path: 'report-template',
        data: { pageTitle: 'ReportTemplates' },
        loadChildren: () => import('./reports/report-template/report-template.module').then(m => m.ReportTemplateModule),
      },
      {
        path: 'pdf-report-requisition',
        data: { pageTitle: 'PdfReportRequisitions' },
        loadChildren: () =>
          import('./reports/pdf-report-requisition/pdf-report-requisition.module').then(m => m.PdfReportRequisitionModule),
      },
      {
        path: 'xlsx-report-requisition',
        data: { pageTitle: 'XlsxReportRequisitions' },
        loadChildren: () =>
          import('./reports/xlsx-report-requisition/xlsx-report-requisition.module').then(m => m.XlsxReportRequisitionModule),
      },
      {
        path: 'universally-unique-mapping',
        data: { pageTitle: 'UniversallyUniqueMappings' },
        loadChildren: () =>
          import('./gdi/universally-unique-mapping/universally-unique-mapping.module').then(m => m.UniversallyUniqueMappingModule),
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
        loadChildren: () =>
          import('./prepayments/amortization-recurrence/amortization-recurrence.module').then(m => m.AmortizationRecurrenceModule),
      },
      {
        path: 'amortization-sequence',
        data: { pageTitle: 'AmortizationSequences' },
        loadChildren: () =>
          import('./prepayments/amortization-sequence/amortization-sequence.module').then(m => m.AmortizationSequenceModule),
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
        loadChildren: () =>
          import('./settlement/settlement-requisition/settlement-requisition.module').then(m => m.SettlementRequisitionModule),
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
          import('./leases/lease-liability-schedule-item/lease-liability-schedule-item.module').then(
            m => m.LeaseLiabilityScheduleItemModule
          ),
      },
      {
        path: 'asset-accessory',
        data: { pageTitle: 'AssetAccessories' },
        loadChildren: () => import('./assets/asset-accessory/asset-accessory.module').then(m => m.AssetAccessoryModule),
      },
      {
        path: 'asset-warranty',
        data: { pageTitle: 'AssetWarranties' },
        loadChildren: () => import('./assets/asset-warranty/asset-warranty.module').then(m => m.AssetWarrantyModule),
      },
      {
        path: 'depreciation-period',
        data: { pageTitle: 'DepreciationPeriods' },
        loadChildren: () => import('./assets/depreciation-period/depreciation-period.module').then(m => m.DepreciationPeriodModule),
      },
      {
        path: 'depreciation-entry',
        data: { pageTitle: 'DepreciationEntries' },
        loadChildren: () => import('./assets/depreciation-entry/depreciation-entry.module').then(m => m.DepreciationEntryModule),
      },
      {
        path: 'depreciation-job',
        data: { pageTitle: 'DepreciationJobs' },
        loadChildren: () => import('./assets/depreciation-job/depreciation-job.module').then(m => m.DepreciationJobModule),
      },
      {
        path: 'depreciation-batch-sequence',
        data: { pageTitle: 'DepreciationBatchSequences' },
        loadChildren: () =>
          import('./assets/depreciation-batch-sequence/depreciation-batch-sequence.module').then(m => m.DepreciationBatchSequenceModule),
      },
      {
        path: 'fiscal-year',
        data: { pageTitle: 'FiscalYears' },
        loadChildren: () => import('./system/fiscal-year/fiscal-year.module').then(m => m.FiscalYearModule),
      },
      {
        path: 'fiscal-quarter',
        data: { pageTitle: 'FiscalQuarters' },
        loadChildren: () => import('./system/fiscal-quarter/fiscal-quarter.module').then(m => m.FiscalQuarterModule),
      },
      {
        path: 'fiscal-month',
        data: { pageTitle: 'FiscalMonths' },
        loadChildren: () => import('./system/fiscal-month/fiscal-month.module').then(m => m.FiscalMonthModule),
      },
      {
        path: 'depreciation-job-notice',
        data: { pageTitle: 'DepreciationJobNotices' },
        loadChildren: () =>
          import('./assets/depreciation-job-notice/depreciation-job-notice.module').then(m => m.DepreciationJobNoticeModule),
      },
      {
        path: 'customer-type',
        data: { pageTitle: 'CustomerTypes' },
        loadChildren: () => import('./gdi/customer-type/customer-type.module').then(m => m.CustomerTypeModule),
      },
      {
        path: 'legal-status',
        data: { pageTitle: 'LegalStatuses' },
        loadChildren: () => import('./gdi/legal-status/legal-status.module').then(m => m.LegalStatusModule),
      },
      {
        path: 'insider-category-types',
        data: { pageTitle: 'InsiderCategoryTypes' },
        loadChildren: () => import('./gdi/insider-category-types/insider-category-types.module').then(m => m.InsiderCategoryTypesModule),
      },
      {
        path: 'gender-type',
        data: { pageTitle: 'GenderTypes' },
        loadChildren: () => import('./gdi/gender-type/gender-type.module').then(m => m.GenderTypeModule),
      },
      {
        path: 'institution-contact-details',
        data: { pageTitle: 'InstitutionContactDetails' },
        loadChildren: () =>
          import('./gdi/institution-contact-details/institution-contact-details.module').then(m => m.InstitutionContactDetailsModule),
      },
      {
        path: 'isic-economic-activity',
        data: { pageTitle: 'IsicEconomicActivities' },
        loadChildren: () => import('./gdi/isic-economic-activity/isic-economic-activity.module').then(m => m.IsicEconomicActivityModule),
      },
      {
        path: 'institution-status-type',
        data: { pageTitle: 'InstitutionStatusTypes' },
        loadChildren: () => import('./gdi/institution-status-type/institution-status-type.module').then(m => m.InstitutionStatusTypeModule),
      },
      {
        path: 'sna-sector-code',
        data: { pageTitle: 'SnaSectorCodes' },
        loadChildren: () => import('./gdi/sna-sector-code/sna-sector-code.module').then(m => m.SnaSectorCodeModule),
      },
      {
        path: 'business-segment-types',
        data: { pageTitle: 'BusinessSegmentTypes' },
        loadChildren: () => import('./gdi/business-segment-types/business-segment-types.module').then(m => m.BusinessSegmentTypesModule),
      },
      {
        path: 'iso-currency-code',
        data: { pageTitle: 'IsoCurrencyCodes' },
        loadChildren: () => import('./gdi/iso-currency-code/iso-currency-code.module').then(m => m.IsoCurrencyCodeModule),
      },
      {
        path: 'party-relation-type',
        data: { pageTitle: 'PartyRelationTypes' },
        loadChildren: () => import('./gdi/party-relation-type/party-relation-type.module').then(m => m.PartyRelationTypeModule),
      },
      {
        path: 'contract-status',
        data: { pageTitle: 'ContractStatuses' },
        loadChildren: () => import('./gdi/contract-status/contract-status.module').then(m => m.ContractStatusModule),
      },
      {
        path: 'account-type',
        data: { pageTitle: 'AccountTypes' },
        loadChildren: () => import('./gdi/account-type/account-type.module').then(m => m.AccountTypeModule),
      },
      {
        path: 'account-status-type',
        data: { pageTitle: 'AccountStatusTypes' },
        loadChildren: () => import('./gdi/account-status-type/account-status-type.module').then(m => m.AccountStatusTypeModule),
      },
      {
        path: 'account-ownership-type',
        data: { pageTitle: 'AccountOwnershipTypes' },
        loadChildren: () => import('./gdi/account-ownership-type/account-ownership-type.module').then(m => m.AccountOwnershipTypeModule),
      },
      {
        path: 'loan-product-type',
        data: { pageTitle: 'LoanProductTypes' },
        loadChildren: () => import('./gdi/loan-product-type/loan-product-type.module').then(m => m.LoanProductTypeModule),
      },
      {
        path: 'loan-performance-classification',
        data: { pageTitle: 'LoanPerformanceClassifications' },
        loadChildren: () =>
          import('./gdi/loan-performance-classification/loan-performance-classification.module').then(
            m => m.LoanPerformanceClassificationModule
          ),
      },
      {
        path: 'chart-of-accounts-code',
        data: { pageTitle: 'ChartOfAccountsCodes' },
        loadChildren: () => import('./gdi/chart-of-accounts-code/chart-of-accounts-code.module').then(m => m.ChartOfAccountsCodeModule),
      },
      {
        path: 'loan-repayment-frequency',
        data: { pageTitle: 'LoanRepaymentFrequencies' },
        loadChildren: () =>
          import('./gdi/loan-repayment-frequency/loan-repayment-frequency.module').then(m => m.LoanRepaymentFrequencyModule),
      },
      {
        path: 'gl-mapping',
        data: { pageTitle: 'GlMappings' },
        loadChildren: () => import('./gdi/gl-mapping/gl-mapping.module').then(m => m.GlMappingModule),
      },
      {
        path: 'moratorium-item',
        data: { pageTitle: 'MoratoriumItems' },
        loadChildren: () => import('./gdi/moratorium-item/moratorium-item.module').then(m => m.MoratoriumItemModule),
      },
      {
        path: 'collateral-type',
        data: { pageTitle: 'CollateralTypes' },
        loadChildren: () => import('./gdi/collateral-type/collateral-type.module').then(m => m.CollateralTypeModule),
      },
      {
        path: 'loan-application-type',
        data: { pageTitle: 'LoanApplicationTypes' },
        loadChildren: () => import('./gdi/loan-application-type/loan-application-type.module').then(m => m.LoanApplicationTypeModule),
      },
      {
        path: 'loan-application-status',
        data: { pageTitle: 'LoanApplicationStatuses' },
        loadChildren: () => import('./gdi/loan-application-status/loan-application-status.module').then(m => m.LoanApplicationStatusModule),
      },
      {
        path: 'loan-restructure-item',
        data: { pageTitle: 'LoanRestructureItems' },
        loadChildren: () => import('./gdi/loan-restructure-item/loan-restructure-item.module').then(m => m.LoanRestructureItemModule),
      },
      {
        path: 'loan-decline-reason',
        data: { pageTitle: 'LoanDeclineReasons' },
        loadChildren: () => import('./gdi/loan-decline-reason/loan-decline-reason.module').then(m => m.LoanDeclineReasonModule),
      },
      {
        path: 'loan-restructure-flag',
        data: { pageTitle: 'LoanRestructureFlags' },
        loadChildren: () => import('./gdi/loan-restructure-flag/loan-restructure-flag.module').then(m => m.LoanRestructureFlagModule),
      },
      {
        path: 'card-types',
        data: { pageTitle: 'CardTypes' },
        loadChildren: () => import('./gdi/card-types/card-types.module').then(m => m.CardTypesModule),
      },
      {
        path: 'card-brand-type',
        data: { pageTitle: 'CardBrandTypes' },
        loadChildren: () => import('./gdi/card-brand-type/card-brand-type.module').then(m => m.CardBrandTypeModule),
      },
      {
        path: 'card-status-flag',
        data: { pageTitle: 'CardStatusFlags' },
        loadChildren: () => import('./gdi/card-status-flag/card-status-flag.module').then(m => m.CardStatusFlagModule),
      },
      {
        path: 'card-charges',
        data: { pageTitle: 'CardCharges' },
        loadChildren: () => import('./gdi/card-charges/card-charges.module').then(m => m.CardChargesModule),
      },
      {
        path: 'card-category-type',
        data: { pageTitle: 'CardCategoryTypes' },
        loadChildren: () => import('./gdi/card-category-type/card-category-type.module').then(m => m.CardCategoryTypeModule),
      },
      {
        path: 'card-class-type',
        data: { pageTitle: 'CardClassTypes' },
        loadChildren: () => import('./gdi/card-class-type/card-class-type.module').then(m => m.CardClassTypeModule),
      },
      {
        path: 'card-performance-flag',
        data: { pageTitle: 'CardPerformanceFlags' },
        loadChildren: () => import('./gdi/card-performance-flag/card-performance-flag.module').then(m => m.CardPerformanceFlagModule),
      },
      {
        path: 'terminal-functions',
        data: { pageTitle: 'TerminalFunctions' },
        loadChildren: () => import('./gdi/terminal-functions/terminal-functions.module').then(m => m.TerminalFunctionsModule),
      },
      {
        path: 'terminal-types',
        data: { pageTitle: 'TerminalTypes' },
        loadChildren: () => import('./gdi/terminal-types/terminal-types.module').then(m => m.TerminalTypesModule),
      },
      {
        path: 'customer-complaint-status-type',
        data: { pageTitle: 'CustomerComplaintStatusTypes' },
        loadChildren: () =>
          import('./gdi/customer-complaint-status-type/customer-complaint-status-type.module').then(
            m => m.CustomerComplaintStatusTypeModule
          ),
      },
      {
        path: 'channel-type',
        data: { pageTitle: 'ChannelTypes' },
        loadChildren: () => import('./gdi/channel-type/channel-type.module').then(m => m.ChannelTypeModule),
      },
      {
        path: 'fx-customer-type',
        data: { pageTitle: 'FxCustomerTypes' },
        loadChildren: () => import('./gdi/fx-customer-type/fx-customer-type.module').then(m => m.FxCustomerTypeModule),
      },
      {
        path: 'fx-transaction-type',
        data: { pageTitle: 'FxTransactionTypes' },
        loadChildren: () => import('./gdi/fx-transaction-type/fx-transaction-type.module').then(m => m.FxTransactionTypeModule),
      },
      {
        path: 'fx-transaction-rate-type',
        data: { pageTitle: 'FxTransactionRateTypes' },
        loadChildren: () =>
          import('./gdi/fx-transaction-rate-type/fx-transaction-rate-type.module').then(m => m.FxTransactionRateTypeModule),
      },
      {
        path: 'fx-rate-type',
        data: { pageTitle: 'FxRateTypes' },
        loadChildren: () => import('./gdi/fx-rate-type/fx-rate-type.module').then(m => m.FxRateTypeModule),
      },
      {
        path: 'fx-transaction-channel-type',
        data: { pageTitle: 'FxTransactionChannelTypes' },
        loadChildren: () =>
          import('./gdi/fx-transaction-channel-type/fx-transaction-channel-type.module').then(m => m.FxTransactionChannelTypeModule),
      },
      {
        path: 'fx-receipt-purpose-type',
        data: { pageTitle: 'FxReceiptPurposeTypes' },
        loadChildren: () => import('./gdi/fx-receipt-purpose-type/fx-receipt-purpose-type.module').then(m => m.FxReceiptPurposeTypeModule),
      },
      {
        path: 'fraud-type',
        data: { pageTitle: 'FraudTypes' },
        loadChildren: () => import('./gdi/fraud-type/fraud-type.module').then(m => m.FraudTypeModule),
      },
      {
        path: 'fraud-category-flag',
        data: { pageTitle: 'FraudCategoryFlags' },
        loadChildren: () => import('./gdi/fraud-category-flag/fraud-category-flag.module').then(m => m.FraudCategoryFlagModule),
      },
      {
        path: 'shareholder-type',
        data: { pageTitle: 'ShareholderTypes' },
        loadChildren: () => import('./gdi/shareholder-type/shareholder-type.module').then(m => m.ShareholderTypeModule),
      },
      {
        path: 'merchant-type',
        data: { pageTitle: 'MerchantTypes' },
        loadChildren: () => import('./gdi/merchant-type/merchant-type.module').then(m => m.MerchantTypeModule),
      },
      {
        path: 'card-fraud-incident-category',
        data: { pageTitle: 'CardFraudIncidentCategories' },
        loadChildren: () =>
          import('./gdi/card-fraud-incident-category/card-fraud-incident-category.module').then(m => m.CardFraudIncidentCategoryModule),
      },
      {
        path: 'academic-qualification',
        data: { pageTitle: 'AcademicQualifications' },
        loadChildren: () => import('./gdi/academic-qualification/academic-qualification.module').then(m => m.AcademicQualificationModule),
      },
      {
        path: 'professional-qualification',
        data: { pageTitle: 'ProfessionalQualifications' },
        loadChildren: () =>
          import('./gdi/professional-qualification/professional-qualification.module').then(m => m.ProfessionalQualificationModule),
      },
      {
        path: 'employment-terms',
        data: { pageTitle: 'EmploymentTerms' },
        loadChildren: () => import('./gdi/employment-terms/employment-terms.module').then(m => m.EmploymentTermsModule),
      },
      {
        path: 'committee-type',
        data: { pageTitle: 'CommitteeTypes' },
        loadChildren: () => import('./gdi/committee-type/committee-type.module').then(m => m.CommitteeTypeModule),
      },
      {
        path: 'executive-category-type',
        data: { pageTitle: 'ExecutiveCategoryTypes' },
        loadChildren: () => import('./gdi/executive-category-type/executive-category-type.module').then(m => m.ExecutiveCategoryTypeModule),
      },
      {
        path: 'department-type',
        data: { pageTitle: 'DepartmentTypes' },
        loadChildren: () => import('./gdi/department-type/department-type.module').then(m => m.DepartmentTypeModule),
      },
      {
        path: 'share-holding-flag',
        data: { pageTitle: 'ShareHoldingFlags' },
        loadChildren: () => import('./gdi/share-holding-flag/share-holding-flag.module').then(m => m.ShareHoldingFlagModule),
      },
      {
        path: 'anticipated-maturity-periood',
        data: { pageTitle: 'AnticipatedMaturityPerioods' },
        loadChildren: () =>
          import('./gdi/anticipated-maturity-periood/anticipated-maturity-periood.module').then(m => m.AnticipatedMaturityPerioodModule),
      },
      {
        path: 'interest-calc-method',
        data: { pageTitle: 'InterestCalcMethods' },
        loadChildren: () => import('./gdi/interest-calc-method/interest-calc-method.module').then(m => m.InterestCalcMethodModule),
      },
      {
        path: 'security-type',
        data: { pageTitle: 'SecurityTypes' },
        loadChildren: () => import('./gdi/security-type/security-type.module').then(m => m.SecurityTypeModule),
      },
      {
        path: 'security-tenure',
        data: { pageTitle: 'SecurityTenures' },
        loadChildren: () => import('./gdi/security-tenure/security-tenure.module').then(m => m.SecurityTenureModule),
      },
      {
        path: 'financial-derivative-type-code',
        data: { pageTitle: 'FinancialDerivativeTypeCodes' },
        loadChildren: () =>
          import('./gdi/financial-derivative-type-code/financial-derivative-type-code.module').then(
            m => m.FinancialDerivativeTypeCodeModule
          ),
      },
      {
        path: 'security-classification-type',
        data: { pageTitle: 'SecurityClassificationTypes' },
        loadChildren: () =>
          import('./gdi/security-classification-type/security-classification-type.module').then(m => m.SecurityClassificationTypeModule),
      },
      {
        path: 'derivative-sub-type',
        data: { pageTitle: 'DerivativeSubTypes' },
        loadChildren: () => import('./gdi/derivative-sub-type/derivative-sub-type.module').then(m => m.DerivativeSubTypeModule),
      },
      {
        path: 'derivative-underlying-asset',
        data: { pageTitle: 'DerivativeUnderlyingAssets' },
        loadChildren: () =>
          import('./gdi/derivative-underlying-asset/derivative-underlying-asset.module').then(m => m.DerivativeUnderlyingAssetModule),
      },
      {
        path: 'currency-authenticity-flag',
        data: { pageTitle: 'CurrencyAuthenticityFlags' },
        loadChildren: () =>
          import('./gdi/currency-authenticity-flag/currency-authenticity-flag.module').then(m => m.CurrencyAuthenticityFlagModule),
      },
      {
        path: 'kenyan-currency-denomination',
        data: { pageTitle: 'KenyanCurrencyDenominations' },
        loadChildren: () =>
          import('./gdi/kenyan-currency-denomination/kenyan-currency-denomination.module').then(m => m.KenyanCurrencyDenominationModule),
      },
      {
        path: 'currency-serviceability-flag',
        data: { pageTitle: 'CurrencyServiceabilityFlags' },
        loadChildren: () =>
          import('./gdi/currency-serviceability-flag/currency-serviceability-flag.module').then(m => m.CurrencyServiceabilityFlagModule),
      },
      {
        path: 'remittance-flag',
        data: { pageTitle: 'RemittanceFlags' },
        loadChildren: () => import('./gdi/remittance-flag/remittance-flag.module').then(m => m.RemittanceFlagModule),
      },
      {
        path: 'sources-of-funds-type-code',
        data: { pageTitle: 'SourcesOfFundsTypeCodes' },
        loadChildren: () =>
          import('./gdi/sources-of-funds-type-code/sources-of-funds-type-code.module').then(m => m.SourcesOfFundsTypeCodeModule),
      },
      {
        path: 'source-remittance-purpose-type',
        data: { pageTitle: 'SourceRemittancePurposeTypes' },
        loadChildren: () =>
          import('./gdi/source-remittance-purpose-type/source-remittance-purpose-type.module').then(
            m => m.SourceRemittancePurposeTypeModule
          ),
      },
      {
        path: 'staff-current-employment-status',
        data: { pageTitle: 'StaffCurrentEmploymentStatuses' },
        loadChildren: () =>
          import('./gdi/staff-current-employment-status/staff-current-employment-status.module').then(
            m => m.StaffCurrentEmploymentStatusModule
          ),
      },
      {
        path: 'staff-role-type',
        data: { pageTitle: 'StaffRoleTypes' },
        loadChildren: () => import('./gdi/staff-role-type/staff-role-type.module').then(m => m.StaffRoleTypeModule),
      },
      {
        path: 'management-member-type',
        data: { pageTitle: 'ManagementMemberTypes' },
        loadChildren: () => import('./gdi/management-member-type/management-member-type.module').then(m => m.ManagementMemberTypeModule),
      },
      {
        path: 'ultimate-beneficiary-types',
        data: { pageTitle: 'UltimateBeneficiaryTypes' },
        loadChildren: () =>
          import('./gdi/ultimate-beneficiary-types/ultimate-beneficiary-types.module').then(m => m.UltimateBeneficiaryTypesModule),
      },
      {
        path: 'bounced-cheque-categories',
        data: { pageTitle: 'BouncedChequeCategories' },
        loadChildren: () =>
          import('./gdi/bounced-cheque-categories/bounced-cheque-categories.module').then(m => m.BouncedChequeCategoriesModule),
      },
      {
        path: 'reasons-for-bounced-cheque',
        data: { pageTitle: 'ReasonsForBouncedCheques' },
        loadChildren: () =>
          import('./gdi/reasons-for-bounced-cheque/reasons-for-bounced-cheque.module').then(m => m.ReasonsForBouncedChequeModule),
      },
      {
        path: 'crb-account-holder-type',
        data: { pageTitle: 'CrbAccountHolderTypes' },
        loadChildren: () => import('./gdi/crb-account-holder-type/crb-account-holder-type.module').then(m => m.CrbAccountHolderTypeModule),
      },
      {
        path: 'crb-account-status',
        data: { pageTitle: 'CrbAccountStatuses' },
        loadChildren: () => import('./gdi/crb-account-status/crb-account-status.module').then(m => m.CrbAccountStatusModule),
      },
      {
        path: 'crb-submitting-institution-category',
        data: { pageTitle: 'CrbSubmittingInstitutionCategories' },
        loadChildren: () =>
          import('./gdi/crb-submitting-institution-category/crb-submitting-institution-category.module').then(
            m => m.CrbSubmittingInstitutionCategoryModule
          ),
      },
      {
        path: 'crb-amount-category-band',
        data: { pageTitle: 'CrbAmountCategoryBands' },
        loadChildren: () =>
          import('./gdi/crb-amount-category-band/crb-amount-category-band.module').then(m => m.CrbAmountCategoryBandModule),
      },
      {
        path: 'crb-report-request-reasons',
        data: { pageTitle: 'CrbReportRequestReasons' },
        loadChildren: () =>
          import('./gdi/crb-report-request-reasons/crb-report-request-reasons.module').then(m => m.CrbReportRequestReasonsModule),
      },
      {
        path: 'crb-complaint-type',
        data: { pageTitle: 'CrbComplaintTypes' },
        loadChildren: () => import('./gdi/crb-complaint-type/crb-complaint-type.module').then(m => m.CrbComplaintTypeModule),
      },
      {
        path: 'crb-complaint-status-type',
        data: { pageTitle: 'CrbComplaintStatusTypes' },
        loadChildren: () =>
          import('./gdi/crb-complaint-status-type/crb-complaint-status-type.module').then(m => m.CrbComplaintStatusTypeModule),
      },
      {
        path: 'crb-record-file-type',
        data: { pageTitle: 'CrbRecordFileTypes' },
        loadChildren: () => import('./gdi/crb-record-file-type/crb-record-file-type.module').then(m => m.CrbRecordFileTypeModule),
      },
      {
        path: 'crb-credit-application-status',
        data: { pageTitle: 'CrbCreditApplicationStatuses' },
        loadChildren: () =>
          import('./gdi/crb-credit-application-status/crb-credit-application-status.module').then(m => m.CrbCreditApplicationStatusModule),
      },
      {
        path: 'crb-customer-type',
        data: { pageTitle: 'CrbCustomerTypes' },
        loadChildren: () => import('./gdi/crb-customer-type/crb-customer-type.module').then(m => m.CrbCustomerTypeModule),
      },
      {
        path: 'crb-subscription-status-type-code',
        data: { pageTitle: 'CrbSubscriptionStatusTypeCodes' },
        loadChildren: () =>
          import('./gdi/crb-subscription-status-type-code/crb-subscription-status-type-code.module').then(
            m => m.CrbSubscriptionStatusTypeCodeModule
          ),
      },
      {
        path: 'crb-nature-of-information',
        data: { pageTitle: 'CrbNatureOfInformations' },
        loadChildren: () =>
          import('./gdi/crb-nature-of-information/crb-nature-of-information.module').then(m => m.CrbNatureOfInformationModule),
      },
      {
        path: 'crb-source-of-information-type',
        data: { pageTitle: 'CrbSourceOfInformationTypes' },
        loadChildren: () =>
          import('./gdi/crb-source-of-information-type/crb-source-of-information-type.module').then(
            m => m.CrbSourceOfInformationTypeModule
          ),
      },
      {
        path: 'crb-product-service-fee-type',
        data: { pageTitle: 'CrbProductServiceFeeTypes' },
        loadChildren: () =>
          import('./gdi/crb-product-service-fee-type/crb-product-service-fee-type.module').then(m => m.CrbProductServiceFeeTypeModule),
      },
      {
        path: 'crb-file-transmission-status',
        data: { pageTitle: 'CrbFileTransmissionStatuses' },
        loadChildren: () =>
          import('./gdi/crb-file-transmission-status/crb-file-transmission-status.module').then(m => m.CrbFileTransmissionStatusModule),
      },
      {
        path: 'crb-agent-service-type',
        data: { pageTitle: 'CrbAgentServiceTypes' },
        loadChildren: () => import('./gdi/crb-agent-service-type/crb-agent-service-type.module').then(m => m.CrbAgentServiceTypeModule),
      },
      {
        path: 'crb-credit-facility-type',
        data: { pageTitle: 'CrbCreditFacilityTypes' },
        loadChildren: () =>
          import('./gdi/crb-credit-facility-type/crb-credit-facility-type.module').then(m => m.CrbCreditFacilityTypeModule),
      },
      {
        path: 'crb-gl-code',
        data: { pageTitle: 'CrbGlCodes' },
        loadChildren: () => import('./gdi/crb-gl-code/crb-gl-code.module').then(m => m.CrbGlCodeModule),
      },
      {
        path: 'crb-aging-bands',
        data: { pageTitle: 'CrbAgingBands' },
        loadChildren: () => import('./gdi/crb-aging-bands/crb-aging-bands.module').then(m => m.CrbAgingBandsModule),
      },
      {
        path: 'crb-report-view-band',
        data: { pageTitle: 'CrbReportViewBands' },
        loadChildren: () => import('./gdi/crb-report-view-band/crb-report-view-band.module').then(m => m.CrbReportViewBandModule),
      },
      {
        path: 'crb-data-submitting-institutions',
        data: { pageTitle: 'CrbDataSubmittingInstitutions' },
        loadChildren: () =>
          import('./gdi/crb-data-submitting-institutions/crb-data-submitting-institutions.module').then(
            m => m.CrbDataSubmittingInstitutionsModule
          ),
      },
      {
        path: 'bank-transaction-type',
        data: { pageTitle: 'BankTransactionTypes' },
        loadChildren: () => import('./gdi/bank-transaction-type/bank-transaction-type.module').then(m => m.BankTransactionTypeModule),
      },
      {
        path: 'agricultural-enterprise-activity-type',
        data: { pageTitle: 'AgriculturalEnterpriseActivityTypes' },
        loadChildren: () =>
          import('./gdi/agricultural-enterprise-activity-type/agricultural-enterprise-activity-type.module').then(
            m => m.AgriculturalEnterpriseActivityTypeModule
          ),
      },
      {
        path: 'interbank-sector-code',
        data: { pageTitle: 'InterbankSectorCodes' },
        loadChildren: () => import('./gdi/interbank-sector-code/interbank-sector-code.module').then(m => m.InterbankSectorCodeModule),
      },
      {
        path: 'ultimate-beneficiary-category',
        data: { pageTitle: 'UltimateBeneficiaryCategories' },
        loadChildren: () =>
          import('./gdi/ultimate-beneficiary-category/ultimate-beneficiary-category.module').then(m => m.UltimateBeneficiaryCategoryModule),
      },
      {
        path: 'issuers-of-securities',
        data: { pageTitle: 'IssuersOfSecurities' },
        loadChildren: () => import('./gdi/issuers-of-securities/issuers-of-securities.module').then(m => m.IssuersOfSecuritiesModule),
      },
      {
        path: 'loan-account-category',
        data: { pageTitle: 'LoanAccountCategories' },
        loadChildren: () => import('./gdi/loan-account-category/loan-account-category.module').then(m => m.LoanAccountCategoryModule),
      },
      {
        path: 'counterparty-type',
        data: { pageTitle: 'CounterpartyTypes' },
        loadChildren: () => import('./gdi/counterparty-type/counterparty-type.module').then(m => m.CounterpartyTypeModule),
      },
      {
        path: 'counter-party-deal-type',
        data: { pageTitle: 'CounterPartyDealTypes' },
        loadChildren: () => import('./gdi/counter-party-deal-type/counter-party-deal-type.module').then(m => m.CounterPartyDealTypeModule),
      },
      {
        path: 'counter-party-category',
        data: { pageTitle: 'CounterPartyCategories' },
        loadChildren: () => import('./gdi/counter-party-category/counter-party-category.module').then(m => m.CounterPartyCategoryModule),
      },
      {
        path: 'acquiring-issuing-flag',
        data: { pageTitle: 'AcquiringIssuingFlags' },
        loadChildren: () => import('./gdi/acquiring-issuing-flag/acquiring-issuing-flag.module').then(m => m.AcquiringIssuingFlagModule),
      },
      {
        path: 'credit-card-ownership',
        data: { pageTitle: 'CreditCardOwnerships' },
        loadChildren: () => import('./gdi/credit-card-ownership/credit-card-ownership.module').then(m => m.CreditCardOwnershipModule),
      },
      {
        path: 'category-of-security',
        data: { pageTitle: 'CategoryOfSecurities' },
        loadChildren: () => import('./gdi/category-of-security/category-of-security.module').then(m => m.CategoryOfSecurityModule),
      },
      {
        path: 'nature-of-customer-complaints',
        data: { pageTitle: 'NatureOfCustomerComplaints' },
        loadChildren: () =>
          import('./gdi/nature-of-customer-complaints/nature-of-customer-complaints.module').then(m => m.NatureOfCustomerComplaintsModule),
      },
      {
        path: 'gdi-master-data-index',
        data: { pageTitle: 'GdiMasterDataIndices' },
        loadChildren: () => import('./gdi/gdi-master-data-index/gdi-master-data-index.module').then(m => m.GdiMasterDataIndexModule),
      },
      {
        path: 'gdi-transaction-data-index',
        data: { pageTitle: 'GdiTransactionDataIndices' },
        loadChildren: () =>
          import('./gdi/gdi-transaction-data-index/gdi-transaction-data-index.module').then(m => m.GdiTransactionDataIndexModule),
      },
      {
        path: 'product-type',
        data: { pageTitle: 'ProductTypes' },
        loadChildren: () => import('./gdi/product-type/product-type.module').then(m => m.ProductTypeModule),
      },
      {
        path: 'account-attribute',
        data: { pageTitle: 'AccountAttributes' },
        loadChildren: () => import('./gdi-data/account-attribute/account-attribute.module').then(m => m.AccountAttributeModule),
      },
      {
        path: 'account-attribute-metadata',
        data: { pageTitle: 'AccountAttributeMetadata' },
        loadChildren: () =>
          import('./gdi-data/account-attribute-metadata/account-attribute-metadata.module').then(m => m.AccountAttributeMetadataModule),
      },
      {
        path: 'exchange-rate',
        data: { pageTitle: 'ExchangeRates' },
        loadChildren: () => import('./gdi-data/exchange-rate/exchange-rate.module').then(m => m.ExchangeRateModule),
      },
      {
        path: 'particulars-of-outlet',
        data: { pageTitle: 'ParticularsOfOutlets' },
        loadChildren: () => import('./gdi-data/particulars-of-outlet/particulars-of-outlet.module').then(m => m.ParticularsOfOutletModule),
      },
      {
        path: 'weekly-counterfeit-holding',
        data: { pageTitle: 'WeeklyCounterfeitHoldings' },
        loadChildren: () =>
          import('./gdi-data/weekly-counterfeit-holding/weekly-counterfeit-holding.module').then(m => m.WeeklyCounterfeitHoldingModule),
      },
      {
        path: 'weekly-cash-holding',
        data: { pageTitle: 'WeeklyCashHoldings' },
        loadChildren: () => import('./gdi-data/weekly-cash-holding/weekly-cash-holding.module').then(m => m.WeeklyCashHoldingModule),
      },
      {
        path: 'county-sub-county-code',
        data: { pageTitle: 'CountySubCountyCodes' },
        loadChildren: () =>
          import('./gdi-data/county-sub-county-code/county-sub-county-code.module').then(m => m.CountySubCountyCodeModule),
      },
      {
        path: 'related-party-relationship',
        data: { pageTitle: 'RelatedPartyRelationships' },
        loadChildren: () =>
          import('./gdi-data/related-party-relationship/related-party-relationship.module').then(m => m.RelatedPartyRelationshipModule),
      },
      {
        path: 'terminals-and-pos',
        data: { pageTitle: 'TerminalsAndPOS' },
        loadChildren: () => import('./gdi-data/terminals-and-pos/terminals-and-pos.module').then(m => m.TerminalsAndPOSModule),
      },
      {
        path: 'performance-of-foreign-subsidiaries',
        data: { pageTitle: 'PerformanceOfForeignSubsidiaries' },
        loadChildren: () =>
          import('./gdi-data/performance-of-foreign-subsidiaries/performance-of-foreign-subsidiaries.module').then(
            m => m.PerformanceOfForeignSubsidiariesModule
          ),
      },
      {
        path: 'account-balance',
        data: { pageTitle: 'AccountBalances' },
        loadChildren: () => import('./gdi-data/account-balance/account-balance.module').then(m => m.AccountBalanceModule),
      },
      {
        path: 'agent-banking-activity',
        data: { pageTitle: 'AgentBankingActivities' },
        loadChildren: () =>
          import('./gdi-data/agent-banking-activity/agent-banking-activity.module').then(m => m.AgentBankingActivityModule),
      },
      {
        path: 'card-acquiring-transaction',
        data: { pageTitle: 'CardAcquiringTransactions' },
        loadChildren: () =>
          import('./gdi-data/card-acquiring-transaction/card-acquiring-transaction.module').then(m => m.CardAcquiringTransactionModule),
      },
      {
        path: 'card-issuer-charges',
        data: { pageTitle: 'CardIssuerCharges' },
        loadChildren: () => import('./gdi-data/card-issuer-charges/card-issuer-charges.module').then(m => m.CardIssuerChargesModule),
      },
      {
        path: 'card-fraud-information',
        data: { pageTitle: 'CardFraudInformations' },
        loadChildren: () =>
          import('./gdi-data/card-fraud-information/card-fraud-information.module').then(m => m.CardFraudInformationModule),
      },
      {
        path: 'card-usage-information',
        data: { pageTitle: 'CardUsageInformations' },
        loadChildren: () =>
          import('./gdi-data/card-usage-information/card-usage-information.module').then(m => m.CardUsageInformationModule),
      },
      {
        path: 'collateral-information',
        data: { pageTitle: 'CollateralInformations' },
        loadChildren: () =>
          import('./gdi-data/collateral-information/collateral-information.module').then(m => m.CollateralInformationModule),
      },
      {
        path: 'credit-card-facility',
        data: { pageTitle: 'CreditCardFacilities' },
        loadChildren: () => import('./gdi-data/credit-card-facility/credit-card-facility.module').then(m => m.CreditCardFacilityModule),
      },
      {
        path: 'card-state',
        data: { pageTitle: 'CardStates' },
        loadChildren: () => import('./gdi-data/card-state/card-state.module').then(m => m.CardStateModule),
      },
      {
        path: 'work-in-progress-report',
        data: { pageTitle: 'WorkInProgressReports' },
        loadChildren: () =>
          import('./assets/work-in-progress-report/work-in-progress-report.module').then(m => m.WorkInProgressReportModule),
      },
      {
        path: 'work-in-progress-overview',
        data: { pageTitle: 'WorkInProgressOverviews' },
        loadChildren: () =>
          import('./assets/work-in-progress-overview/work-in-progress-overview.module').then(m => m.WorkInProgressOverviewModule),
      },
      {
        path: 'prepayment-compilation-request',
        data: { pageTitle: 'PrepaymentCompilationRequests' },
        loadChildren: () =>
          import('./prepayments/prepayment-compilation-request/prepayment-compilation-request.module').then(
            m => m.PrepaymentCompilationRequestModule
          ),
      },
      {
        path: 'prepayment-report',
        data: { pageTitle: 'PrepaymentReports' },
        loadChildren: () => import('./prepayments/prepayment-report/prepayment-report.module').then(m => m.PrepaymentReportModule),
      },
      {
        path: 'prepayment-account-report',
        data: { pageTitle: 'PrepaymentAccountReports' },
        loadChildren: () =>
          import('./prepayments/prepayment-account-report/prepayment-account-report.module').then(m => m.PrepaymentAccountReportModule),
      },
      {
        path: 'prepayment-outstanding-overview-report',
        data: { pageTitle: 'PrepaymentOutstandingOverviewReports' },
        loadChildren: () =>
          import('./prepayments/prepayment-outstanding-overview-report/prepayment-outstanding-overview-report.module').then(
            m => m.PrepaymentOutstandingOverviewReportModule
          ),
      },
      {
        path: 'autonomous-report',
        data: { pageTitle: 'AutonomousReports' },
        loadChildren: () => import('./reports/autonomous-report/autonomous-report.module').then(m => m.AutonomousReportModule),
      },
      {
        path: 'amortization-posting-report',
        data: { pageTitle: 'AmortizationPostingReports' },
        loadChildren: () =>
          import('./reports/amortization-posting-report/amortization-posting-report.module').then(m => m.AmortizationPostingReportModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
