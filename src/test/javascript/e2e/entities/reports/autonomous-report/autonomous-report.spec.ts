///
/// Erp System - Mark IX No 2 (Iddo Series) Client 1.6.3
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

import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AutonomousReportComponentsPage, AutonomousReportDeleteDialog, AutonomousReportUpdatePage } from './autonomous-report.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('AutonomousReport e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let autonomousReportComponentsPage: AutonomousReportComponentsPage;
  let autonomousReportUpdatePage: AutonomousReportUpdatePage;
  let autonomousReportDeleteDialog: AutonomousReportDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AutonomousReports', async () => {
    await navBarPage.goToEntity('autonomous-report');
    autonomousReportComponentsPage = new AutonomousReportComponentsPage();
    await browser.wait(ec.visibilityOf(autonomousReportComponentsPage.title), 5000);
    expect(await autonomousReportComponentsPage.getTitle()).to.eq('Autonomous Reports');
    await browser.wait(
      ec.or(ec.visibilityOf(autonomousReportComponentsPage.entities), ec.visibilityOf(autonomousReportComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AutonomousReport page', async () => {
    await autonomousReportComponentsPage.clickOnCreateButton();
    autonomousReportUpdatePage = new AutonomousReportUpdatePage();
    expect(await autonomousReportUpdatePage.getPageTitle()).to.eq('Create or edit a Autonomous Report');
    await autonomousReportUpdatePage.cancel();
  });

  it('should create and save AutonomousReports', async () => {
    const nbButtonsBeforeCreate = await autonomousReportComponentsPage.countDeleteButtons();

    await autonomousReportComponentsPage.clickOnCreateButton();

    await promise.all([
      autonomousReportUpdatePage.setReportNameInput('reportName'),
      autonomousReportUpdatePage.setReportParametersInput('reportParameters'),
      autonomousReportUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      autonomousReportUpdatePage.setReportFilenameInput('64c99148-3908-465d-8c4a-e510e3ade974'),
      autonomousReportUpdatePage.setReportFileInput(absolutePath),
      // autonomousReportUpdatePage.reportMappingSelectLastOption(),
      // autonomousReportUpdatePage.placeholderSelectLastOption(),
      autonomousReportUpdatePage.createdBySelectLastOption(),
    ]);

    await autonomousReportUpdatePage.save();
    expect(await autonomousReportUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await autonomousReportComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last AutonomousReport', async () => {
    const nbButtonsBeforeDelete = await autonomousReportComponentsPage.countDeleteButtons();
    await autonomousReportComponentsPage.clickOnLastDeleteButton();

    autonomousReportDeleteDialog = new AutonomousReportDeleteDialog();
    expect(await autonomousReportDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Autonomous Report?');
    await autonomousReportDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(autonomousReportComponentsPage.title), 5000);

    expect(await autonomousReportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
