import { element, by, ElementFinder } from 'protractor';

export class WorkProjectRegisterComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-work-project-register div table .btn-danger'));
  title = element.all(by.css('jhi-work-project-register div h2#page-heading span')).first();
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

export class WorkProjectRegisterUpdatePage {
  pageTitle = element(by.id('jhi-work-project-register-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  catalogueNumberInput = element(by.id('field_catalogueNumber'));
  descriptionInput = element(by.id('field_description'));
  detailsInput = element(by.id('file_details'));
  totalProjectCostInput = element(by.id('field_totalProjectCost'));
  additionalNotesInput = element(by.id('file_additionalNotes'));

  dealersSelect = element(by.id('field_dealers'));
  settlementCurrencySelect = element(by.id('field_settlementCurrency'));
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

  async setCatalogueNumberInput(catalogueNumber: string): Promise<void> {
    await this.catalogueNumberInput.sendKeys(catalogueNumber);
  }

  async getCatalogueNumberInput(): Promise<string> {
    return await this.catalogueNumberInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDetailsInput(details: string): Promise<void> {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput(): Promise<string> {
    return await this.detailsInput.getAttribute('value');
  }

  async setTotalProjectCostInput(totalProjectCost: string): Promise<void> {
    await this.totalProjectCostInput.sendKeys(totalProjectCost);
  }

  async getTotalProjectCostInput(): Promise<string> {
    return await this.totalProjectCostInput.getAttribute('value');
  }

  async setAdditionalNotesInput(additionalNotes: string): Promise<void> {
    await this.additionalNotesInput.sendKeys(additionalNotes);
  }

  async getAdditionalNotesInput(): Promise<string> {
    return await this.additionalNotesInput.getAttribute('value');
  }

  async dealersSelectLastOption(): Promise<void> {
    await this.dealersSelect.all(by.tagName('option')).last().click();
  }

  async dealersSelectOption(option: string): Promise<void> {
    await this.dealersSelect.sendKeys(option);
  }

  getDealersSelect(): ElementFinder {
    return this.dealersSelect;
  }

  async getDealersSelectedOption(): Promise<string> {
    return await this.dealersSelect.element(by.css('option:checked')).getText();
  }

  async settlementCurrencySelectLastOption(): Promise<void> {
    await this.settlementCurrencySelect.all(by.tagName('option')).last().click();
  }

  async settlementCurrencySelectOption(option: string): Promise<void> {
    await this.settlementCurrencySelect.sendKeys(option);
  }

  getSettlementCurrencySelect(): ElementFinder {
    return this.settlementCurrencySelect;
  }

  async getSettlementCurrencySelectedOption(): Promise<string> {
    return await this.settlementCurrencySelect.element(by.css('option:checked')).getText();
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

export class WorkProjectRegisterDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-workProjectRegister-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-workProjectRegister'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
