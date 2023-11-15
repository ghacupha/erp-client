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
