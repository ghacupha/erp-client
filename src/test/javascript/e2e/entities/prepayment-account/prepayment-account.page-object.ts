import { element, by, ElementFinder } from 'protractor';

export class PrepaymentAccountComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-prepayment-account div table .btn-danger'));
  title = element.all(by.css('jhi-prepayment-account div h2#page-heading span')).first();
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

export class PrepaymentAccountUpdatePage {
  pageTitle = element(by.id('jhi-prepayment-account-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  catalogueNumberInput = element(by.id('field_catalogueNumber'));
  particularsInput = element(by.id('field_particulars'));
  notesInput = element(by.id('field_notes'));
  prepaymentAmountInput = element(by.id('field_prepaymentAmount'));

  settlementCurrencySelect = element(by.id('field_settlementCurrency'));
  prepaymentTransactionSelect = element(by.id('field_prepaymentTransaction'));
  serviceOutletSelect = element(by.id('field_serviceOutlet'));
  dealerSelect = element(by.id('field_dealer'));
  debitAccountSelect = element(by.id('field_debitAccount'));
  transferAccountSelect = element(by.id('field_transferAccount'));
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

  async setParticularsInput(particulars: string): Promise<void> {
    await this.particularsInput.sendKeys(particulars);
  }

  async getParticularsInput(): Promise<string> {
    return await this.particularsInput.getAttribute('value');
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
  }

  async setPrepaymentAmountInput(prepaymentAmount: string): Promise<void> {
    await this.prepaymentAmountInput.sendKeys(prepaymentAmount);
  }

  async getPrepaymentAmountInput(): Promise<string> {
    return await this.prepaymentAmountInput.getAttribute('value');
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

  async prepaymentTransactionSelectLastOption(): Promise<void> {
    await this.prepaymentTransactionSelect.all(by.tagName('option')).last().click();
  }

  async prepaymentTransactionSelectOption(option: string): Promise<void> {
    await this.prepaymentTransactionSelect.sendKeys(option);
  }

  getPrepaymentTransactionSelect(): ElementFinder {
    return this.prepaymentTransactionSelect;
  }

  async getPrepaymentTransactionSelectedOption(): Promise<string> {
    return await this.prepaymentTransactionSelect.element(by.css('option:checked')).getText();
  }

  async serviceOutletSelectLastOption(): Promise<void> {
    await this.serviceOutletSelect.all(by.tagName('option')).last().click();
  }

  async serviceOutletSelectOption(option: string): Promise<void> {
    await this.serviceOutletSelect.sendKeys(option);
  }

  getServiceOutletSelect(): ElementFinder {
    return this.serviceOutletSelect;
  }

  async getServiceOutletSelectedOption(): Promise<string> {
    return await this.serviceOutletSelect.element(by.css('option:checked')).getText();
  }

  async dealerSelectLastOption(): Promise<void> {
    await this.dealerSelect.all(by.tagName('option')).last().click();
  }

  async dealerSelectOption(option: string): Promise<void> {
    await this.dealerSelect.sendKeys(option);
  }

  getDealerSelect(): ElementFinder {
    return this.dealerSelect;
  }

  async getDealerSelectedOption(): Promise<string> {
    return await this.dealerSelect.element(by.css('option:checked')).getText();
  }

  async debitAccountSelectLastOption(): Promise<void> {
    await this.debitAccountSelect.all(by.tagName('option')).last().click();
  }

  async debitAccountSelectOption(option: string): Promise<void> {
    await this.debitAccountSelect.sendKeys(option);
  }

  getDebitAccountSelect(): ElementFinder {
    return this.debitAccountSelect;
  }

  async getDebitAccountSelectedOption(): Promise<string> {
    return await this.debitAccountSelect.element(by.css('option:checked')).getText();
  }

  async transferAccountSelectLastOption(): Promise<void> {
    await this.transferAccountSelect.all(by.tagName('option')).last().click();
  }

  async transferAccountSelectOption(option: string): Promise<void> {
    await this.transferAccountSelect.sendKeys(option);
  }

  getTransferAccountSelect(): ElementFinder {
    return this.transferAccountSelect;
  }

  async getTransferAccountSelectedOption(): Promise<string> {
    return await this.transferAccountSelect.element(by.css('option:checked')).getText();
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

export class PrepaymentAccountDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-prepaymentAccount-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-prepaymentAccount'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
