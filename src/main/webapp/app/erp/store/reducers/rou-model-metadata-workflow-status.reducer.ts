import { IRouModelMetadata } from '../../erp-leases/rou-model-metadata/rou-model-metadata.model';
import { initialState, State } from '../global-store.definition';
import { Action, createReducer, on } from '@ngrx/store';
import {
  rouMetadataCopyWorkflowInitiatedEnRoute,
  rouMetadataCopyWorkflowInitiatedFromList,
  rouMetadataCopyWorkflowInitiatedFromView,
  rouMetadataCreationInitiatedEnRoute,
  rouMetadataCreationInitiatedFromList,
  rouMetadataCreationWorkflowInitiatedFromList,
  rouMetadataDataHasMutated,
  rouMetadataEditWorkflowInitiatedEnRoute,
  rouMetadataEditWorkflowInitiatedFromList,
  rouMetadataEditWorkflowInitiatedFromView,
  rouMetadataUpdateFormHasBeenDestroyed
} from '../actions/rou-model-metadata-update-status.actions';

export const rouModelMetadataUpdateFormStateSelector = 'rouModelMetadataUpdateForm';

export interface RouModelMetadataFormState {
  backEndFetchComplete: boolean;
  browserHasBeenRefreshed: boolean;
  selectedInstance: IRouModelMetadata;
  weAreCopying: boolean;
  weAreEditing: boolean;
  weAreCreating: boolean;
}

const _rouModelMetadataUpdateStateReducer = createReducer(
  initialState,

  // workflows for creation
  on(rouMetadataCreationWorkflowInitiatedFromList, (state) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  //    workflows for copy
  on(rouMetadataCopyWorkflowInitiatedEnRoute, (state, {copiedInstance}) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(rouMetadataCopyWorkflowInitiatedFromView, (state, {copiedInstance}) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(rouMetadataCopyWorkflowInitiatedFromList, (state, {copiedInstance}) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      selectedInstance: copiedInstance,
      weAreCopying: true,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),


  //    workflows for edit workflows
  on(rouMetadataEditWorkflowInitiatedEnRoute, (state, {editedInstance}) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(rouMetadataEditWorkflowInitiatedFromView, (state, {editedInstance}) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(rouMetadataEditWorkflowInitiatedFromList, (state, {editedInstance}) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      selectedInstance: editedInstance,
      weAreCopying: false,
      weAreEditing: true,
      weAreCreating: false,
    }
  })),

  on(rouMetadataUpdateFormHasBeenDestroyed, (state) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(rouMetadataDataHasMutated, (state) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: false,
    }
  })),

  on(rouMetadataCreationInitiatedFromList, (state) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),

  on(rouMetadataCreationInitiatedEnRoute, (state) => ({
    ...state,
    rouModelMetadataFormState: {
      ...state.rouModelMetadataFormState,
      selectedInstance: {},
      weAreCopying: false,
      weAreEditing: false,
      weAreCreating: true,
    }
  })),
);

export function rouModelMetadataUpdateStateReducer(state: State = initialState, action: Action): State {

  return _rouModelMetadataUpdateStateReducer(state, action);
}
