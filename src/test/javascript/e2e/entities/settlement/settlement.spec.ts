import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  SettlementComponentsPage,
  /* SettlementDeleteDialog, */
  SettlementUpdatePage,
} from './settlement.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Settlement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let settlementComponentsPage: SettlementComponentsPage;
  let settlementUpdatePage: SettlementUpdatePage;
  /* let settlementDeleteDialog: SettlementDeleteDialog; */
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
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

  it('should load Settlements', async () => {
    await navBarPage.goToEntity('settlement');
    settlementComponentsPage = new SettlementComponentsPage();
    await browser.wait(ec.visibilityOf(settlementComponentsPage.title), 5000);
    expect(await settlementComponentsPage.getTitle()).to.eq('Settlements');
    await browser.wait(ec.or(ec.visibilityOf(settlementComponentsPage.entities), ec.visibilityOf(settlementComponentsPage.noResult)), 1000);
  });

  it('should load create Settlement page', async () => {
    await settlementComponentsPage.clickOnCreateButton();
    settlementUpdatePage = new SettlementUpdatePage();
    expect(await settlementUpdatePage.getPageTitle()).to.eq('Create or edit a Settlement');
    await settlementUpdatePage.cancel();
  });

  /* it('should create and save Settlements', async () => {
        const nbButtonsBeforeCreate = await settlementComponentsPage.countDeleteButtons();

        await settlementComponentsPage.clickOnCreateButton();

        await promise.all([
            settlementUpdatePage.setPaymentNumberInput('paymentNumber'),
            settlementUpdatePage.setPaymentDateInput('2000-12-31'),
            settlementUpdatePage.setPaymentAmountInput('5'),
            settlementUpdatePage.setDescriptionInput('description'),
            settlementUpdatePage.setNotesInput('notes'),
            settlementUpdatePage.setCalculationFileInput(absolutePath),
            settlementUpdatePage.setFileUploadTokenInput('fileUploadToken'),
            settlementUpdatePage.setCompilationTokenInput('compilationToken'),
            settlementUpdatePage.setRemarksInput('remarks'),
            // settlementUpdatePage.placeholderSelectLastOption(),
            settlementUpdatePage.settlementCurrencySelectLastOption(),
            // settlementUpdatePage.paymentLabelSelectLastOption(),
            settlementUpdatePage.paymentCategorySelectLastOption(),
            settlementUpdatePage.groupSettlementSelectLastOption(),
            settlementUpdatePage.billerSelectLastOption(),
            // settlementUpdatePage.paymentInvoiceSelectLastOption(),
            // settlementUpdatePage.signatoriesSelectLastOption(),
            // settlementUpdatePage.businessDocumentSelectLastOption(),
        ]);

        await settlementUpdatePage.save();
        expect(await settlementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await settlementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Settlement', async () => {
        const nbButtonsBeforeDelete = await settlementComponentsPage.countDeleteButtons();
        await settlementComponentsPage.clickOnLastDeleteButton();

        settlementDeleteDialog = new SettlementDeleteDialog();
        expect(await settlementDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Settlement?');
        await settlementDeleteDialog.clickOnConfirmButton();
        await browser.wait(ec.visibilityOf(settlementComponentsPage.title), 5000);

        expect(await settlementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
