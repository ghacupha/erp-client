import { Action, createReducer, on } from '@ngrx/store';
import { initialState, State } from '../global-store.definition';
import {
  newSettlementCreationSequenceInitiatedFomList,
  settlementCopyWorkflowInitiatedEnRoute,
  settlementCopyWorkflowInitiatedFromDetails,
  settlementCopyWorkflowInitiatedFromList,
  settlementCreationWorkflowInitiatedEnRoute,
  settlementCreationWorkflowInitiatedFromList,
  settlementCreationWorkflowInitiatedFromUpdateFormOnInit,
  settlementCreationWorkflowRefreshedFromForm,
  settlementEditWorkflowInitiatedFromDetails,
  settlementEditWorkflowInitiatedFromList,
  settlementUpdateCancelButtonClicked,
  settlementUpdateCopyHasBeenFinalized,
  settlementUpdateEditHasBeenFinalized,
  settlementUpdateErrorHasOccurred, settlementUpdateFormHasBeenDestroyed,
  settlementUpdateInstanceAcquiredFromBackend,
  settlementUpdateInstanceAcquisitionFromBackendFailed,
  settlementUpdatePreviousStateMethodCalled,
  settlementUpdateSaveHasBeenFinalized
} from '../actions/settlement-update-menu.actions';
import { ISettlement } from '../../erp-settlements/settlement/settlement.model';

export const settlementUpdateFormStateSelector = 'settlementUpdateForm';

export interface SettlementsFormState {
  backEndFetchComplete: boolean;
  browserHasBeenRefreshed: boolean;
  selectedSettlement: ISettlement;
  weAreCopying: boolean;
  weAreEditing: boolean;
  weAreCreating: boolean;
}

const _settlementUpdateStateReducer = createReducer(
  initialState,

  on(settlementCreationWorkflowInitiatedFromList, (state) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  on(settlementCreationWorkflowInitiatedEnRoute, (state) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  on(settlementCreationWorkflowInitiatedFromUpdateFormOnInit, (state, {copiedPartialSettlement}) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      selectedSettlement: copiedPartialSettlement,
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
      browserHasBeenRefreshed: true,
    }
  })),

  on(settlementCreationWorkflowRefreshedFromForm, (state, {copiedPartialSettlement}) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      selectedSettlement: copiedPartialSettlement,
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
      browserHasBeenRefreshed: true,
    }
  })),

  on(settlementUpdateFormHasBeenDestroyed, (state, {copiedPartialSettlement}) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      selectedSettlement: copiedPartialSettlement,
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
      browserHasBeenRefreshed: true,
    }
  })),

  on(settlementCopyWorkflowInitiatedFromDetails, (state, {copiedSettlement}) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      selectedSettlement: copiedSettlement,
      weAreCopying: true,
      weAreEditing: false
    }
  })),

  on(settlementCopyWorkflowInitiatedEnRoute, (state) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      // selectedSettlement: copiedSettlement,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(settlementCopyWorkflowInitiatedFromList, (state, {copiedSettlement}) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      selectedSettlement: copiedSettlement,
      weAreCopying: true,
      weAreEditing: false
    }
  })),

  on(settlementEditWorkflowInitiatedFromDetails, (state, {editedSettlement}) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      selectedSettlement: editedSettlement,
      weAreCopying: false,
      weAreEditing: true
    }
  })),

  on(settlementEditWorkflowInitiatedFromList, (state, {editedSettlement}) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      selectedSettlement: editedSettlement,
      weAreCopying: false,
      weAreEditing: true
    }
  })),

  on(newSettlementCreationSequenceInitiatedFomList, (state, {newSettlement}) => ({
      ...state,
      settlementsFormState: {
        ...state.settlementsFormState,
        selectedPayment: newSettlement,
        weAreCreating: true,
        weAreCopying: false,
        weAreEditing: false
      }
    }
  )),

  on(settlementUpdateInstanceAcquiredFromBackend, (state, { backendAcquiredSettlement }) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      selectedPayment: backendAcquiredSettlement,
      backEndFetchComplete: true,
    }
  })),

  on(settlementUpdateInstanceAcquisitionFromBackendFailed, (state, {error}) => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      selectedPayment: {},
      errorMessage: error,
      backEndFetchComplete: false,
    }
  })),

  // TODO IMPLEMENT REMAINING SETTLEMENT STATES
  // on(paymentCopyButtonClicked, (state) => ({
  //   ...state,
  //   paymentsFormState: {
  //     ...state.paymentsFormState,
  //     weAreCopying: false
  //   }
  // })),

  on(settlementUpdatePreviousStateMethodCalled, state => ({
    ...state,
    settlementsFormState: {
      ...state.settlementsFormState,
      selectedPayment: {},
      weAreEditing: false,
      weAreCopying: false,
      weAreCreating: false,
      browserHasBeenRefreshed: false,
    }
  })),


  on(settlementUpdateSaveHasBeenFinalized, state => ({
      ...state,
      settlementsFormState: {
        ...state.settlementsFormState,
        selectedPayment: {},
        weAreCreating: false,
        weAreEditing: false,
        weAreCopying: false,
        browserHasBeenRefreshed: false,
      }
    }
  )),

  on(settlementUpdateCopyHasBeenFinalized, state => ({
      ...state,
      settlementsFormState: {
        ...state.settlementsFormState,
        selectedPayment: {},
        weAreCreating: false,
        weAreEditing: false,
        weAreCopying: false,
        browserHasBeenRefreshed: false,
      }
    }
  )),

  on(settlementUpdateEditHasBeenFinalized, state => ({
      ...state,
      settlementsFormState: {
        ...state.settlementsFormState,
        selectedPayment: {},
        weAreCreating: false,
        weAreEditing: false,
        weAreCopying: false,
        browserHasBeenRefreshed: false,
      }
    }
  )),

  on(settlementUpdateCancelButtonClicked, state => ({
      ...state,
      settlementsFormState: {
        ...state.settlementsFormState,
        selectedPayment: {},
        weAreCreating: false,
        weAreEditing: false,
        weAreCopying: false,
        browserHasBeenRefreshed: false,
      }
    }
  )),

  on(settlementUpdateErrorHasOccurred, state => ({
      ...state,
      settlementsFormState: {
        ...state.settlementsFormState,
        selectedPayment: {},
        weAreCreating: false,
        weAreEditing: false,
        weAreCopying: false,
        browserHasBeenRefreshed: false,
      }
    }
  )),
);

export function settlementUpdateStateReducer(state: State = initialState, action: Action): State {

  return _settlementUpdateStateReducer(state, action);
}
