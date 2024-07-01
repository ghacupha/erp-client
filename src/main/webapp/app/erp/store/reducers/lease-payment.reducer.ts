import { Action, createReducer, on } from '@ngrx/store';
import { initialState, State } from '../global-store.definition';
import { ILeasePayment } from '../../erp-leases/lease-payment/lease-payment.model';
import {
  leasePaymentCopyWorkflowInitiatedEnRoute, leasePaymentCopyWorkflowInitiatedFromList,
  leasePaymentCopyWorkflowInitiatedFromView, leasePaymentCreationInitiatedEnRoute,
  leasePaymentCreationInitiatedFromList,
  leasePaymentCreationWorkflowInitiatedFromList, leasePaymentEditWorkflowInitiatedEnRoute,
  leasePaymentEditWorkflowInitiatedFromList, leasePaymentEditWorkflowInitiatedFromView
} from '../actions/lease-payment.actions';

export const leasePaymentFormStateSelector = 'leasePaymentForm';

export interface LeasePaymentFormState {
  backEndFetchComplete: boolean;
  browserHasBeenRefreshed: boolean;
  selectedInstance: ILeasePayment ;
  weAreCopying: boolean;
  weAreEditing: boolean;
  weAreCreating: boolean;
}

const _leasePaymentStateReducer = createReducer(
  initialState,

  // workflows for creation
  on(leasePaymentCreationWorkflowInitiatedFromList, (state) => ({
    ...state,
    leasePaymentFormState: {
      ...state.leasePaymentFormState,
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  //    workflows for copy
  on(leasePaymentCopyWorkflowInitiatedEnRoute, (state, {copiedInstance}) => ({
    ...state,
    leasePaymentFormState: {
      ...state.leasePaymentFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(leasePaymentCopyWorkflowInitiatedFromView, (state, {copiedInstance}) => ({
    ...state,
    leasePaymentFormState: {
      ...state.leasePaymentFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(leasePaymentCopyWorkflowInitiatedFromList, (state, {copiedInstance}) => ({
    ...state,
    leasePaymentFormState: {
      ...state.leasePaymentFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),


  //    workflows for edit workflows
  on(leasePaymentEditWorkflowInitiatedEnRoute, (state, {editedInstance}) => ({
    ...state,
    leasePaymentFormState: {
      ...state.leasePaymentFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(leasePaymentEditWorkflowInitiatedFromView, (state, {editedInstance}) => ({
    ...state,
    leasePaymentFormState: {
      ...state.leasePaymentFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(leasePaymentEditWorkflowInitiatedFromList, (state, {editedInstance}) => ({
    ...state,
    leasePaymentFormState: {
      ...state.leasePaymentFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(leasePaymentCreationInitiatedFromList, (state) => ({
    ...state,
    leasePaymentFormState: {
      ...state.leasePaymentFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  on(leasePaymentCreationInitiatedEnRoute, (state) => ({
    ...state,
    leasePaymentFormState: {
      ...state.leasePaymentFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),
);

export function leasePaymentStateReducer(state: State = initialState, action: Action): State {

  return _leasePaymentStateReducer(state, action);
}
