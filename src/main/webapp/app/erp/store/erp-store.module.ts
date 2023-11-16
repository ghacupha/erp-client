///
/// Erp System - Mark VII No 5 (Gideon Series) Client 1.5.8
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

import {NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {DealerPaymentsEffects} from "./effects/dealer-payments.effects";
import {DealerInvoiceWorkflowEffects} from "./effects/dealer-invoice-workflow.effects";
import { SettlementUpdatesEffects } from './effects/settlement-updates.effects';

import * as fromDealerInvoiceWorkflows from "./reducers/dealer-invoice-workflows-status.reducer";
import * as fromDealerWorkflows from "./reducers/dealer-workflows-status.reducer";
import * as fromPaymentUpdates from "./reducers/update-menu-status.reducer";
import * as fromSettlementUpdates from "./reducers/settlement-update-menu-status.reducer";
import * as fromAssetRegistrationUpdates from "./reducers/asset-registration-workflow-status.reducer";
import * as fromAssetAccessoryUpdates from "./reducers/asset-accessory-workflow-status.reducer";
import * as fromWIPRegistrationUpdates from "./reducers/wip-registration-workflow-status.reducer";
import * as fromPaymentInvoiceUpdates from "./reducers/payment-invoice-workflow-status.reducer";
import * as fromReportNavigationProfile from "./reducers/report-navigation-profile-status.reducer";

@NgModule({
  imports: [
    EffectsModule.forRoot([SettlementUpdatesEffects, DealerInvoiceWorkflowEffects, DealerPaymentsEffects]),
    EffectsModule.forFeature([]),
    StoreModule.forRoot({}, {runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      }}),
    StoreDevtoolsModule.instrument({
      name: 'ERP App States',
      maxAge: 25, // Retains last 25 states
    }),
    StoreModule.forFeature('recordDealerInvoiceWorkflows', fromDealerInvoiceWorkflows.dealerInvoiceWorkflowStateReducer),
    StoreModule.forFeature('paymentToDealerWorkflows', fromDealerWorkflows.dealerWorkflowStateReducer),
    StoreModule.forFeature('paymentUpdateForm', fromPaymentUpdates.paymentUpdateStateReducer),
    StoreModule.forFeature('settlementUpdateForm', fromSettlementUpdates.settlementUpdateStateReducer),
    StoreModule.forFeature('assetRegistrationUpdateForm', fromAssetRegistrationUpdates.assetRegistrationUpdateStateReducer),
    StoreModule.forFeature('assetAccessoryUpdateForm', fromAssetAccessoryUpdates.assetAccessoryUpdateStateReducer),
    StoreModule.forFeature('wipRegistrationUpdateForm', fromWIPRegistrationUpdates.wipRegistrationUpdateStateReducer),
    StoreModule.forFeature('paymentInvoiceUpdateForm', fromPaymentInvoiceUpdates.paymentInvoiceUpdateStateReducer),
    StoreModule.forFeature('reportNavigationProfileState', fromReportNavigationProfile.reportNavigationProfileStateReducer),
  ],
  exports: [
    EffectsModule,
    StoreModule,
    StoreDevtoolsModule,
  ]
})
export class ErpStoreModule {}
