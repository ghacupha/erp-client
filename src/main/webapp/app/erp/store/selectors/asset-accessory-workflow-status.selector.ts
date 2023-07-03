import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../global-store.definition';
import { assetAccessoryUpdateFormStateSelector } from '../reducers/asset-accessory-workflow-status.reducer';

export const assetAccessoryUpdateFormState = createFeatureSelector<State>(assetAccessoryUpdateFormStateSelector);

export const assetAccessoryUpdateSelectedInstance = createSelector(
  assetAccessoryUpdateFormState,
  state => state.assetAccessoryFormState.selectedInstance
);

export const editingAssetAccessoryStatus = createSelector(
  assetAccessoryUpdateFormState,
  state => state.assetAccessoryFormState.weAreEditing
);

export const creatingAssetAccessoryStatus = createSelector(
  assetAccessoryUpdateFormState,
  state => state.assetAccessoryFormState.weAreCreating
);

export const copyingAssetAccessoryStatus = createSelector(
  assetAccessoryUpdateFormState,
  state => state.assetAccessoryFormState.weAreCopying
);
