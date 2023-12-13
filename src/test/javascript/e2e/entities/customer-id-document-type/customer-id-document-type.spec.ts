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

import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  CustomerIDDocumentTypeComponentsPage,
  CustomerIDDocumentTypeDeleteDialog,
  CustomerIDDocumentTypeUpdatePage,
} from './customer-id-document-type.page-object';

const expect = chai.expect;

describe('CustomerIDDocumentType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customerIDDocumentTypeComponentsPage: CustomerIDDocumentTypeComponentsPage;
  let customerIDDocumentTypeUpdatePage: CustomerIDDocumentTypeUpdatePage;
  let customerIDDocumentTypeDeleteDialog: CustomerIDDocumentTypeDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CustomerIDDocumentTypes', async () => {
    await navBarPage.goToEntity('customer-id-document-type');
    customerIDDocumentTypeComponentsPage = new CustomerIDDocumentTypeComponentsPage();
    await browser.wait(ec.visibilityOf(customerIDDocumentTypeComponentsPage.title), 5000);
    expect(await customerIDDocumentTypeComponentsPage.getTitle()).to.eq('Customer ID Document Types');
    await browser.wait(
      ec.or(ec.visibilityOf(customerIDDocumentTypeComponentsPage.entities), ec.visibilityOf(customerIDDocumentTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create CustomerIDDocumentType page', async () => {
    await customerIDDocumentTypeComponentsPage.clickOnCreateButton();
    customerIDDocumentTypeUpdatePage = new CustomerIDDocumentTypeUpdatePage();
    expect(await customerIDDocumentTypeUpdatePage.getPageTitle()).to.eq('Create or edit a Customer ID Document Type');
    await customerIDDocumentTypeUpdatePage.cancel();
  });

  it('should create and save CustomerIDDocumentTypes', async () => {
    const nbButtonsBeforeCreate = await customerIDDocumentTypeComponentsPage.countDeleteButtons();

    await customerIDDocumentTypeComponentsPage.clickOnCreateButton();

    await promise.all([
      customerIDDocumentTypeUpdatePage.setDocumentCodeInput('documentCode'),
      customerIDDocumentTypeUpdatePage.setDocumentTypeInput('documentType'),
      customerIDDocumentTypeUpdatePage.setDocumentTypeDescriptionInput('documentTypeDescription'),
      // customerIDDocumentTypeUpdatePage.placeholderSelectLastOption(),
    ]);

    await customerIDDocumentTypeUpdatePage.save();
    expect(await customerIDDocumentTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await customerIDDocumentTypeComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last CustomerIDDocumentType', async () => {
    const nbButtonsBeforeDelete = await customerIDDocumentTypeComponentsPage.countDeleteButtons();
    await customerIDDocumentTypeComponentsPage.clickOnLastDeleteButton();

    customerIDDocumentTypeDeleteDialog = new CustomerIDDocumentTypeDeleteDialog();
    expect(await customerIDDocumentTypeDeleteDialog.getDialogTitle()).to.eq(
      'Are you sure you want to delete this Customer ID Document Type?'
    );
    await customerIDDocumentTypeDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(customerIDDocumentTypeComponentsPage.title), 5000);

    expect(await customerIDDocumentTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
