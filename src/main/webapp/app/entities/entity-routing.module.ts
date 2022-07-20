///
/// Erp System - Mark II No 20 (Baruch Series) Client v 0.0.9-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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
        path: 'dev/xlsx-report-requisition',
        data: { pageTitle: 'XlsxReportRequisitions' },
        loadChildren: () => import('./xlsx-report-requisition/xlsx-report-requisition.module').then(m => m.XlsxReportRequisitionModule),
      },
      {
        path: 'dev/fixed-asset-acquisition',
        data: { pageTitle: 'FixedAssetAcquisitions' },
        loadChildren: () =>
          import('./assets/fixed-asset-acquisition/fixed-asset-acquisition.module').then(m => m.ErpServiceFixedAssetAcquisitionModule),
      },
      {
        path: 'dev/fixed-asset-net-book-value',
        data: { pageTitle: 'FixedAssetNetBookValues' },
        loadChildren: () =>
          import('./assets/fixed-asset-net-book-value/fixed-asset-net-book-value.module').then(
            m => m.ErpServiceFixedAssetNetBookValueModule
          ),
      },
      {
        path: 'dev/fixed-asset-depreciation',
        data: { pageTitle: 'FixedAssetDepreciations' },
        loadChildren: () =>
          import('./assets/fixed-asset-depreciation/fixed-asset-depreciation.module').then(m => m.ErpServiceFixedAssetDepreciationModule),
      },
      {
        path: 'dev/file-type',
        data: { pageTitle: 'FileTypes' },
        loadChildren: () => import('./files/file-type/file-type.module').then(m => m.ErpServiceFileTypeModule),
      },
      {
        path: 'dev/file-upload',
        data: { pageTitle: 'FileUploads' },
        loadChildren: () => import('./files/file-upload/file-upload.module').then(m => m.ErpServiceFileUploadModule),
      },
      {
        path: 'dev/message-token',
        data: { pageTitle: 'MessageTokens' },
        loadChildren: () => import('./files/message-token/message-token.module').then(m => m.ErpServiceMessageTokenModule),
      },
      {
        path: 'dev/invoice',
        data: { pageTitle: 'Invoices' },
        loadChildren: () => import('./payments/invoice/invoice.module').then(m => m.ErpServiceInvoiceModule),
      },
      {
        path: 'dev/payment',
        data: { pageTitle: 'Payments' },
        loadChildren: () => import('./payments/payment/payment.module').then(m => m.ErpServicePaymentModule),
      },
      {
        path: 'dev/dealer',
        data: { pageTitle: 'Dealers' },
        loadChildren: () => import('./dealers/dealer/dealer.module').then(m => m.ErpServiceDealerModule),
      },
      {
        path: 'dev/payment-calculation',
        data: { pageTitle: 'PaymentCalculations' },
        loadChildren: () =>
          import('./payments/payment-calculation/payment-calculation.module').then(m => m.ErpServicePaymentCalculationModule),
      },
      {
        path: 'dev/payment-requisition',
        data: { pageTitle: 'PaymentRequisitions' },
        loadChildren: () =>
          import('./payments/payment-requisition/payment-requisition.module').then(m => m.ErpServicePaymentRequisitionModule),
      },
      {
        path: 'dev/tax-reference',
        data: { pageTitle: 'TaxReferences' },
        loadChildren: () => import('./payments/tax-reference/tax-reference.module').then(m => m.ErpServiceTaxReferenceModule),
      },
      {
        path: 'dev/tax-rule',
        data: { pageTitle: 'TaxRules' },
        loadChildren: () => import('./payments/tax-rule/tax-rule.module').then(m => m.ErpServiceTaxRuleModule),
      },
      {
        path: 'dev/payment-category',
        data: { pageTitle: 'PaymentCategories' },
        loadChildren: () => import('./payments/payment-category/payment-category.module').then(m => m.ErpServicePaymentCategoryModule),
      },
      {
        path: 'dev/placeholder',
        data: { pageTitle: 'Placeholders' },
        loadChildren: () => import('./erpService/placeholder/placeholder.module').then(m => m.ErpServicePlaceholderModule),
      },
      {
        path: 'dev/payment-label',
        data: { pageTitle: 'PaymentLabels' },
        loadChildren: () => import('./payment-label/payment-label.module').then(m => m.PaymentLabelModule),
      },
      {
        path: 'dev/signed-payment',
        data: { pageTitle: 'SignedPayments' },
        loadChildren: () => import('./signed-payment/signed-payment.module').then(m => m.SignedPaymentModule),
      },
      {
        path: 'dev/settlement-currency',
        data: { pageTitle: 'SettlementCurrencies' },
        loadChildren: () => import('./settlement-currency/settlement-currency.module').then(m => m.SettlementCurrencyModule),
      },
      {
        path: 'dev/purchase-order',
        data: { pageTitle: 'PurchaseOrders' },
        loadChildren: () => import('./purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
      },
      {
        path: 'dev/payment-invoice',
        data: { pageTitle: 'PaymentInvoices' },
        loadChildren: () => import('./payment-invoice/payment-invoice.module').then(m => m.PaymentInvoiceModule),
      },
      {
        path: 'dev/settlement',
        data: { pageTitle: 'Settlements' },
        loadChildren: () => import('./settlement/settlement.module').then(m => m.SettlementModule),
      },
      {
        path: 'dev/agency-notice',
        data: { pageTitle: 'AgencyNotices' },
        loadChildren: () => import('./agency-notice/agency-notice.module').then(m => m.AgencyNoticeModule),
      },
      {
        path: 'dev/depreciation-method',
        data: { pageTitle: 'DepreciationMethods' },
        loadChildren: () => import('./depreciation-method/depreciation-method.module').then(m => m.DepreciationMethodModule),
      },
      {
        path: 'dev/asset-category',
        data: { pageTitle: 'AssetCategories' },
        loadChildren: () => import('./asset-category/asset-category.module').then(m => m.AssetCategoryModule),
      },
      {
        path: 'dev/bank-branch-code',
        data: { pageTitle: 'BankBranchCodes' },
        loadChildren: () => import('./bank-branch-code/bank-branch-code.module').then(m => m.BankBranchCodeModule),
      },
      {
        path: 'dev/outlet-status',
        data: { pageTitle: 'OutletStatuses' },
        loadChildren: () => import('./outlet-status/outlet-status.module').then(m => m.OutletStatusModule),
      },
      {
        path: 'dev/outlet-type',
        data: { pageTitle: 'OutletTypes' },
        loadChildren: () => import('./outlet-type/outlet-type.module').then(m => m.OutletTypeModule),
      },
      {
        path: 'dev/county-code',
        data: { pageTitle: 'CountyCodes' },
        loadChildren: () => import('./county-code/county-code.module').then(m => m.CountyCodeModule),
      },
      {
        path: 'dev/service-outlet',
        data: { pageTitle: 'ServiceOutlets' },
        loadChildren: () => import('./service-outlet/service-outlet.module').then(m => m.ServiceOutletModule),
      },
      {
        path: 'dev/business-stamp',
        data: { pageTitle: 'BusinessStamps' },
        loadChildren: () => import('./business-stamp/business-stamp.module').then(m => m.BusinessStampModule),
      },
      {
        path: 'dev/delivery-note',
        data: { pageTitle: 'DeliveryNotes' },
        loadChildren: () => import('./delivery-note/delivery-note.module').then(m => m.DeliveryNoteModule),
      },
      {
        path: 'dev/job-sheet',
        data: { pageTitle: 'JobSheets' },
        loadChildren: () => import('./job-sheet/job-sheet.module').then(m => m.JobSheetModule),
      },
      {
        path: 'dev/credit-note',
        data: { pageTitle: 'CreditNotes' },
        loadChildren: () => import('./credit-note/credit-note.module').then(m => m.CreditNoteModule),
      },
      {
        path: 'dev/customer-id-document-type',
        data: { pageTitle: 'CustomerIDDocumentTypes' },
        loadChildren: () =>
          import('./customer-id-document-type/customer-id-document-type.module').then(m => m.CustomerIDDocumentTypeModule),
      },
      {
        path: 'dev/institution-code',
        data: { pageTitle: 'InstitutionCodes' },
        loadChildren: () => import('./institution-code/institution-code.module').then(m => m.InstitutionCodeModule),
      },
      {
        path: 'dev/mfb-branch-code',
        data: { pageTitle: 'MfbBranchCodes' },
        loadChildren: () => import('./mfb-branch-code/mfb-branch-code.module').then(m => m.MfbBranchCodeModule),
      },
      {
        path: 'dev/iso-country-code',
        data: { pageTitle: 'IsoCountryCodes' },
        loadChildren: () => import('./iso-country-code/iso-country-code.module').then(m => m.IsoCountryCodeModule),
      },
      {
        path: 'dev/sub-county-code',
        data: { pageTitle: 'SubCountyCodes' },
        loadChildren: () => import('./sub-county-code/sub-county-code.module').then(m => m.SubCountyCodeModule),
      },
      {
        path: 'dev/asset-registration',
        data: { pageTitle: 'AssetRegistrations' },
        loadChildren: () => import('./asset-registration/asset-registration.module').then(m => m.AssetRegistrationModule),
      },
      {
        path: 'dev/work-in-progress-registration',
        data: { pageTitle: 'WorkInProgressRegistrations' },
        loadChildren: () =>
          import('./work-in-progress-registration/work-in-progress-registration.module').then(m => m.WorkInProgressRegistrationModule),
      },
      {
        path: 'dev/work-in-progress-transfer',
        data: { pageTitle: 'WorkInProgressTransfers' },
        loadChildren: () =>
          import('./work-in-progress-transfer/work-in-progress-transfer.module').then(m => m.WorkInProgressTransferModule),
      },
      {
        path: 'dev/work-project-register',
        data: { pageTitle: 'WorkProjectRegisters' },
        loadChildren: () => import('./work-project-register/work-project-register.module').then(m => m.WorkProjectRegisterModule),
      },
      {
        path: 'dev/transaction-account',
        data: { pageTitle: 'TransactionAccounts' },
        loadChildren: () => import('./transaction-account/transaction-account.module').then(m => m.TransactionAccountModule),
      },
      {
        path: 'dev/prepayment-account',
        data: { pageTitle: 'PrepaymentAccounts' },
        loadChildren: () => import('./prepayment-account/prepayment-account.module').then(m => m.PrepaymentAccountModule),
      },
      {
        path: 'dev/prepayment-marshalling',
        data: { pageTitle: 'PrepaymentMarshallings' },
        loadChildren: () => import('./prepayment-marshalling/prepayment-marshalling.module').then(m => m.PrepaymentMarshallingModule),
      },
      {
        path: 'dev/prepayment-amortization',
        data: { pageTitle: 'PrepaymentAmortizations' },
        loadChildren: () => import('./prepayment-amortization/prepayment-amortization.module').then(m => m.PrepaymentAmortizationModule),
      },
      {
        path: 'dev/report-template',
        data: { pageTitle: 'ReportTemplates' },
        loadChildren: () => import('./report-template/report-template.module').then(m => m.ReportTemplateModule),
      },
      {
        path: 'dev/pdf-report-requisition',
        data: { pageTitle: 'PdfReportRequisitions' },
        loadChildren: () => import('./pdf-report-requisition/pdf-report-requisition.module').then(m => m.PdfReportRequisitionModule),
      },
      {
        path: 'dev/universally-unique-mapping',
        data: { pageTitle: 'UniversallyUniqueMappings' },
        loadChildren: () =>
          import('./universally-unique-mapping/universally-unique-mapping.module').then(m => m.UniversallyUniqueMappingModule),
      },
      {
        path: 'dev/system-content-type',
        data: { pageTitle: 'SystemContentTypes' },
        loadChildren: () => import('./system-content-type/system-content-type.module').then(m => m.SystemContentTypeModule),
      },
      {
        path: 'dev/report-requisition',
        data: { pageTitle: 'ReportRequisitions' },
        loadChildren: () => import('./report-requisition/report-requisition.module').then(m => m.ReportRequisitionModule),
      },
      {
        path: 'dev/report-content-type',
        data: { pageTitle: 'ReportContentTypes' },
        loadChildren: () => import('./report-content-type/report-content-type.module').then(m => m.ReportContentTypeModule),
      },
      {
        path: 'dev/system-module',
        data: { pageTitle: 'SystemModules' },
        loadChildren: () => import('./system-module/system-module.module').then(m => m.SystemModuleModule),
      },
      {
        path: 'dev/excel-report-export',
        data: { pageTitle: 'ExcelReportExports' },
        loadChildren: () => import('./excel-report-export/excel-report-export.module').then(m => m.ExcelReportExportModule),
      },
      {
        path: 'dev/process-status',
        data: { pageTitle: 'ProcessStatuses' },
        loadChildren: () => import('./process-status/process-status.module').then(m => m.ProcessStatusModule),
      },
      {
        path: 'dev/report-status',
        data: { pageTitle: 'ReportStatuses' },
        loadChildren: () => import('./report-status/report-status.module').then(m => m.ReportStatusModule),
      },
      {
        path: 'dev/algorithm',
        data: { pageTitle: 'Algorithms' },
        loadChildren: () => import('./algorithm/algorithm.module').then(m => m.AlgorithmModule),
      },
      {
        path: 'dev/security-clearance',
        data: { pageTitle: 'SecurityClearances' },
        loadChildren: () => import('./security-clearance/security-clearance.module').then(m => m.SecurityClearanceModule),
      },
      {
        path: 'dev/application-user',
        data: { pageTitle: 'ApplicationUsers' },
        loadChildren: () => import('./application-user/application-user.module').then(m => m.ApplicationUserModule),
      },
      {
        path: 'dev/report-design',
        data: { pageTitle: 'ReportDesigns' },
        loadChildren: () => import('./report-design/report-design.module').then(m => m.ReportDesignModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
