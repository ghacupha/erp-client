///
/// Erp System - Mark IX No 5 (Iddo Series) Client 1.6.4
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
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'bank-branch-code',
        data: { pageTitle: 'BankBranchCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/bank-branch-code/bank-branch-code.module').then(m => m.BankBranchCodeModule),
      },
      {
        path: 'outlet-status',
        data: { pageTitle: 'OutletStatuses',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/outlet-status/outlet-status.module').then(m => m.OutletStatusModule),
      },
      {
        path: 'outlet-type',
        data: { pageTitle: 'OutletTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/outlet-type/outlet-type.module').then(m => m.OutletTypeModule),
      },
      {
        path: 'county-code',
        data: { pageTitle: 'CountyCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/county-code/county-code.module').then(m => m.CountyCodeModule),
      },
      {
        path: 'service-outlet',
        data: { pageTitle: 'ServiceOutlets',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/service-outlet/service-outlet.module').then(m => m.ServiceOutletModule),
      },
      {
        path: 'customer-id-document-type',
        data: { pageTitle: 'CustomerIDDocumentTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/customer-id-document-type/customer-id-document-type.module').then(m => m.CustomerIDDocumentTypeModule),
      },
      {
        path: 'institution-code',
        data: { pageTitle: 'InstitutionCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/institution-code/institution-code.module').then(m => m.InstitutionCodeModule),
      },
      {
        path: 'mfb-branch-code',
        data: { pageTitle: 'MfbBranchCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/mfb-branch-code/mfb-branch-code.module').then(m => m.MfbBranchCodeModule),
      },
      {
        path: 'iso-country-code',
        data: { pageTitle: 'IsoCountryCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/iso-country-code/iso-country-code.module').then(m => m.IsoCountryCodeModule),
      },
      {
        path: 'sub-county-code',
        data: { pageTitle: 'SubCountyCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/sub-county-code/sub-county-code.module').then(m => m.SubCountyCodeModule),
      },
      {
        path: 'universally-unique-mapping',
        data: { pageTitle: 'UniversallyUniqueMappings',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/universally-unique-mapping/universally-unique-mapping.module').then(m => m.UniversallyUniqueMappingModule),
      },
      {
        path: 'customer-type',
        data: { pageTitle: 'CustomerTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/customer-type/customer-type.module').then(m => m.CustomerTypeModule),
      },
      {
        path: 'legal-status',
        data: { pageTitle: 'LegalStatuses',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/legal-status/legal-status.module').then(m => m.LegalStatusModule),
      },
      {
        path: 'insider-category-types',
        data: { pageTitle: 'InsiderCategoryTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/insider-category-types/insider-category-types.module').then(m => m.InsiderCategoryTypesModule),
      },
      {
        path: 'gender-type',
        data: { pageTitle: 'GenderTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/gender-type/gender-type.module').then(m => m.GenderTypeModule),
      },
      {
        path: 'institution-contact-details',
        data: { pageTitle: 'InstitutionContactDetails',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/institution-contact-details/institution-contact-details.module').then(m => m.InstitutionContactDetailsModule),
      },
      {
        path: 'isic-economic-activity',
        data: { pageTitle: 'IsicEconomicActivities',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/isic-economic-activity/isic-economic-activity.module').then(m => m.IsicEconomicActivityModule),
      },
      {
        path: 'institution-status-type',
        data: { pageTitle: 'InstitutionStatusTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/institution-status-type/institution-status-type.module').then(m => m.InstitutionStatusTypeModule),
      },
      {
        path: 'sna-sector-code',
        data: { pageTitle: 'SnaSectorCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/sna-sector-code/sna-sector-code.module').then(m => m.SnaSectorCodeModule),
      },
      {
        path: 'business-segment-types',
        data: { pageTitle: 'BusinessSegmentTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/business-segment-types/business-segment-types.module').then(m => m.BusinessSegmentTypesModule),
      },
      {
        path: 'iso-currency-code',
        data: { pageTitle: 'IsoCurrencyCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/iso-currency-code/iso-currency-code.module').then(m => m.IsoCurrencyCodeModule),
      },
      {
        path: 'party-relation-type',
        data: { pageTitle: 'PartyRelationTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/party-relation-type/party-relation-type.module').then(m => m.PartyRelationTypeModule),
      },
      {
        path: 'contract-status',
        data: { pageTitle: 'ContractStatuses',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/contract-status/contract-status.module').then(m => m.ContractStatusModule),
      },
      {
        path: 'account-type',
        data: { pageTitle: 'AccountTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/account-type/account-type.module').then(m => m.AccountTypeModule),
      },
      {
        path: 'account-status-type',
        data: { pageTitle: 'AccountStatusTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/account-status-type/account-status-type.module').then(m => m.AccountStatusTypeModule),
      },
      {
        path: 'account-ownership-type',
        data: { pageTitle: 'AccountOwnershipTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/account-ownership-type/account-ownership-type.module').then(m => m.AccountOwnershipTypeModule),
      },
      {
        path: 'loan-product-type',
        data: { pageTitle: 'LoanProductTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/loan-product-type/loan-product-type.module').then(m => m.LoanProductTypeModule),
      },
      {
        path: 'loan-performance-classification',
        data: { pageTitle: 'LoanPerformanceClassifications',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/loan-performance-classification/loan-performance-classification.module').then(
            m => m.LoanPerformanceClassificationModule
          ),
      },
      {
        path: 'chart-of-accounts-code',
        data: { pageTitle: 'ChartOfAccountsCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/chart-of-accounts-code/chart-of-accounts-code.module').then(m => m.ChartOfAccountsCodeModule),
      },
      {
        path: 'loan-repayment-frequency',
        data: { pageTitle: 'LoanRepaymentFrequencies',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/loan-repayment-frequency/loan-repayment-frequency.module').then(m => m.LoanRepaymentFrequencyModule),
      },
      {
        path: 'gl-mapping',
        data: { pageTitle: 'GlMappings',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/gl-mapping/gl-mapping.module').then(m => m.GlMappingModule),
      },
      {
        path: 'moratorium-item',
        data: { pageTitle: 'MoratoriumItems',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/moratorium-item/moratorium-item.module').then(m => m.MoratoriumItemModule),
      },
      {
        path: 'collateral-type',
        data: { pageTitle: 'CollateralTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/collateral-type/collateral-type.module').then(m => m.CollateralTypeModule),
      },
      {
        path: 'loan-application-type',
        data: { pageTitle: 'LoanApplicationTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/loan-application-type/loan-application-type.module').then(m => m.LoanApplicationTypeModule),
      },
      {
        path: 'loan-application-status',
        data: { pageTitle: 'LoanApplicationStatuses',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/loan-application-status/loan-application-status.module').then(m => m.LoanApplicationStatusModule),
      },
      {
        path: 'loan-restructure-item',
        data: { pageTitle: 'LoanRestructureItems',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/loan-restructure-item/loan-restructure-item.module').then(m => m.LoanRestructureItemModule),
      },
      {
        path: 'loan-decline-reason',
        data: { pageTitle: 'LoanDeclineReasons',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/loan-decline-reason/loan-decline-reason.module').then(m => m.LoanDeclineReasonModule),
      },
      {
        path: 'loan-restructure-flag',
        data: { pageTitle: 'LoanRestructureFlags',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/loan-restructure-flag/loan-restructure-flag.module').then(m => m.LoanRestructureFlagModule),
      },
      {
        path: 'card-types',
        data: { pageTitle: 'CardTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/card-types/card-types.module').then(m => m.CardTypesModule),
      },
      {
        path: 'card-brand-type',
        data: { pageTitle: 'CardBrandTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/card-brand-type/card-brand-type.module').then(m => m.CardBrandTypeModule),
      },
      {
        path: 'card-status-flag',
        data: { pageTitle: 'CardStatusFlags',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/card-status-flag/card-status-flag.module').then(m => m.CardStatusFlagModule),
      },
      {
        path: 'card-charges',
        data: { pageTitle: 'CardCharges',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/card-charges/card-charges.module').then(m => m.CardChargesModule),
      },
      {
        path: 'card-category-type',
        data: { pageTitle: 'CardCategoryTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/card-category-type/card-category-type.module').then(m => m.CardCategoryTypeModule),
      },
      {
        path: 'card-class-type',
        data: { pageTitle: 'CardClassTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/card-class-type/card-class-type.module').then(m => m.CardClassTypeModule),
      },
      {
        path: 'card-performance-flag',
        data: { pageTitle: 'CardPerformanceFlags',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/card-performance-flag/card-performance-flag.module').then(m => m.CardPerformanceFlagModule),
      },
      {
        path: 'terminal-functions',
        data: { pageTitle: 'TerminalFunctions',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/terminal-functions/terminal-functions.module').then(m => m.TerminalFunctionsModule),
      },
      {
        path: 'terminal-types',
        data: { pageTitle: 'TerminalTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/terminal-types/terminal-types.module').then(m => m.TerminalTypesModule),
      },
      {
        path: 'customer-complaint-status-type',
        data: { pageTitle: 'CustomerComplaintStatusTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/customer-complaint-status-type/customer-complaint-status-type.module').then(
            m => m.CustomerComplaintStatusTypeModule
          ),
      },
      {
        path: 'channel-type',
        data: { pageTitle: 'ChannelTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/channel-type/channel-type.module').then(m => m.ChannelTypeModule),
      },
      {
        path: 'fx-customer-type',
        data: { pageTitle: 'FxCustomerTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/fx-customer-type/fx-customer-type.module').then(m => m.FxCustomerTypeModule),
      },
      {
        path: 'fx-transaction-type',
        data: { pageTitle: 'FxTransactionTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/fx-transaction-type/fx-transaction-type.module').then(m => m.FxTransactionTypeModule),
      },
      {
        path: 'fx-transaction-rate-type',
        data: { pageTitle: 'FxTransactionRateTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/fx-transaction-rate-type/fx-transaction-rate-type.module').then(m => m.FxTransactionRateTypeModule),
      },
      {
        path: 'fx-rate-type',
        data: { pageTitle: 'FxRateTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/fx-rate-type/fx-rate-type.module').then(m => m.FxRateTypeModule),
      },
      {
        path: 'fx-transaction-channel-type',
        data: { pageTitle: 'FxTransactionChannelTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/fx-transaction-channel-type/fx-transaction-channel-type.module').then(m => m.FxTransactionChannelTypeModule),
      },
      {
        path: 'fx-receipt-purpose-type',
        data: { pageTitle: 'FxReceiptPurposeTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/fx-receipt-purpose-type/fx-receipt-purpose-type.module').then(m => m.FxReceiptPurposeTypeModule),
      },
      {
        path: 'fraud-type',
        data: { pageTitle: 'FraudTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/fraud-type/fraud-type.module').then(m => m.FraudTypeModule),
      },
      {
        path: 'fraud-category-flag',
        data: { pageTitle: 'FraudCategoryFlags',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/fraud-category-flag/fraud-category-flag.module').then(m => m.FraudCategoryFlagModule),
      },
      {
        path: 'shareholder-type',
        data: { pageTitle: 'ShareholderTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/shareholder-type/shareholder-type.module').then(m => m.ShareholderTypeModule),
      },
      {
        path: 'merchant-type',
        data: { pageTitle: 'MerchantTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/merchant-type/merchant-type.module').then(m => m.MerchantTypeModule),
      },
      {
        path: 'card-fraud-incident-category',
        data: { pageTitle: 'CardFraudIncidentCategories',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/card-fraud-incident-category/card-fraud-incident-category.module').then(m => m.CardFraudIncidentCategoryModule),
      },
      {
        path: 'academic-qualification',
        data: { pageTitle: 'AcademicQualifications',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/academic-qualification/academic-qualification.module').then(m => m.AcademicQualificationModule),
      },
      {
        path: 'professional-qualification',
        data: { pageTitle: 'ProfessionalQualifications',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/professional-qualification/professional-qualification.module').then(m => m.ProfessionalQualificationModule),
      },
      {
        path: 'employment-terms',
        data: { pageTitle: 'EmploymentTerms',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/employment-terms/employment-terms.module').then(m => m.EmploymentTermsModule),
      },
      {
        path: 'committee-type',
        data: { pageTitle: 'CommitteeTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/committee-type/committee-type.module').then(m => m.CommitteeTypeModule),
      },
      {
        path: 'executive-category-type',
        data: { pageTitle: 'ExecutiveCategoryTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/executive-category-type/executive-category-type.module').then(m => m.ExecutiveCategoryTypeModule),
      },
      {
        path: 'department-type',
        data: { pageTitle: 'DepartmentTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/department-type/department-type.module').then(m => m.DepartmentTypeModule),
      },
      {
        path: 'share-holding-flag',
        data: { pageTitle: 'ShareHoldingFlags',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/share-holding-flag/share-holding-flag.module').then(m => m.ShareHoldingFlagModule),
      },
      {
        path: 'anticipated-maturity-periood',
        data: { pageTitle: 'AnticipatedMaturityPerioods',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/anticipated-maturity-periood/anticipated-maturity-periood.module').then(m => m.AnticipatedMaturityPerioodModule),
      },
      {
        path: 'interest-calc-method',
        data: { pageTitle: 'InterestCalcMethods',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/interest-calc-method/interest-calc-method.module').then(m => m.InterestCalcMethodModule),
      },
      {
        path: 'security-type',
        data: { pageTitle: 'SecurityTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/security-type/security-type.module').then(m => m.SecurityTypeModule),
      },
      {
        path: 'security-tenure',
        data: { pageTitle: 'SecurityTenures',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/security-tenure/security-tenure.module').then(m => m.SecurityTenureModule),
      },
      {
        path: 'financial-derivative-type-code',
        data: { pageTitle: 'FinancialDerivativeTypeCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/financial-derivative-type-code/financial-derivative-type-code.module').then(
            m => m.FinancialDerivativeTypeCodeModule
          ),
      },
      {
        path: 'security-classification-type',
        data: { pageTitle: 'SecurityClassificationTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/security-classification-type/security-classification-type.module').then(m => m.SecurityClassificationTypeModule),
      },
      {
        path: 'derivative-sub-type',
        data: { pageTitle: 'DerivativeSubTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/derivative-sub-type/derivative-sub-type.module').then(m => m.DerivativeSubTypeModule),
      },
      {
        path: 'derivative-underlying-asset',
        data: { pageTitle: 'DerivativeUnderlyingAssets',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/derivative-underlying-asset/derivative-underlying-asset.module').then(m => m.DerivativeUnderlyingAssetModule),
      },
      {
        path: 'currency-authenticity-flag',
        data: { pageTitle: 'CurrencyAuthenticityFlags',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/currency-authenticity-flag/currency-authenticity-flag.module').then(m => m.CurrencyAuthenticityFlagModule),
      },
      {
        path: 'kenyan-currency-denomination',
        data: { pageTitle: 'KenyanCurrencyDenominations',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/kenyan-currency-denomination/kenyan-currency-denomination.module').then(m => m.KenyanCurrencyDenominationModule),
      },
      {
        path: 'currency-serviceability-flag',
        data: { pageTitle: 'CurrencyServiceabilityFlags',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/currency-serviceability-flag/currency-serviceability-flag.module').then(m => m.CurrencyServiceabilityFlagModule),
      },
      {
        path: 'remittance-flag',
        data: { pageTitle: 'RemittanceFlags',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/remittance-flag/remittance-flag.module').then(m => m.RemittanceFlagModule),
      },
      {
        path: 'sources-of-funds-type-code',
        data: { pageTitle: 'SourcesOfFundsTypeCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/sources-of-funds-type-code/sources-of-funds-type-code.module').then(m => m.SourcesOfFundsTypeCodeModule),
      },
      {
        path: 'source-remittance-purpose-type',
        data: { pageTitle: 'SourceRemittancePurposeTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/source-remittance-purpose-type/source-remittance-purpose-type.module').then(
            m => m.SourceRemittancePurposeTypeModule
          ),
      },
      {
        path: 'staff-current-employment-status',
        data: { pageTitle: 'StaffCurrentEmploymentStatuses',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/staff-current-employment-status/staff-current-employment-status.module').then(
            m => m.StaffCurrentEmploymentStatusModule
          ),
      },
      {
        path: 'staff-role-type',
        data: { pageTitle: 'StaffRoleTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/staff-role-type/staff-role-type.module').then(m => m.StaffRoleTypeModule),
      },
      {
        path: 'management-member-type',
        data: { pageTitle: 'ManagementMemberTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/management-member-type/management-member-type.module').then(m => m.ManagementMemberTypeModule),
      },
      {
        path: 'ultimate-beneficiary-types',
        data: { pageTitle: 'UltimateBeneficiaryTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/ultimate-beneficiary-types/ultimate-beneficiary-types.module').then(m => m.UltimateBeneficiaryTypesModule),
      },
      {
        path: 'bounced-cheque-categories',
        data: { pageTitle: 'BouncedChequeCategories',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/bounced-cheque-categories/bounced-cheque-categories.module').then(m => m.BouncedChequeCategoriesModule),
      },
      {
        path: 'reasons-for-bounced-cheque',
        data: { pageTitle: 'ReasonsForBouncedCheques',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/reasons-for-bounced-cheque/reasons-for-bounced-cheque.module').then(m => m.ReasonsForBouncedChequeModule),
      },
      {
        path: 'crb-account-holder-type',
        data: { pageTitle: 'CrbAccountHolderTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/crb-account-holder-type/crb-account-holder-type.module').then(m => m.CrbAccountHolderTypeModule),
      },
      {
        path: 'crb-account-status',
        data: { pageTitle: 'CrbAccountStatuses',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/crb-account-status/crb-account-status.module').then(m => m.CrbAccountStatusModule),
      },
      {
        path: 'crb-submitting-institution-category',
        data: { pageTitle: 'CrbSubmittingInstitutionCategories',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-submitting-institution-category/crb-submitting-institution-category.module').then(
            m => m.CrbSubmittingInstitutionCategoryModule
          ),
      },
      {
        path: 'crb-amount-category-band',
        data: { pageTitle: 'CrbAmountCategoryBands',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-amount-category-band/crb-amount-category-band.module').then(m => m.CrbAmountCategoryBandModule),
      },
      {
        path: 'crb-report-request-reasons',
        data: { pageTitle: 'CrbReportRequestReasons',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-report-request-reasons/crb-report-request-reasons.module').then(m => m.CrbReportRequestReasonsModule),
      },
      {
        path: 'crb-complaint-type',
        data: { pageTitle: 'CrbComplaintTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/crb-complaint-type/crb-complaint-type.module').then(m => m.CrbComplaintTypeModule),
      },
      {
        path: 'crb-complaint-status-type',
        data: { pageTitle: 'CrbComplaintStatusTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-complaint-status-type/crb-complaint-status-type.module').then(m => m.CrbComplaintStatusTypeModule),
      },
      {
        path: 'crb-record-file-type',
        data: { pageTitle: 'CrbRecordFileTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/crb-record-file-type/crb-record-file-type.module').then(m => m.CrbRecordFileTypeModule),
      },
      {
        path: 'crb-credit-application-status',
        data: { pageTitle: 'CrbCreditApplicationStatuses',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-credit-application-status/crb-credit-application-status.module').then(m => m.CrbCreditApplicationStatusModule),
      },
      {
        path: 'crb-customer-type',
        data: { pageTitle: 'CrbCustomerTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/crb-customer-type/crb-customer-type.module').then(m => m.CrbCustomerTypeModule),
      },
      {
        path: 'crb-subscription-status-type-code',
        data: { pageTitle: 'CrbSubscriptionStatusTypeCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-subscription-status-type-code/crb-subscription-status-type-code.module').then(
            m => m.CrbSubscriptionStatusTypeCodeModule
          ),
      },
      {
        path: 'crb-nature-of-information',
        data: { pageTitle: 'CrbNatureOfInformations',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-nature-of-information/crb-nature-of-information.module').then(m => m.CrbNatureOfInformationModule),
      },
      {
        path: 'crb-source-of-information-type',
        data: { pageTitle: 'CrbSourceOfInformationTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-source-of-information-type/crb-source-of-information-type.module').then(
            m => m.CrbSourceOfInformationTypeModule
          ),
      },
      {
        path: 'crb-product-service-fee-type',
        data: { pageTitle: 'CrbProductServiceFeeTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-product-service-fee-type/crb-product-service-fee-type.module').then(m => m.CrbProductServiceFeeTypeModule),
      },
      {
        path: 'crb-file-transmission-status',
        data: { pageTitle: 'CrbFileTransmissionStatuses',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-file-transmission-status/crb-file-transmission-status.module').then(m => m.CrbFileTransmissionStatusModule),
      },
      {
        path: 'crb-agent-service-type',
        data: { pageTitle: 'CrbAgentServiceTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/crb-agent-service-type/crb-agent-service-type.module').then(m => m.CrbAgentServiceTypeModule),
      },
      {
        path: 'crb-credit-facility-type',
        data: { pageTitle: 'CrbCreditFacilityTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-credit-facility-type/crb-credit-facility-type.module').then(m => m.CrbCreditFacilityTypeModule),
      },
      {
        path: 'crb-gl-code',
        data: { pageTitle: 'CrbGlCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/crb-gl-code/crb-gl-code.module').then(m => m.CrbGlCodeModule),
      },
      {
        path: 'crb-aging-bands',
        data: { pageTitle: 'CrbAgingBands',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/crb-aging-bands/crb-aging-bands.module').then(m => m.CrbAgingBandsModule),
      },
      {
        path: 'crb-report-view-band',
        data: { pageTitle: 'CrbReportViewBands',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/crb-report-view-band/crb-report-view-band.module').then(m => m.CrbReportViewBandModule),
      },
      {
        path: 'crb-data-submitting-institutions',
        data: { pageTitle: 'CrbDataSubmittingInstitutions',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/crb-data-submitting-institutions/crb-data-submitting-institutions.module').then(
            m => m.CrbDataSubmittingInstitutionsModule
          ),
      },
      {
        path: 'bank-transaction-type',
        data: { pageTitle: 'BankTransactionTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/bank-transaction-type/bank-transaction-type.module').then(m => m.BankTransactionTypeModule),
      },
      {
        path: 'agricultural-enterprise-activity-type',
        data: { pageTitle: 'AgriculturalEnterpriseActivityTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/agricultural-enterprise-activity-type/agricultural-enterprise-activity-type.module').then(
            m => m.AgriculturalEnterpriseActivityTypeModule
          ),
      },
      {
        path: 'interbank-sector-code',
        data: { pageTitle: 'InterbankSectorCodes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/interbank-sector-code/interbank-sector-code.module').then(m => m.InterbankSectorCodeModule),
      },
      {
        path: 'ultimate-beneficiary-category',
        data: { pageTitle: 'UltimateBeneficiaryCategories',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/ultimate-beneficiary-category/ultimate-beneficiary-category.module').then(m => m.UltimateBeneficiaryCategoryModule),
      },
      {
        path: 'issuers-of-securities',
        data: { pageTitle: 'IssuersOfSecurities',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/issuers-of-securities/issuers-of-securities.module').then(m => m.IssuersOfSecuritiesModule),
      },
      {
        path: 'loan-account-category',
        data: { pageTitle: 'LoanAccountCategories',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/loan-account-category/loan-account-category.module').then(m => m.LoanAccountCategoryModule),
      },
      {
        path: 'counterparty-type',
        data: { pageTitle: 'CounterpartyTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/counterparty-type/counterparty-type.module').then(m => m.CounterpartyTypeModule),
      },
      {
        path: 'counter-party-deal-type',
        data: { pageTitle: 'CounterPartyDealTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/counter-party-deal-type/counter-party-deal-type.module').then(m => m.CounterPartyDealTypeModule),
      },
      {
        path: 'counter-party-category',
        data: { pageTitle: 'CounterPartyCategories',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/counter-party-category/counter-party-category.module').then(m => m.CounterPartyCategoryModule),
      },
      {
        path: 'acquiring-issuing-flag',
        data: { pageTitle: 'AcquiringIssuingFlags',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/acquiring-issuing-flag/acquiring-issuing-flag.module').then(m => m.AcquiringIssuingFlagModule),
      },
      {
        path: 'credit-card-ownership',
        data: { pageTitle: 'CreditCardOwnerships',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/credit-card-ownership/credit-card-ownership.module').then(m => m.CreditCardOwnershipModule),
      },
      {
        path: 'category-of-security',
        data: { pageTitle: 'CategoryOfSecurities',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/category-of-security/category-of-security.module').then(m => m.CategoryOfSecurityModule),
      },
      {
        path: 'nature-of-customer-complaints',
        data: { pageTitle: 'NatureOfCustomerComplaints',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/nature-of-customer-complaints/nature-of-customer-complaints.module').then(m => m.NatureOfCustomerComplaintsModule),
      },
      {
        path: 'gdi-master-data-index',
        data: { pageTitle: 'GdiMasterDataIndices',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/gdi-master-data-index/gdi-master-data-index.module').then(m => m.GdiMasterDataIndexModule),
      },
      {
        path: 'gdi-transaction-data-index',
        data: { pageTitle: 'GdiTransactionDataIndices',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./master/gdi-transaction-data-index/gdi-transaction-data-index.module').then(m => m.GdiTransactionDataIndexModule),
      },
      {
        path: 'product-type',
        data: { pageTitle: 'ProductTypes',
          authorities: ['ROLE_GRANULAR_REPORTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./master/product-type/product-type.module').then(m => m.ProductTypeModule),
      },
      {
        path: 'agent-banking-activity',
        data: { pageTitle: 'AgentBankingActivities' },
        loadChildren: () =>
          import('./gdi-data/agent-banking-activity/agent-banking-activity.module').then(m => m.AgentBankingActivityModule),
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
    ]),
  ]
})
export class ErpGDIModule {}
