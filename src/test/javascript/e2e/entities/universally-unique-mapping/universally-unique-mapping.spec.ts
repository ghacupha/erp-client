import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  UniversallyUniqueMappingComponentsPage,
  UniversallyUniqueMappingDeleteDialog,
  UniversallyUniqueMappingUpdatePage,
} from './universally-unique-mapping.page-object';

const expect = chai.expect;

describe('UniversallyUniqueMapping e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let universallyUniqueMappingComponentsPage: UniversallyUniqueMappingComponentsPage;
  let universallyUniqueMappingUpdatePage: UniversallyUniqueMappingUpdatePage;
  let universallyUniqueMappingDeleteDialog: UniversallyUniqueMappingDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UniversallyUniqueMappings', async () => {
    await navBarPage.goToEntity('universally-unique-mapping');
    universallyUniqueMappingComponentsPage = new UniversallyUniqueMappingComponentsPage();
    await browser.wait(ec.visibilityOf(universallyUniqueMappingComponentsPage.title), 5000);
    expect(await universallyUniqueMappingComponentsPage.getTitle()).to.eq('Universally Unique Mappings');
    await browser.wait(
      ec.or(
        ec.visibilityOf(universallyUniqueMappingComponentsPage.entities),
        ec.visibilityOf(universallyUniqueMappingComponentsPage.noResult)
      ),
      1000
    );
  });

  it('should load create UniversallyUniqueMapping page', async () => {
    await universallyUniqueMappingComponentsPage.clickOnCreateButton();
    universallyUniqueMappingUpdatePage = new UniversallyUniqueMappingUpdatePage();
    expect(await universallyUniqueMappingUpdatePage.getPageTitle()).to.eq('Create or edit a Universally Unique Mapping');
    await universallyUniqueMappingUpdatePage.cancel();
  });

  it('should create and save UniversallyUniqueMappings', async () => {
    const nbButtonsBeforeCreate = await universallyUniqueMappingComponentsPage.countDeleteButtons();

    await universallyUniqueMappingComponentsPage.clickOnCreateButton();

    await promise.all([
      universallyUniqueMappingUpdatePage.setUniversalKeyInput('universalKey'),
      universallyUniqueMappingUpdatePage.setMappedValueInput('mappedValue'),
    ]);

    await universallyUniqueMappingUpdatePage.save();
    expect(await universallyUniqueMappingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await universallyUniqueMappingComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last UniversallyUniqueMapping', async () => {
    const nbButtonsBeforeDelete = await universallyUniqueMappingComponentsPage.countDeleteButtons();
    await universallyUniqueMappingComponentsPage.clickOnLastDeleteButton();

    universallyUniqueMappingDeleteDialog = new UniversallyUniqueMappingDeleteDialog();
    expect(await universallyUniqueMappingDeleteDialog.getDialogTitle()).to.eq(
      'Are you sure you want to delete this Universally Unique Mapping?'
    );
    await universallyUniqueMappingDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(universallyUniqueMappingComponentsPage.title), 5000);

    expect(await universallyUniqueMappingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
