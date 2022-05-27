import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  PdfReportRequisitionComponentsPage,
  /* PdfReportRequisitionDeleteDialog, */
  PdfReportRequisitionUpdatePage,
} from './pdf-report-requisition.page-object';

const expect = chai.expect;

describe('PdfReportRequisition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pdfReportRequisitionComponentsPage: PdfReportRequisitionComponentsPage;
  let pdfReportRequisitionUpdatePage: PdfReportRequisitionUpdatePage;
  /* let pdfReportRequisitionDeleteDialog: PdfReportRequisitionDeleteDialog; */
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PdfReportRequisitions', async () => {
    await navBarPage.goToEntity('pdf-report-requisition');
    pdfReportRequisitionComponentsPage = new PdfReportRequisitionComponentsPage();
    await browser.wait(ec.visibilityOf(pdfReportRequisitionComponentsPage.title), 5000);
    expect(await pdfReportRequisitionComponentsPage.getTitle()).to.eq('Pdf Report Requisitions');
    await browser.wait(
      ec.or(ec.visibilityOf(pdfReportRequisitionComponentsPage.entities), ec.visibilityOf(pdfReportRequisitionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PdfReportRequisition page', async () => {
    await pdfReportRequisitionComponentsPage.clickOnCreateButton();
    pdfReportRequisitionUpdatePage = new PdfReportRequisitionUpdatePage();
    expect(await pdfReportRequisitionUpdatePage.getPageTitle()).to.eq('Create or edit a Pdf Report Requisition');
    await pdfReportRequisitionUpdatePage.cancel();
  });

  /* it('should create and save PdfReportRequisitions', async () => {
        const nbButtonsBeforeCreate = await pdfReportRequisitionComponentsPage.countDeleteButtons();

        await pdfReportRequisitionComponentsPage.clickOnCreateButton();

        await promise.all([
            pdfReportRequisitionUpdatePage.setReportNameInput('reportName'),
            pdfReportRequisitionUpdatePage.setReportDateInput('2000-12-31'),
            pdfReportRequisitionUpdatePage.setUserPasswordInput('userPassword'),
            pdfReportRequisitionUpdatePage.setOwnerPasswordInput('ownerPassword'),
            pdfReportRequisitionUpdatePage.reportStatusSelectLastOption(),
            pdfReportRequisitionUpdatePage.setReportIdInput('64c99148-3908-465d-8c4a-e510e3ade974'),
            pdfReportRequisitionUpdatePage.reportTemplateSelectLastOption(),
            // pdfReportRequisitionUpdatePage.placeholderSelectLastOption(),
        ]);

        await pdfReportRequisitionUpdatePage.save();
        expect(await pdfReportRequisitionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await pdfReportRequisitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last PdfReportRequisition', async () => {
        const nbButtonsBeforeDelete = await pdfReportRequisitionComponentsPage.countDeleteButtons();
        await pdfReportRequisitionComponentsPage.clickOnLastDeleteButton();

        pdfReportRequisitionDeleteDialog = new PdfReportRequisitionDeleteDialog();
        expect(await pdfReportRequisitionDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Pdf Report Requisition?');
        await pdfReportRequisitionDeleteDialog.clickOnConfirmButton();
        await browser.wait(ec.visibilityOf(pdfReportRequisitionComponentsPage.title), 5000);

        expect(await pdfReportRequisitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});