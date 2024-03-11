import { createAction, props } from '@ngrx/store';
import { IRouModelMetadata } from '../../erp-leases/rou-model-metadata/rou-model-metadata.model';

export const rouMetadataCreationInitiatedFromList = createAction(
  '[RouMetadata Creation: List] Rou Metadata creation workflow initiated',
);

export const rouMetadataCopyWorkflowInitiatedEnRoute = createAction(
  '[RouMetadata Copy: Route] Rou Metadata copy workflow initiated',
  props<{ copiedInstance: IRouModelMetadata }>()
);

export const rouMetadataCopyWorkflowInitiatedFromList = createAction(
  '[RouMetadata Copy: List] Rou Metadata copy workflow initiated',
  props<{ copiedInstance: IRouModelMetadata }>()
);

export const rouMetadataCopyWorkflowInitiatedFromView = createAction(
  '[RouMetadata Copy: View] Rou Metadata copy workflow initiated',
  props<{ copiedInstance: IRouModelMetadata }>()
);

export const rouMetadataEditWorkflowInitiatedEnRoute = createAction(
  '[RouMetadata Edit: Route] Rou Metadata edit workflow initiated',
  props<{ editedInstance: IRouModelMetadata }>()
);

export const rouMetadataEditWorkflowInitiatedFromList = createAction(
  '[RouMetadata Edit: List] Rou Metadata edit workflow initiated',
  props<{ editedInstance: IRouModelMetadata }>()
);

export const rouMetadataEditWorkflowInitiatedFromView = createAction(
  '[RouMetadata Edit: View] Rou Metadata edit workflow initiated',
  props<{ editedInstance: IRouModelMetadata }>()
);

export const rouMetadataCreationInitiatedEnRoute = createAction(
  '[RouMetadata: Route] Rou Metadata create workflow initiated',
);

export const rouMetadataCreationWorkflowInitiatedFromList = createAction(
  '[RouMetadata Create: List] Rou Metadata create workflow initiated',
);

export const rouMetadataUpdateFormHasBeenDestroyed = createAction(
  '[RouMetadata Form] Rou Metadata form destroyed',
);

export const rouMetadataDataHasMutated = createAction(
  '[RouMetadata Form] Rou Metadata form data mutated',
);

export const rouMetadataUpdateInstanceAcquiredFromBackend = createAction(
  '[RouMetadata Effects: ROU-Metadata-effects] rou-metadata-update instance acquired for copy',
  props<{backendAcquiredInstance: IRouModelMetadata}>()
);

export const rouMetadataUpdateInstanceAcquisitionFromBackendFailed = createAction(
  '[RouMetadata Effects: ROU-Metadata-effects] rou-metadata-update instance acquisition failed',
  props<{error: string}>()
);
