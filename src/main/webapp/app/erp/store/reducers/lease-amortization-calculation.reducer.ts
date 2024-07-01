import { Action, createReducer, on } from '@ngrx/store';
import { initialState, State } from '../global-store.definition';
import { ILeaseAmortizationCalculation } from '../../erp-leases/lease-amortization-calculation/lease-amortization-calculation.model';
import {
  leaseAmortizationCalculationCopyWorkflowInitiatedEnRoute,
  leaseAmortizationCalculationCopyWorkflowInitiatedFromList,
  leaseAmortizationCalculationCopyWorkflowInitiatedFromView,
  leaseAmortizationCalculationCreationInitiatedEnRoute,
  leaseAmortizationCalculationCreationInitiatedFromList,
  leaseAmortizationCalculationCreationWorkflowInitiatedFromList,
  leaseAmortizationCalculationEditWorkflowInitiatedEnRoute,
  leaseAmortizationCalculationEditWorkflowInitiatedFromList,
  leaseAmortizationCalculationEditWorkflowInitiatedFromView,
} from '../actions/lease-amortization-calculation.actions';

export const leaseAmortizationCalculationFormStateSelector = 'leaseAmortizationCalculationForm';

export interface LeaseAmortizationCalculationFormState {
  backEndFetchComplete: boolean;
  browserHasBeenRefreshed: boolean;
  selectedInstance: ILeaseAmortizationCalculation;
  weAreCopying: boolean;
  weAreEditing: boolean;
  weAreCreating: boolean;
}

const _leaseAmortizationCalculationStateReducer = createReducer(
  initialState,

  // workflows for creation
  on(leaseAmortizationCalculationCreationWorkflowInitiatedFromList, (state) => ({
    ...state,
    leaseAmortizationCalculationFormState: {
      ...state.leaseAmortizationCalculationFormState,
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  //    workflows for copy
  on(leaseAmortizationCalculationCopyWorkflowInitiatedEnRoute, (state, {copiedInstance}) => ({
    ...state,
    leaseAmortizationCalculationFormState: {
      ...state.leaseAmortizationCalculationFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(leaseAmortizationCalculationCopyWorkflowInitiatedFromView, (state, {copiedInstance}) => ({
    ...state,
    leaseAmortizationCalculationFormState: {
      ...state.leaseAmortizationCalculationFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(leaseAmortizationCalculationCopyWorkflowInitiatedFromList, (state, {copiedInstance}) => ({
    ...state,
    leaseAmortizationCalculationFormState: {
      ...state.leaseAmortizationCalculationFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),


  //    workflows for edit workflows
  on(leaseAmortizationCalculationEditWorkflowInitiatedEnRoute, (state, {editedInstance}) => ({
    ...state,
    leaseAmortizationCalculationFormState: {
      ...state.leaseAmortizationCalculationFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(leaseAmortizationCalculationEditWorkflowInitiatedFromView, (state, {editedInstance}) => ({
    ...state,
    leaseAmortizationCalculationFormState: {
      ...state.leaseAmortizationCalculationFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(leaseAmortizationCalculationEditWorkflowInitiatedFromList, (state, {editedInstance}) => ({
    ...state,
    leaseAmortizationCalculationFormState: {
      ...state.leaseAmortizationCalculationFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(leaseAmortizationCalculationCreationInitiatedFromList, (state) => ({
    ...state,
    leaseAmortizationCalculationFormState: {
      ...state.leaseAmortizationCalculationFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  on(leaseAmortizationCalculationCreationInitiatedEnRoute, (state) => ({
    ...state,
    leaseAmortizationCalculationFormState: {
      ...state.leaseAmortizationCalculationFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),
);

export function leaseAmortizationCalculationStateReducer(state: State = initialState, action: Action): State {

  return _leaseAmortizationCalculationStateReducer(state, action);
}
