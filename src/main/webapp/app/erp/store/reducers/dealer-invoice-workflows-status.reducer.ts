import {IDealer} from "../../erp-pages/dealers/dealer/dealer.model";
import {IInvoice} from "../../erp-pages/payments/invoice/invoice.model";
import {Action, createReducer, on} from "@ngrx/store";
import {initialState, State} from "../global-store.definition";
import {
  dealerInvoiceStateReset,
  recordDealerInvoiceButtonClicked, recordInvoicePaymentButtonClicked
} from "../actions/dealer-invoice-workflows-status.actions";

export const dealerInvoiceWorkflowStateSelector = 'recordDealerInvoiceWorkflows'

export interface DealerInvoiceWorkflowState {
  selectedDealer: IDealer,
  selectedInvoice: IInvoice,
  errorMessage: string
}

const _dealerInvoiceWorkflowStateReducer= createReducer(
  initialState,

  on(recordDealerInvoiceButtonClicked, (state, {selectedDealer}) => ({
    ...state,
    dealerInvoiceWorkflowState: {
      ...state.dealerInvoiceWorkflowState,
      selectedDealer,
    }
  })),

  on(recordInvoicePaymentButtonClicked, (state, {selectedInvoice}) => ({
    ...state,
    dealerInvoiceWorkflowState: {
      ...state.dealerInvoiceWorkflowState,
      selectedInvoice,
    }
  })),

  on(dealerInvoiceStateReset, state => ({
    ...state,
    dealerInvoiceWorkflowState: {
      ...state.dealerInvoiceWorkflowState,
      selectedDealer: {},
      selectedInvoice: {},
      errorMessage: '',
    }
  })),

);

export function dealerInvoiceWorkflowStateReducer(state: State = initialState, action: Action): State {

  return _dealerInvoiceWorkflowStateReducer(state, action);
}