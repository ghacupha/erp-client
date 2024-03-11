import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../global-store.definition';
import { rouModelMetadataUpdateFormStateSelector } from '../reducers/rou-model-metadata-workflow-status.reducer';

export const rouModelMetadataUpdateFormState = createFeatureSelector<State>(rouModelMetadataUpdateFormStateSelector);

export const rouModelMetadataUpdateSelectedInstance = createSelector(
  rouModelMetadataUpdateFormState,
  state => state.rouModelMetadataFormState.selectedInstance
);

export const editingRouModelMetadataStatus = createSelector(
  rouModelMetadataUpdateFormState,
  state => state.rouModelMetadataFormState.weAreEditing
);

export const creatingRouModelMetadataStatus = createSelector(
  rouModelMetadataUpdateFormState,
  state => state.rouModelMetadataFormState.weAreCreating
);

export const copyingRouModelMetadataStatus = createSelector(
  rouModelMetadataUpdateFormState,
  state => state.rouModelMetadataFormState.weAreCopying
);
