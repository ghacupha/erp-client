import {Action, createReducer, on} from "@ngrx/store";
import {initialState, State} from "../global-store.definition";
import {
  addPaymentToInvoiceButtonClicked,
  dealerAcquiredForInvoicedPayment, dealerInvoicePaymentWorkflowCancelled,
  dealerInvoiceStateReset,
  invoiceAcquiredForPaymentWithLabels,
  invoiceAcquiredForPaymentWithPlaceholders,
  paymentToInvoiceDealerConcluded,
  recordDealerInvoiceButtonClicked,
  recordInvoicePaymentButtonClicked,
  selectedInvoiceForUpdateAcquired,
  selectedInvoiceUpdatedRequisitioned,
  selectedInvoiceUpdatedWithPaymentSuccessfully,
  selectedInvoiceUpdateWithPaymentErrored
} from "../actions/dealer-invoice-workflows-status.actions";
import { IDealer } from '../../erp-common/models/dealer.model';
import { IInvoice } from '../../erp-common/models/invoice.model';
import { IPayment } from '../../erp-common/models/payment.model';
import { IPaymentLabel } from '../../erp-common/models/payment-label.model';
import { IPlaceholder } from '../../erp-common/models/placeholder.model';

export const dealerInvoiceWorkflowStateSelector = 'recordDealerInvoiceWorkflows'

export interface DealerInvoiceWorkflowState {
  invoiceDealer: IDealer,
  selectedInvoice: IInvoice,
  invoicePayment: IPayment,
  selectedInvoiceLabels: IPaymentLabel[],
  selectedInvoicePlaceholders: IPlaceholder[],
  weArePayingAnInvoiceDealer: boolean,
  errorMessage: string
}

const _dealerInvoiceWorkflowStateReducer= createReducer(
    initialState,

    on(recordDealerInvoiceButtonClicked, (state, {selectedDealer}) => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        invoiceDealer: selectedDealer,
        weArePayingAnInvoiceDealer: true,
      }
    })),

    on(recordInvoicePaymentButtonClicked, (state, {selectedInvoice}) => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        selectedInvoice,
        weArePayingAnInvoiceDealer: true
      }
    })),

    on(dealerInvoicePaymentWorkflowCancelled, (state) => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        selectedInvoice: {},
        invoiceDealer: {},
        weArePayingAnInvoiceDealer: false,
        invoicePayment: {},
        selectedInvoiceLabels: [],
        selectedInvoicePlaceholders: [],
        errorMessage: '',
      }
    })),

    on(addPaymentToInvoiceButtonClicked, (state, {selectedInvoice, selectedDealer}) => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        selectedInvoice,
        invoiceDealer: selectedDealer,
        weArePayingAnInvoiceDealer: true
      }
    })),

    on(dealerAcquiredForInvoicedPayment, (state, {paymentLabels, placeholders,}) => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        paymentLabels,
        placeholders,
        weArePayingAnInvoiceDealer: true
      }
    })),

    on(invoiceAcquiredForPaymentWithLabels, (state, {paymentLabels}) => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        paymentLabels,
        weArePayingAnInvoiceDealer: true
      }
    })),

    on(invoiceAcquiredForPaymentWithPlaceholders, (state, {placeholders}) => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        placeholders,
        weArePayingAnInvoiceDealer: true
      }
    })),

    on(paymentToInvoiceDealerConcluded, state => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        invoiceDealer: {},
        selectedInvoice: {},
        weArePayingAnInvoiceDealer: false,
        invoicePayment: {},
        selectedInvoiceLabels: [],
        selectedInvoicePlaceholders: [],
        errorMessage: '',
      }
    })),

    on(selectedInvoiceUpdatedWithPaymentSuccessfully, state => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        selectedPayment: {},
        selectedInvoice: {},
      }
    })),

    on(selectedInvoiceUpdatedRequisitioned, state => ({
      ...state,
    })),

    on(selectedInvoiceForUpdateAcquired, (state, {acquiredInvoice}) => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        selectedInvoice: acquiredInvoice,
      }
    })),

    on(selectedInvoiceUpdateWithPaymentErrored, (state, {error}) => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        errorMessage: error
      }
    })),

    on(dealerInvoiceStateReset, state => ({
      ...state,
      dealerInvoiceWorkflowState: {
        ...state.dealerInvoiceWorkflowState,
        invoiceDealer: {},
        selectedInvoice: {},
        weArePayingAnInvoiceDealer: false,
        selectedPayment: {},
        selectedInvoiceLabels: [],
        selectedInvoicePlaceholders: [],
        errorMessage: '',
      }
    })),

  );

export function dealerInvoiceWorkflowStateReducer(state: State = initialState, action: Action): State {

  return _dealerInvoiceWorkflowStateReducer(state, action);
}
