import { Action, createReducer, on } from '@ngrx/store';
import { initialState, State } from '../global-store.definition';
import {
  wipOverviewReportNavigationInitiatedFromNavbar,
  wipOverviewReportNavigationInitiatedFromReportDateModal,
  wipOverviewResetReportDateAction,
  wipOverviewResetReportPathAction
} from '../actions/report-navigation-profile-status.actions';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../config/input.constants';

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
      reportDate: dayjs().format(DATE_FORMAT)
    }
  })),

);

export function reportNavigationProfileStateReducer(state: State = initialState, action: Action): State {

  return _reportNavigationProfileStateReducer(state, action);
}

