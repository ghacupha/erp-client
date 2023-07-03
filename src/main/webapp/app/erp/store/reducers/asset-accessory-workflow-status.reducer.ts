import { IAssetAccessory } from '../../erp-assets/asset-accessory/asset-accessory.model';
import { Action, createReducer, on } from '@ngrx/store';
import { initialState, State } from '../global-store.definition';
import {
  assetAccessoryCopyWorkflowInitiatedEnRoute,
  assetAccessoryCopyWorkflowInitiatedFromList,
  assetAccessoryCopyWorkflowInitiatedFromView,
  assetAccessoryCreationInitiatedEnRoute,
  assetAccessoryCreationInitiatedFromList,
  assetAccessoryCreationWorkflowInitiatedFromList,
  assetAccessoryDataHasMutated,
  assetAccessoryEditWorkflowInitiatedEnRoute,
  assetAccessoryEditWorkflowInitiatedFromList,
  assetAccessoryEditWorkflowInitiatedFromView,
  assetAccessoryUpdateFormHasBeenDestroyed
} from '../actions/asset-accessory-update-status.actions';

export const assetAccessoryUpdateFormStateSelector = 'assetAccessoryUpdateForm';

export interface AssetAccessoryFormState {
  backEndFetchComplete: boolean;
  browserHasBeenRefreshed: boolean;
  selectedInstance: IAssetAccessory;
  weAreCopying: boolean;
  weAreEditing: boolean;
  weAreCreating: boolean;
}

const _assetAccessoryUpdateStateReducer = createReducer(
  initialState,

  // workflows for creation
  on(assetAccessoryCreationWorkflowInitiatedFromList, (state) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  //    workflows for copy
  on(assetAccessoryCopyWorkflowInitiatedEnRoute, (state, {copiedInstance}) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(assetAccessoryCopyWorkflowInitiatedFromView, (state, {copiedInstance}) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(assetAccessoryCopyWorkflowInitiatedFromList, (state, {copiedInstance}) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),


  //    workflows for edit workflows
  on(assetAccessoryEditWorkflowInitiatedEnRoute, (state, {editedInstance}) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(assetAccessoryEditWorkflowInitiatedFromView, (state, {editedInstance}) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(assetAccessoryEditWorkflowInitiatedFromList, (state, {editedInstance}) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(assetAccessoryUpdateFormHasBeenDestroyed, (state) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(assetAccessoryDataHasMutated, (state) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(assetAccessoryCreationInitiatedFromList, (state) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  on(assetAccessoryCreationInitiatedEnRoute, (state) => ({
    ...state,
    assetAccessoryFormState: {
      ...state.assetAccessoryFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),
);

export function assetAccessoryUpdateStateReducer(state: State = initialState, action: Action): State {

  return _assetAccessoryUpdateStateReducer(state, action);
}
