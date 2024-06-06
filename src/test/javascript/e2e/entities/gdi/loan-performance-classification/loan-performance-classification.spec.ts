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

import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  LoanPerformanceClassificationComponentsPage,
  LoanPerformanceClassificationDeleteDialog,
  LoanPerformanceClassificationUpdatePage,
} from './loan-performance-classification.page-object';

const expect = chai.expect;

describe('LoanPerformanceClassification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let loanPerformanceClassificationComponentsPage: LoanPerformanceClassificationComponentsPage;
  let loanPerformanceClassificationUpdatePage: LoanPerformanceClassificationUpdatePage;
  let loanPerformanceClassificationDeleteDialog: LoanPerformanceClassificationDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LoanPerformanceClassifications', async () => {
    await navBarPage.goToEntity('loan-performance-classification');
    loanPerformanceClassificationComponentsPage = new LoanPerformanceClassificationComponentsPage();
    await browser.wait(ec.visibilityOf(loanPerformanceClassificationComponentsPage.title), 5000);
    expect(await loanPerformanceClassificationComponentsPage.getTitle()).to.eq('Loan Performance Classifications');
    await browser.wait(
      ec.or(
        ec.visibilityOf(loanPerformanceClassificationComponentsPage.entities),
        ec.visibilityOf(loanPerformanceClassificationComponentsPage.noResult)
      ),
      1000
    );
  });

  it('should load create LoanPerformanceClassification page', async () => {
    await loanPerformanceClassificationComponentsPage.clickOnCreateButton();
    loanPerformanceClassificationUpdatePage = new LoanPerformanceClassificationUpdatePage();
    expect(await loanPerformanceClassificationUpdatePage.getPageTitle()).to.eq('Create or edit a Loan Performance Classification');
    await loanPerformanceClassificationUpdatePage.cancel();
  });

  it('should create and save LoanPerformanceClassifications', async () => {
    const nbButtonsBeforeCreate = await loanPerformanceClassificationComponentsPage.countDeleteButtons();

    await loanPerformanceClassificationComponentsPage.clickOnCreateButton();

    await promise.all([
      loanPerformanceClassificationUpdatePage.setLoanPerformanceClassificationCodeInput('loanPerformanceClassificationCode'),
      loanPerformanceClassificationUpdatePage.setLoanPerformanceClassificationTypeInput('loanPerformanceClassificationType'),
      loanPerformanceClassificationUpdatePage.setCommercialBankDescriptionInput('commercialBankDescription'),
      loanPerformanceClassificationUpdatePage.setMicrofinanceDescriptionInput('microfinanceDescription'),
    ]);

    await loanPerformanceClassificationUpdatePage.save();
    expect(await loanPerformanceClassificationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await loanPerformanceClassificationComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LoanPerformanceClassification', async () => {
    const nbButtonsBeforeDelete = await loanPerformanceClassificationComponentsPage.countDeleteButtons();
    await loanPerformanceClassificationComponentsPage.clickOnLastDeleteButton();

    loanPerformanceClassificationDeleteDialog = new LoanPerformanceClassificationDeleteDialog();
    expect(await loanPerformanceClassificationDeleteDialog.getDialogTitle()).to.eq(
      'Are you sure you want to delete this Loan Performance Classification?'
    );
    await loanPerformanceClassificationDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(loanPerformanceClassificationComponentsPage.title), 5000);

    expect(await loanPerformanceClassificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
