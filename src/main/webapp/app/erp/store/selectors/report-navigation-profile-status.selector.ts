///
/// Erp System - Mark IX No 2 (Hilkiah Series) Client 1.6.3
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
import { reportNavigationProfileStateSelector } from '../reducers/report-navigation-profile-status.reducer';

export const reportNavigationProfileState = createFeatureSelector<State>(reportNavigationProfileStateSelector);

export const wipOverviewNavigationPathState = createSelector(
  reportNavigationProfileState,
  state => state.reportNavigationProfileState.reportPath
);

export const wipOverviewNavigationReportDateState = createSelector(
  reportNavigationProfileState,
  state => state.reportNavigationProfileState.reportDate
);

export const wipOverviewNavigationReportTitleState = createSelector(
  reportNavigationProfileState,
  state => state.reportNavigationProfileState.reportTitle
);

export const prepaymentOverviewNavigationPathState = createSelector(
  reportNavigationProfileState,
  state => state.reportNavigationProfileState.reportPath
);

export const prepaymentOverviewNavigationReportDateState = createSelector(
  reportNavigationProfileState,
  state => state.reportNavigationProfileState.reportDate
);

export const prepaymentOverviewNavigationReportTitleState = createSelector(
  reportNavigationProfileState,
  state => state.reportNavigationProfileState.reportTitle
);
