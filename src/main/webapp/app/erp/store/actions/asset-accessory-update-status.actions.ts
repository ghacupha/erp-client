import { createAction, props } from '@ngrx/store';
import { IAssetAccessory } from '../../erp-assets/asset-accessory/asset-accessory.model';

export const assetAccessoryCreationInitiatedFromList = createAction(
  '[AssetAccessory Creation: List] FA registration creation workflow initiated',
);

export const assetAccessoryCopyWorkflowInitiatedEnRoute = createAction(
  '[AssetAccessory Copy: Route] FA registration copy workflow initiated',
  props<{ copiedInstance: IAssetAccessory }>()
);

export const assetAccessoryCopyWorkflowInitiatedFromList = createAction(
  '[AssetAccessory Copy: List] FA registration copy workflow initiated',
  props<{ copiedInstance: IAssetAccessory }>()
);

export const assetAccessoryCopyWorkflowInitiatedFromView = createAction(
  '[AssetAccessory Copy: View] FA registration copy workflow initiated',
  props<{ copiedInstance: IAssetAccessory }>()
);

export const assetAccessoryEditWorkflowInitiatedEnRoute = createAction(
  '[AssetAccessory Edit: Route] FA registration edit workflow initiated',
  props<{ editedInstance: IAssetAccessory }>()
);

export const assetAccessoryEditWorkflowInitiatedFromList = createAction(
  '[AssetAccessory Edit: List] FA registration edit workflow initiated',
  props<{ editedInstance: IAssetAccessory }>()
);

export const assetAccessoryEditWorkflowInitiatedFromView = createAction(
  '[AssetAccessory Edit: View] FA registration edit workflow initiated',
  props<{ editedInstance: IAssetAccessory }>()
);

export const assetAccessoryCreationInitiatedEnRoute = createAction(
  '[AssetAccessory: Route] FA registration create workflow initiated',
);

export const assetAccessoryCreationWorkflowInitiatedFromList = createAction(
  '[AssetAccessory Create: List] FA registration create workflow initiated',
);

export const assetAccessoryUpdateFormHasBeenDestroyed = createAction(
  '[AssetAccessory Form] AssetReg form destroyed',
);

export const assetAccessoryDataHasMutated = createAction(
  '[AssetAccessory Form] AssetReg form data mutated',
);
