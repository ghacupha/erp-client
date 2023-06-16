import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  SecurityClearanceComponentsPage,
  SecurityClearanceDeleteDialog,
  SecurityClearanceUpdatePage,
} from './security-clearance.page-object';

const expect = chai.expect;

describe('SecurityClearance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let securityClearanceComponentsPage: SecurityClearanceComponentsPage;
  let securityClearanceUpdatePage: SecurityClearanceUpdatePage;
  let securityClearanceDeleteDialog: SecurityClearanceDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SecurityClearances', async () => {
    await navBarPage.goToEntity('security-clearance');
    securityClearanceComponentsPage = new SecurityClearanceComponentsPage();
    await browser.wait(ec.visibilityOf(securityClearanceComponentsPage.title), 5000);
    expect(await securityClearanceComponentsPage.getTitle()).to.eq('Security Clearances');
    await browser.wait(
      ec.or(ec.visibilityOf(securityClearanceComponentsPage.entities), ec.visibilityOf(securityClearanceComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SecurityClearance page', async () => {
    await securityClearanceComponentsPage.clickOnCreateButton();
    securityClearanceUpdatePage = new SecurityClearanceUpdatePage();
    expect(await securityClearanceUpdatePage.getPageTitle()).to.eq('Create or edit a Security Clearance');
    await securityClearanceUpdatePage.cancel();
  });

  it('should create and save SecurityClearances', async () => {
    const nbButtonsBeforeCreate = await securityClearanceComponentsPage.countDeleteButtons();

    await securityClearanceComponentsPage.clickOnCreateButton();

    await promise.all([
      securityClearanceUpdatePage.setClearanceLevelInput('clearanceLevel'),
      // securityClearanceUpdatePage.grantedClearancesSelectLastOption(),
      // securityClearanceUpdatePage.placeholderSelectLastOption(),
    ]);

    await securityClearanceUpdatePage.save();
    expect(await securityClearanceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await securityClearanceComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SecurityClearance', async () => {
    const nbButtonsBeforeDelete = await securityClearanceComponentsPage.countDeleteButtons();
    await securityClearanceComponentsPage.clickOnLastDeleteButton();

    securityClearanceDeleteDialog = new SecurityClearanceDeleteDialog();
    expect(await securityClearanceDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Security Clearance?');
    await securityClearanceDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(securityClearanceComponentsPage.title), 5000);

    expect(await securityClearanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
