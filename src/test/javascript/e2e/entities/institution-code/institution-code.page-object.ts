import { element, by, ElementFinder } from 'protractor';

export class InstitutionCodeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-institution-code div table .btn-danger'));
  title = element.all(by.css('jhi-institution-code div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class InstitutionCodeUpdatePage {
  pageTitle = element(by.id('jhi-institution-code-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  institutionCodeInput = element(by.id('field_institutionCode'));
  institutionNameInput = element(by.id('field_institutionName'));
  shortNameInput = element(by.id('field_shortName'));
  categoryInput = element(by.id('field_category'));
  institutionCategoryInput = element(by.id('field_institutionCategory'));

  placeholderSelect = element(by.id('field_placeholder'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setInstitutionCodeInput(institutionCode: string): Promise<void> {
    await this.institutionCodeInput.sendKeys(institutionCode);
  }

  async getInstitutionCodeInput(): Promise<string> {
    return await this.institutionCodeInput.getAttribute('value');
  }

  async setInstitutionNameInput(institutionName: string): Promise<void> {
    await this.institutionNameInput.sendKeys(institutionName);
  }

  async getInstitutionNameInput(): Promise<string> {
    return await this.institutionNameInput.getAttribute('value');
  }

  async setShortNameInput(shortName: string): Promise<void> {
    await this.shortNameInput.sendKeys(shortName);
  }

  async getShortNameInput(): Promise<string> {
    return await this.shortNameInput.getAttribute('value');
  }

  async setCategoryInput(category: string): Promise<void> {
    await this.categoryInput.sendKeys(category);
  }

  async getCategoryInput(): Promise<string> {
    return await this.categoryInput.getAttribute('value');
  }

  async setInstitutionCategoryInput(institutionCategory: string): Promise<void> {
    await this.institutionCategoryInput.sendKeys(institutionCategory);
  }

  async getInstitutionCategoryInput(): Promise<string> {
    return await this.institutionCategoryInput.getAttribute('value');
  }

  async placeholderSelectLastOption(): Promise<void> {
    await this.placeholderSelect.all(by.tagName('option')).last().click();
  }

  async placeholderSelectOption(option: string): Promise<void> {
    await this.placeholderSelect.sendKeys(option);
  }

  getPlaceholderSelect(): ElementFinder {
    return this.placeholderSelect;
  }

  async getPlaceholderSelectedOption(): Promise<string> {
    return await this.placeholderSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class InstitutionCodeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-institutionCode-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-institutionCode'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
