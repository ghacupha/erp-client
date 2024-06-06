///
/// Erp System - Mark X No 9 (Jehoiada Series) Client 1.7.7
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

import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PrepaymentAccountReportComponentsPage } from './prepayment-account-report.page-object';

const expect = chai.expect;

describe('PrepaymentAccountReport e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prepaymentAccountReportComponentsPage: PrepaymentAccountReportComponentsPage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PrepaymentAccountReports', async () => {
    await navBarPage.goToEntity('prepayment-account-report');
    prepaymentAccountReportComponentsPage = new PrepaymentAccountReportComponentsPage();
    await browser.wait(ec.visibilityOf(prepaymentAccountReportComponentsPage.title), 5000);
    expect(await prepaymentAccountReportComponentsPage.getTitle()).to.eq('Prepayment Account Reports');
    await browser.wait(
      ec.or(
        ec.visibilityOf(prepaymentAccountReportComponentsPage.entities),
        ec.visibilityOf(prepaymentAccountReportComponentsPage.noResult)
      ),
      1000
    );
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
