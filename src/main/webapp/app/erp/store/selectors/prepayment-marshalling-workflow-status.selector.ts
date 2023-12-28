///
/// Erp System - Mark IX No 5 (Iddo Series) Client 1.6.4
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../global-store.definition';
import { prepaymentMarshallingUpdateFormStateSelector } from '../reducers/prepayment-marshalling-workflow-status.reducer';

export const prepaymentMarshallingUpdateFormState = createFeatureSelector<State>(prepaymentMarshallingUpdateFormStateSelector);

export const prepaymentMarshallingUpdateSelectedInstance = createSelector(
  prepaymentMarshallingUpdateFormState,
  state => state.prepaymentMarshallingFormState.selectedInstance
);

export const editingPrepaymentMarshallingStatus = createSelector(
  prepaymentMarshallingUpdateFormState,
  state => state.prepaymentMarshallingFormState.weAreEditing
);

export const creatingPrepaymentMarshallingStatus = createSelector(
  prepaymentMarshallingUpdateFormState,
  state => state.prepaymentMarshallingFormState.weAreCreating
);

export const copyingPrepaymentMarshallingStatus = createSelector(
  prepaymentMarshallingUpdateFormState,
  state => state.prepaymentMarshallingFormState.weAreCopying
);