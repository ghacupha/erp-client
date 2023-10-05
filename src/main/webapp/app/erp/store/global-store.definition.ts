///
/// Erp System - Mark VI No 1 (Phoebe Series) Client 1.5.3
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

import {PaymentsFormState} from "./reducers/update-menu-status.reducer";
import {DealerWorkflowState} from "./reducers/dealer-workflows-status.reducer";
import {DealerInvoiceWorkflowState} from "./reducers/dealer-invoice-workflows-status.reducer";
import { SettlementsFormState } from './reducers/settlement-update-menu-status.reducer';
import { AssetRegistrationFormState } from './reducers/asset-registration-workflow-status.reducer';
import { AssetAccessoryFormState } from './reducers/asset-accessory-workflow-status.reducer';
import { WIPRegistrationFormState } from './reducers/wip-registration-workflow-status.reducer';
import { PaymentInvoiceFormState } from './reducers/payment-invoice-workflow-status.reducer';

export interface State {
  paymentsFormState: PaymentsFormState,
  settlementsFormState: SettlementsFormState,
  dealerWorkflowState: DealerWorkflowState,
  dealerInvoiceWorkflowState: DealerInvoiceWorkflowState,
  assetRegistrationFormState: AssetRegistrationFormState,
  assetAccessoryFormState: AssetAccessoryFormState,
  wipRegistrationFormState: WIPRegistrationFormState
  paymentInvoiceFormState: PaymentInvoiceFormState,
}

export const initialState: State = {
  paymentsFormState: {
    selectedPayment: {},
    weAreCopying: false,
    weAreEditing: false,
    weAreCreating: false,
  },
  settlementsFormState: {
    selectedSettlement: {},
    browserHasBeenRefreshed: false,
    backEndFetchComplete: false,
    weAreCopying: false,
    weAreEditing: false,
    weAreCreating: false,
  },
  assetRegistrationFormState: {
    selectedInstance: {},
    browserHasBeenRefreshed: false,
    backEndFetchComplete: false,
    weAreCopying: false,
    weAreEditing: false,
    weAreCreating: false,
  },
  wipRegistrationFormState: {
    selectedInstance: {},
    browserHasBeenRefreshed: false,
    backEndFetchComplete: false,
    weAreCopying: false,
    weAreEditing: false,
    weAreCreating: false,
  },
  assetAccessoryFormState: {
    selectedInstance: {},
    browserHasBeenRefreshed: false,
    backEndFetchComplete: false,
    weAreCopying: false,
    weAreEditing: false,
    weAreCreating: false,
  },
  paymentInvoiceFormState: {
    selectedInstance: {},
    browserHasBeenRefreshed: false,
    backEndFetchComplete: false,
    weAreCopying: false,
    weAreEditing: false,
    weAreCreating: false,
  },
  dealerWorkflowState: {
    selectedDealer: {},
    dealerPayment: {},
    paymentDealerCategory: {},
    weArePayingADealer: false,
    errorMessage: '',
  },
  dealerInvoiceWorkflowState: {
    invoiceDealer: {},
    selectedInvoice: {},
    invoicePayment: {},
    selectedInvoiceLabels: [],
    selectedInvoicePlaceholders: [],
    weArePayingAnInvoiceDealer: false,
    errorMessage: '',
  }
}
