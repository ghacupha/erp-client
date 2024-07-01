import { Action, createReducer, on } from '@ngrx/store';
import { initialState, State } from '../global-store.definition';
import { ILeaseLiability } from '../../erp-leases/lease-liability/lease-liability.model';
import {
  leaseLiabilityCopyWorkflowInitiatedEnRoute,
  leaseLiabilityCopyWorkflowInitiatedFromList,
  leaseLiabilityCopyWorkflowInitiatedFromView,
  leaseLiabilityCreationInitiatedEnRoute, leaseLiabilityCreationInitiatedFromList,
  leaseLiabilityCreationWorkflowInitiatedFromList,
  leaseLiabilityEditWorkflowInitiatedEnRoute,
  leaseLiabilityEditWorkflowInitiatedFromList,
  leaseLiabilityEditWorkflowInitiatedFromView
} from '../actions/lease-liability.actions';

export const leaseLiabilityFormStateSelector = 'leaseLiabilityForm';

export interface LeaseLiabilityFormState {
  backEndFetchComplete: boolean;
  browserHasBeenRefreshed: boolean;
  selectedInstance: ILeaseLiability;
  weAreCopying: boolean;
  weAreEditing: boolean;
  weAreCreating: boolean;
}

const _leaseLiabilityStateReducer = createReducer(
  initialState,

  // workflows for creation
  on(leaseLiabilityCreationWorkflowInitiatedFromList, (state) => ({
    ...state,
    leaseLiabilityFormState: {
      ...state.leaseLiabilityFormState,
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  //    workflows for copy
  on(leaseLiabilityCopyWorkflowInitiatedEnRoute, (state, {copiedInstance}) => ({
    ...state,
    leaseLiabilityFormState: {
      ...state.leaseLiabilityFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(leaseLiabilityCopyWorkflowInitiatedFromView, (state, {copiedInstance}) => ({
    ...state,
    leaseLiabilityFormState: {
      ...state.leaseLiabilityFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(leaseLiabilityCopyWorkflowInitiatedFromList, (state, {copiedInstance}) => ({
    ...state,
    leaseLiabilityFormState: {
      ...state.leaseLiabilityFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),


  //    workflows for edit workflows
  on(leaseLiabilityEditWorkflowInitiatedEnRoute, (state, {editedInstance}) => ({
    ...state,
    leaseLiabilityFormState: {
      ...state.leaseLiabilityFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(leaseLiabilityEditWorkflowInitiatedFromView, (state, {editedInstance}) => ({
    ...state,
    leaseLiabilityFormState: {
      ...state.leaseLiabilityFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(leaseLiabilityEditWorkflowInitiatedFromList, (state, {editedInstance}) => ({
    ...state,
    leaseLiabilityFormState: {
      ...state.leaseLiabilityFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(leaseLiabilityCreationInitiatedFromList, (state) => ({
    ...state,
    leaseLiabilityFormState: {
      ...state.leaseLiabilityFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  on(leaseLiabilityCreationInitiatedEnRoute, (state) => ({
    ...state,
    leaseLiabilityFormState: {
      ...state.leaseLiabilityFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),
);

export function leaseLiabilityStateReducer(state: State = initialState, action: Action): State {

  return _leaseLiabilityStateReducer(state, action);
}
