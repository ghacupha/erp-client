import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  RouAssetListReportComponentsPage,
  RouAssetListReportDeleteDialog,
  RouAssetListReportUpdatePage,
} from './rou-asset-list-report.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('RouAssetListReport e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rouAssetListReportComponentsPage: RouAssetListReportComponentsPage;
  let rouAssetListReportUpdatePage: RouAssetListReportUpdatePage;
  let rouAssetListReportDeleteDialog: RouAssetListReportDeleteDialog;
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

  it('should load RouAssetListReports', async () => {
    await navBarPage.goToEntity('rou-asset-list-report');
    rouAssetListReportComponentsPage = new RouAssetListReportComponentsPage();
    await browser.wait(ec.visibilityOf(rouAssetListReportComponentsPage.title), 5000);
    expect(await rouAssetListReportComponentsPage.getTitle()).to.eq('Rou Asset List Reports');
    await browser.wait(
      ec.or(ec.visibilityOf(rouAssetListReportComponentsPage.entities), ec.visibilityOf(rouAssetListReportComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RouAssetListReport page', async () => {
    await rouAssetListReportComponentsPage.clickOnCreateButton();
    rouAssetListReportUpdatePage = new RouAssetListReportUpdatePage();
    expect(await rouAssetListReportUpdatePage.getPageTitle()).to.eq('Create or edit a Rou Asset List Report');
    await rouAssetListReportUpdatePage.cancel();
  });

  it('should create and save RouAssetListReports', async () => {
    const nbButtonsBeforeCreate = await rouAssetListReportComponentsPage.countDeleteButtons();

    await rouAssetListReportComponentsPage.clickOnCreateButton();

    await promise.all([
      rouAssetListReportUpdatePage.setRequestIdInput('64c99148-3908-465d-8c4a-e510e3ade974'),
      rouAssetListReportUpdatePage.setTimeOfRequestInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      rouAssetListReportUpdatePage.setFileChecksumInput('fileChecksum'),
      rouAssetListReportUpdatePage.getTamperedInput().click(),
      rouAssetListReportUpdatePage.setFilenameInput('64c99148-3908-465d-8c4a-e510e3ade974'),
      rouAssetListReportUpdatePage.setReportParametersInput('reportParameters'),
      rouAssetListReportUpdatePage.setReportFileInput(absolutePath),
      rouAssetListReportUpdatePage.requestedBySelectLastOption(),
    ]);

    await rouAssetListReportUpdatePage.save();
    expect(await rouAssetListReportUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rouAssetListReportComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RouAssetListReport', async () => {
    const nbButtonsBeforeDelete = await rouAssetListReportComponentsPage.countDeleteButtons();
    await rouAssetListReportComponentsPage.clickOnLastDeleteButton();

    rouAssetListReportDeleteDialog = new RouAssetListReportDeleteDialog();
    expect(await rouAssetListReportDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Rou Asset List Report?');
    await rouAssetListReportDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(rouAssetListReportComponentsPage.title), 5000);

    expect(await rouAssetListReportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
