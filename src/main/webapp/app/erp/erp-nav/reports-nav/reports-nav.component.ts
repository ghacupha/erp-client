///
/// Erp System - Mark VIII No 2 (Hilkiah Series) Client 1.6.1
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

import {Component, OnInit} from "@angular/core";
import {Account} from "../../../core/auth/account.model";
import {LoginService} from "../../../login/login.service";
import {AccountService} from "../../../core/auth/account.service";
import {ProfileService} from "../../../layouts/profiles/profile.service";
import {Router} from "@angular/router";
import {VERSION} from "../../../app.constants";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportDateParameterComponent } from '../../erp-reports/date-parameter/report-date-parameter.component';
import {
  wipOverviewReportNavigationInitiatedFromNavbar, wipOverviewResetReportDateAction
} from '../../store/actions/report-navigation-profile-status.actions';
import { Store } from '@ngrx/store';
import { State } from '../../store/global-store.definition';

@Component({
  selector: "jhi-reports-nav",
  templateUrl: "./reports-nav.component.html"
})
export class ReportsNavComponent implements OnInit{
  inProduction?: boolean;
  isNavbarCollapsed = true;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private profileService: ProfileService,
    protected modalService: NgbModal,
    protected store: Store<State>,
    private router: Router
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  openReportDateModal(): void {

    this.store.dispatch(wipOverviewResetReportDateAction());

    this.isNavbarCollapsed = true;

    this.store.dispatch(wipOverviewReportNavigationInitiatedFromNavbar({ wipOverviewReportNavigationPath: 'work-in-progress-overview' }));

    const modalRef = this.modalService.open(ReportDateParameterComponent, { size: 'lg', backdrop: 'static' });

    // modalRef.componentInstance.reportsNavComponent = reportsNavComponent;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'dateSelected') {
        this.reset();
      }
    });
  }

  reset(): void {
    // this.page = 0;
    // this.loadAll();
  }
}
