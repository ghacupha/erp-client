import {Action, createReducer, on} from '@ngrx/store';
import {initialState, State} from '../global-store.definition';
import {
  dealerAcquiredForPayment, dealerPaymentCategoryRequisitionFailed,
  payDealerButtonClicked, paymentCategoryAcquiredForPayment,
  paymentToDealerCompleted, paymentToDealerReset,
} from '../actions/dealer-workflows-status.actions';
import {IPaymentCategory} from '../../erp-common/models/payment-category.model';
import { IDealer } from '../../erp-common/models/dealer.model';
import { IPayment } from '../../erp-common/models/payment.model';

export const paymentToDealerWorkflowStateSelector = 'paymentToDealerWorkflows'

export interface DealerWorkflowState {
  selectedDealer: IDealer,
  dealerPayment: IPayment,
  paymentDealerCategory: IPaymentCategory | null,
  weArePayingADealer: boolean,
  errorMessage: string
}

const _dealerWorkflowStateReducer= createReducer(
  initialState,

  on(payDealerButtonClicked, (state, {selectedDealer, paymentDealerCategory}) => ({
     ...state,
    dealerWorkflowState: {
       ...state.dealerWorkflowState,
      selectedDealer,
      paymentDealerCategory,
      weArePayingADealer: true
    }
   })),

  on(paymentCategoryAcquiredForPayment, (state, {paymentDealerCategory}) => ({
     ...state,
    dealerWorkflowState: {
       ...state.dealerWorkflowState,
      paymentDealerCategory,
      weArePayingADealer: true
    }
   })),

  on(dealerPaymentCategoryRequisitionFailed, (state, {error}) => ({
     ...state,
    dealerWorkflowState: {
       ...state.dealerWorkflowState,
      paymentDealerCategory: {},
      errorMessage: error
    }
   })),

  on(dealerAcquiredForPayment, (state, {selectedDealer}) => ({
     ...state,
    dealerWorkflowState: {
       ...state.dealerWorkflowState,
      selectedDealer,
      weArePayingADealer: true
    }
   })),

  on(paymentToDealerReset, (state) => ({
    ...state,
    dealerWorkflowState: {
      ...state.dealerWorkflowState,
      selectedDealer: {},
      paymentDealerCategory: {},
      weArePayingADealer: false
    }
  })),

  on(paymentToDealerCompleted, (state) => ({
    ...state,
    dealerWorkflowState: {
      ...state.dealerWorkflowState,
      paymentDealerCategory: {},
      weArePayingADealer: false
    }
  })),
);

export function dealerWorkflowStateReducer(state: State = initialState, action: Action): State {

  return _dealerWorkflowStateReducer(state, action);
}

