import { Action, createReducer, on } from '@ngrx/store';
import { initialState, State } from '../global-store.definition';
import {
  wipOverviewReportNavigationInitiatedFromNavbar,
  wipOverviewReportNavigationInitiatedFromReportDateModal,
  wipOverviewResetReportDateAction,
  wipOverviewResetReportPathAction
} from '../actions/report-navigation-profile-status.actions';

export const reportNavigationProfileStateSelector = 'reportNavigationProfileState';

export interface ReportNavigationProfileState {
  reportPath: string,
  reportDate: string,
}

const _reportNavigationProfileStateReducer = createReducer(
  initialState,

  // workflows nav from navbar
  on(wipOverviewReportNavigationInitiatedFromNavbar, (state, {wipOverviewReportNavigationPath}) => ({
    ...state,
    reportNavigationProfileState: {
      ...state.reportNavigationProfileState,
      reportPath: wipOverviewReportNavigationPath,
    }
  })),

  //    workflows for nav from report-date modal
  on(wipOverviewReportNavigationInitiatedFromReportDateModal, (state, {wipOverviewReportDate}) => ({
    ...state,
    reportNavigationProfileState: {
      ...state.reportNavigationProfileState,
      reportDate: wipOverviewReportDate
    }
  })),

  on(wipOverviewResetReportPathAction, (state) => ({
    ...state,
    reportNavigationProfileState: {
      ...state.reportNavigationProfileState,
      reportPath: ''
    }
  })),

  on(wipOverviewResetReportDateAction, (state) => ({
    ...state,
    reportNavigationProfileState: {
      ...state.reportNavigationProfileState,
      reportDate: ''
    }
  })),

);

export function reportNavigationProfileStateReducer(state: State = initialState, action: Action): State {

  return _reportNavigationProfileStateReducer(state, action);
}

