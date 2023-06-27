import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../global-store.definition';
import { settlementUpdateFormStateSelector } from '../reducers/settlement-update-menu-status.reducer';

export const settlementStatusFeatureSelector = createFeatureSelector<State>(settlementUpdateFormStateSelector);

// export const updateSelectedPayment = createSelector(
//   paymentStatusFeatureSelector,
//   state => state.paymentsFormState.selectedPayment
// );

export const editingSettlementStatus = createSelector(
  settlementStatusFeatureSelector,
  state => state.settlementsFormState.weAreEditing
);

export const creatingSettlementStatus = createSelector(
  settlementStatusFeatureSelector,
  state => state.settlementsFormState.weAreCreating
);

export const copyingSettlementStatus = createSelector(
  settlementStatusFeatureSelector,
  state => state.settlementsFormState.weAreCopying
);
