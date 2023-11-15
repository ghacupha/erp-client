import { createAction, props } from '@ngrx/store';

export const wipOverviewReportNavigationInitiatedFromNavbar = createAction(
  '[WIP Overview Navigation: Navbar] Report navigation initiated',
  props<{ wipOverviewReportNavigationPath: string }>()
);

export const wipOverviewReportNavigationInitiatedFromReportDateModal = createAction(
  '[WIP Overview Navigation: Report Date Modal] Report navigation initiated',
  props<{ wipOverviewReportDate: string }>()
);

export const wipOverviewResetReportPathAction = createAction(
  '[WIP Overview Navigation] Reset report-path profile'
);

export const wipOverviewResetReportDateAction = createAction(
  '[WIP Overview Navigation] Reset report-date profile'
);
