import {Action, createReducer, on} from "@ngrx/store";
import {initialState, State} from "../global-store.definition";
import {
  newPaymentButtonClicked,
  paymentCopyButtonClicked,
  paymentCopyInitiated,
  paymentEditInitiated,
  paymentSaveButtonClicked,
  paymentUpdateButtonClicked,
  paymentUpdateCancelButtonClicked,
  paymentUpdateConcluded,
  paymentUpdateErrorHasOccurred
} from "../actions/update-menu-status.actions";
import { IPayment } from '../../erp-pages/payments/payment/payment.model';

export const paymentUpdateFormStateSelector = 'paymentUpdateForm';

export interface PaymentsFormState {
  selectedPayment: IPayment,
  weAreCopying: boolean
  weAreEditing: boolean
  weAreCreating: boolean
}

const _paymentUpdateStateReducer = createReducer(
  initialState,

  on(paymentCopyInitiated, (state, {copiedPayment}) => ({
    ...state,
    paymentsFormState: {
      ...state.paymentsFormState,
      selectedPayment: copiedPayment,
      weAreCopying: true
    }
  })),

  on(paymentCopyButtonClicked, (state) => ({
    ...state,
    paymentsFormState: {
      ...state.paymentsFormState,
      weAreCopying: false
    }
  })),

  on(paymentEditInitiated, (state, {editPayment}) => ({
    ...state,
    paymentsFormState: {
      ...state.paymentsFormState,
      selectedPayment: editPayment,
      weAreEditing: true
    }
  })),

  on(paymentUpdateButtonClicked, state => ({
    ...state,
    paymentsFormState: {
      ...state.paymentsFormState,
      selectedPayment: {},
      weAreEditing: false
    }
  })),

  on(paymentUpdateConcluded, state => ({
    ...state,
    paymentsFormState: {
      ...state.paymentsFormState,
      selectedPayment: {},
      weAreEditing: false,
      weAreCopying: false,
      weAreCreating: false
    }
  })),

  on(newPaymentButtonClicked, (state, {newPayment}) => ({
      ...state,
      paymentsFormState: {
        ...state.paymentsFormState,
        selectedPayment: newPayment,
        weAreCreating: true
      }
    }
  )),

  on(paymentSaveButtonClicked, state => ({
      ...state,
      paymentsFormState: {
        ...state.paymentsFormState,
        selectedPayment: {},
        weAreCreating: false
      }
    }
  )),

  on(paymentUpdateCancelButtonClicked, state => ({
      ...state,
      paymentsFormState: {
        ...state.paymentsFormState,
        selectedPayment: {},
        weAreCreating: false,
        weAreEditing: false,
        weAreCopying: false,
      }
    }
  )),

  on(paymentUpdateErrorHasOccurred, state => ({
      ...state,
      paymentsFormState: {
        ...state.paymentsFormState,
        selectedPayment: {},
        weAreCreating: false,
        weAreEditing: false,
        weAreCopying: false,
      }
    }
  )),
);

export function paymentUpdateStateReducer(state: State = initialState, action: Action): State {

  return _paymentUpdateStateReducer(state, action);
}
