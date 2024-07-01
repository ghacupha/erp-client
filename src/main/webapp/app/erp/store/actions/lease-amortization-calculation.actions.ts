
import { createAction, props } from '@ngrx/store';
import { ILeaseAmortizationCalculation } from '../../erp-leases/lease-amortization-calculation/lease-amortization-calculation.model';

export const leaseAmortizationCalculationCreationInitiatedFromList = createAction(
  '[LeaseAmortizationCalculation Creation: List] Lease Amortization Calculation creation workflow initiated',
);

export const leaseAmortizationCalculationCopyWorkflowInitiatedEnRoute = createAction(
  '[LeaseAmortizationCalculation Copy: Route] Lease Amortization Calculation copy workflow initiated',
  props<{ copiedInstance: ILeaseAmortizationCalculation }>()
);

export const leaseAmortizationCalculationCopyWorkflowInitiatedFromList = createAction(
  '[LeaseAmortizationCalculation Copy: List] Lease Amortization Calculation copy workflow initiated',
  props<{ copiedInstance: ILeaseAmortizationCalculation }>()
);

export const leaseAmortizationCalculationCopyWorkflowInitiatedFromView = createAction(
  '[LeaseAmortizationCalculation Copy: View] Lease Amortization Calculation copy workflow initiated',
  props<{ copiedInstance: ILeaseAmortizationCalculation }>()
);

export const leaseAmortizationCalculationEditWorkflowInitiatedEnRoute = createAction(
  '[LeaseAmortizationCalculation Edit: Route] Lease Amortization Calculation edit workflow initiated',
  props<{ editedInstance: ILeaseAmortizationCalculation }>()
);

export const leaseAmortizationCalculationEditWorkflowInitiatedFromList = createAction(
  '[LeaseAmortizationCalculation Edit: List] Lease Amortization Calculation edit workflow initiated',
  props<{ editedInstance: ILeaseAmortizationCalculation }>()
);

export const leaseAmortizationCalculationEditWorkflowInitiatedFromView = createAction(
  '[LeaseAmortizationCalculation Edit: View] Lease Amortization Calculation edit workflow initiated',
  props<{ editedInstance: ILeaseAmortizationCalculation }>()
);

export const leaseAmortizationCalculationCreationInitiatedEnRoute = createAction(
  '[LeaseAmortizationCalculation: Route] Lease Amortization Calculation create workflow initiated',
);

export const leaseAmortizationCalculationCreationWorkflowInitiatedFromList = createAction(
  '[LeaseAmortizationCalculation Create: List] Lease Amortization Calculation create workflow initiated',
);

