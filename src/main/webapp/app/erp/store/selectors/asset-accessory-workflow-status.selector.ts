///
/// Erp System - Mark VIII No 3 (Hilkiah Series) Client 1.6.2
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
