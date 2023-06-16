import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  AmortizationRecurrenceComponentsPage,
  /* AmortizationRecurrenceDeleteDialog, */
  AmortizationRecurrenceUpdatePage,
} from './amortization-recurrence.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('AmortizationRecurrence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let amortizationRecurrenceComponentsPage: AmortizationRecurrenceComponentsPage;
  let amortizationRecurrenceUpdatePage: AmortizationRecurrenceUpdatePage;
  /* let amortizationRecurrenceDeleteDialog: AmortizationRecurrenceDeleteDialog; */
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

  it('should load AmortizationRecurrences', async () => {
    await navBarPage.goToEntity('amortization-recurrence');
    amortizationRecurrenceComponentsPage = new AmortizationRecurrenceComponentsPage();
    await browser.wait(ec.visibilityOf(amortizationRecurrenceComponentsPage.title), 5000);
    expect(await amortizationRecurrenceComponentsPage.getTitle()).to.eq('Amortization Recurrences');
    await browser.wait(
      ec.or(ec.visibilityOf(amortizationRecurrenceComponentsPage.entities), ec.visibilityOf(amortizationRecurrenceComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AmortizationRecurrence page', async () => {
    await amortizationRecurrenceComponentsPage.clickOnCreateButton();
    amortizationRecurrenceUpdatePage = new AmortizationRecurrenceUpdatePage();
    expect(await amortizationRecurrenceUpdatePage.getPageTitle()).to.eq('Create or edit a Amortization Recurrence');
    await amortizationRecurrenceUpdatePage.cancel();
  });

  /* it('should create and save AmortizationRecurrences', async () => {
        const nbButtonsBeforeCreate = await amortizationRecurrenceComponentsPage.countDeleteButtons();

        await amortizationRecurrenceComponentsPage.clickOnCreateButton();

        await promise.all([
            amortizationRecurrenceUpdatePage.setFirstAmortizationDateInput('2000-12-31'),
            amortizationRecurrenceUpdatePage.amortizationFrequencySelectLastOption(),
            amortizationRecurrenceUpdatePage.setNumberOfRecurrencesInput('5'),
            amortizationRecurrenceUpdatePage.setNotesInput(absolutePath),
            amortizationRecurrenceUpdatePage.setParticularsInput('particulars'),
            amortizationRecurrenceUpdatePage.getIsActiveInput().click(),
            amortizationRecurrenceUpdatePage.getIsOverWrittenInput().click(),
            amortizationRecurrenceUpdatePage.setTimeOfInstallationInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            amortizationRecurrenceUpdatePage.setRecurrenceGuidInput('64c99148-3908-465d-8c4a-e510e3ade974'),
            amortizationRecurrenceUpdatePage.setPrepaymentAccountGuidInput('64c99148-3908-465d-8c4a-e510e3ade974'),
            // amortizationRecurrenceUpdatePage.placeholderSelectLastOption(),
            // amortizationRecurrenceUpdatePage.parametersSelectLastOption(),
            // amortizationRecurrenceUpdatePage.applicationParametersSelectLastOption(),
            amortizationRecurrenceUpdatePage.depreciationMethodSelectLastOption(),
            amortizationRecurrenceUpdatePage.prepaymentAccountSelectLastOption(),
        ]);

        await amortizationRecurrenceUpdatePage.save();
        expect(await amortizationRecurrenceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await amortizationRecurrenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last AmortizationRecurrence', async () => {
        const nbButtonsBeforeDelete = await amortizationRecurrenceComponentsPage.countDeleteButtons();
        await amortizationRecurrenceComponentsPage.clickOnLastDeleteButton();

        amortizationRecurrenceDeleteDialog = new AmortizationRecurrenceDeleteDialog();
        expect(await amortizationRecurrenceDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Amortization Recurrence?');
        await amortizationRecurrenceDeleteDialog.clickOnConfirmButton();
        await browser.wait(ec.visibilityOf(amortizationRecurrenceComponentsPage.title), 5000);

        expect(await amortizationRecurrenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
