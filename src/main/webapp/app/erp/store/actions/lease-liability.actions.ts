
import { createAction, props } from '@ngrx/store';
import { ILeaseLiability } from '../../erp-leases/lease-liability/lease-liability.model';

export const leaseLiabilityCreationInitiatedFromList = createAction(
  '[LeaseLiability Creation: List] Lease Liability creation workflow initiated',
);

export const leaseLiabilityCopyWorkflowInitiatedEnRoute = createAction(
  '[LeaseLiability Copy: Route] Lease Liability copy workflow initiated',
  props<{ copiedInstance: ILeaseLiability }>()
);

export const leaseLiabilityCopyWorkflowInitiatedFromList = createAction(
  '[LeaseLiability Copy: List] Lease Liability copy workflow initiated',
  props<{ copiedInstance: ILeaseLiability }>()
);

export const leaseLiabilityCopyWorkflowInitiatedFromView = createAction(
  '[LeaseLiability Copy: View] Lease Liability copy workflow initiated',
  props<{ copiedInstance: ILeaseLiability }>()
);

export const leaseLiabilityEditWorkflowInitiatedEnRoute = createAction(
  '[LeaseLiability Edit: Route] Lease Liability edit workflow initiated',
  props<{ editedInstance: ILeaseLiability }>()
);

export const leaseLiabilityEditWorkflowInitiatedFromList = createAction(
  '[LeaseLiability Edit: List] Lease Liability edit workflow initiated',
  props<{ editedInstance: ILeaseLiability }>()
);

export const leaseLiabilityEditWorkflowInitiatedFromView = createAction(
  '[LeaseLiability Edit: View] Lease Liability edit workflow initiated',
  props<{ editedInstance: ILeaseLiability }>()
);

export const leaseLiabilityCreationInitiatedEnRoute = createAction(
  '[LeaseLiability: Route] Lease Liability create workflow initiated',
);

export const leaseLiabilityCreationWorkflowInitiatedFromList = createAction(
  '[LeaseLiability Create: List] Lease Liability create workflow initiated',
);

