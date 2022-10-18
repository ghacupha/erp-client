import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QuestionBaseComponentsPage, QuestionBaseDeleteDialog, QuestionBaseUpdatePage } from './question-base.page-object';

const expect = chai.expect;

describe('QuestionBase e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questionBaseComponentsPage: QuestionBaseComponentsPage;
  let questionBaseUpdatePage: QuestionBaseUpdatePage;
  let questionBaseDeleteDialog: QuestionBaseDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load QuestionBases', async () => {
    await navBarPage.goToEntity('question-base');
    questionBaseComponentsPage = new QuestionBaseComponentsPage();
    await browser.wait(ec.visibilityOf(questionBaseComponentsPage.title), 5000);
    expect(await questionBaseComponentsPage.getTitle()).to.eq('Question Bases');
    await browser.wait(
      ec.or(ec.visibilityOf(questionBaseComponentsPage.entities), ec.visibilityOf(questionBaseComponentsPage.noResult)),
      1000
    );
  });

  it('should load create QuestionBase page', async () => {
    await questionBaseComponentsPage.clickOnCreateButton();
    questionBaseUpdatePage = new QuestionBaseUpdatePage();
    expect(await questionBaseUpdatePage.getPageTitle()).to.eq('Create or edit a Question Base');
    await questionBaseUpdatePage.cancel();
  });

  it('should create and save QuestionBases', async () => {
    const nbButtonsBeforeCreate = await questionBaseComponentsPage.countDeleteButtons();

    await questionBaseComponentsPage.clickOnCreateButton();

    await promise.all([
      questionBaseUpdatePage.setValueInput('value'),
      questionBaseUpdatePage.setKeyInput('key'),
      questionBaseUpdatePage.setLabelInput('label'),
      questionBaseUpdatePage.getRequiredInput().click(),
      questionBaseUpdatePage.setOrderInput('5'),
      questionBaseUpdatePage.setControlTypeInput('controlType'),
      questionBaseUpdatePage.setPlaceholderInput('placeholder'),
      questionBaseUpdatePage.getIterableInput().click(),
      // questionBaseUpdatePage.parametersSelectLastOption(),
      // questionBaseUpdatePage.placeholderItemSelectLastOption(),
    ]);

    await questionBaseUpdatePage.save();
    expect(await questionBaseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await questionBaseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last QuestionBase', async () => {
    const nbButtonsBeforeDelete = await questionBaseComponentsPage.countDeleteButtons();
    await questionBaseComponentsPage.clickOnLastDeleteButton();

    questionBaseDeleteDialog = new QuestionBaseDeleteDialog();
    expect(await questionBaseDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Question Base?');
    await questionBaseDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(questionBaseComponentsPage.title), 5000);

    expect(await questionBaseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});