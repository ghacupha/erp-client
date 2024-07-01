
import { createAction, props } from '@ngrx/store';
import { ILeasePayment } from '../../erp-leases/lease-payment/lease-payment.model';

export const leasePaymentCreationInitiatedFromList = createAction(
  '[LeasePayment Creation: List] Lease Payment creation workflow initiated',
);

export const leasePaymentCopyWorkflowInitiatedEnRoute = createAction(
  '[LeasePayment Copy: Route] Lease Payment copy workflow initiated',
  props<{ copiedInstance: ILeasePayment }>()
);

export const leasePaymentCopyWorkflowInitiatedFromList = createAction(
  '[LeasePayment Copy: List] Lease Payment copy workflow initiated',
  props<{ copiedInstance: ILeasePayment }>()
);

export const leasePaymentCopyWorkflowInitiatedFromView = createAction(
  '[LeasePayment Copy: View] Lease Payment copy workflow initiated',
  props<{ copiedInstance: ILeasePayment }>()
);

export const leasePaymentEditWorkflowInitiatedEnRoute = createAction(
  '[LeasePayment Edit: Route] Lease Payment edit workflow initiated',
  props<{ editedInstance: ILeasePayment }>()
);

export const leasePaymentEditWorkflowInitiatedFromList = createAction(
  '[LeasePayment Edit: List] Lease Payment edit workflow initiated',
  props<{ editedInstance: ILeasePayment }>()
);

export const leasePaymentEditWorkflowInitiatedFromView = createAction(
  '[LeasePayment Edit: View] Lease Payment edit workflow initiated',
  props<{ editedInstance: ILeasePayment }>()
);

export const leasePaymentCreationInitiatedEnRoute = createAction(
  '[LeasePayment: Route] Lease Payment create workflow initiated',
);

export const leasePaymentCreationWorkflowInitiatedFromList = createAction(
  '[LeasePayment Create: List] Lease Payment create workflow initiated',
);

