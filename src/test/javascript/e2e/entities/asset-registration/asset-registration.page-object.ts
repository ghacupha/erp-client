import { element, by, ElementFinder } from 'protractor';

export class AssetRegistrationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-asset-registration div table .btn-danger'));
  title = element.all(by.css('jhi-asset-registration div h2#page-heading span')).first();
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

export class AssetRegistrationUpdatePage {
  pageTitle = element(by.id('jhi-asset-registration-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  assetNumberInput = element(by.id('field_assetNumber'));
  assetTagInput = element(by.id('field_assetTag'));
  assetDetailsInput = element(by.id('field_assetDetails'));
  assetCostInput = element(by.id('field_assetCost'));
  commentsInput = element(by.id('file_comments'));

  placeholderSelect = element(by.id('field_placeholder'));
  paymentInvoicesSelect = element(by.id('field_paymentInvoices'));
  serviceOutletSelect = element(by.id('field_serviceOutlet'));
  settlementSelect = element(by.id('field_settlement'));
  assetCategorySelect = element(by.id('field_assetCategory'));
  purchaseOrderSelect = element(by.id('field_purchaseOrder'));
  deliveryNoteSelect = element(by.id('field_deliveryNote'));
  jobSheetSelect = element(by.id('field_jobSheet'));
  dealerSelect = element(by.id('field_dealer'));
  designatedUsersSelect = element(by.id('field_designatedUsers'));
  settlementCurrencySelect = element(by.id('field_settlementCurrency'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setAssetNumberInput(assetNumber: string): Promise<void> {
    await this.assetNumberInput.sendKeys(assetNumber);
  }

  async getAssetNumberInput(): Promise<string> {
    return await this.assetNumberInput.getAttribute('value');
  }

  async setAssetTagInput(assetTag: string): Promise<void> {
    await this.assetTagInput.sendKeys(assetTag);
  }

  async getAssetTagInput(): Promise<string> {
    return await this.assetTagInput.getAttribute('value');
  }

  async setAssetDetailsInput(assetDetails: string): Promise<void> {
    await this.assetDetailsInput.sendKeys(assetDetails);
  }

  async getAssetDetailsInput(): Promise<string> {
    return await this.assetDetailsInput.getAttribute('value');
  }

  async setAssetCostInput(assetCost: string): Promise<void> {
    await this.assetCostInput.sendKeys(assetCost);
  }

  async getAssetCostInput(): Promise<string> {
    return await this.assetCostInput.getAttribute('value');
  }

  async setCommentsInput(comments: string): Promise<void> {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput(): Promise<string> {
    return await this.commentsInput.getAttribute('value');
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

  async paymentInvoicesSelectLastOption(): Promise<void> {
    await this.paymentInvoicesSelect.all(by.tagName('option')).last().click();
  }

  async paymentInvoicesSelectOption(option: string): Promise<void> {
    await this.paymentInvoicesSelect.sendKeys(option);
  }

  getPaymentInvoicesSelect(): ElementFinder {
    return this.paymentInvoicesSelect;
  }

  async getPaymentInvoicesSelectedOption(): Promise<string> {
    return await this.paymentInvoicesSelect.element(by.css('option:checked')).getText();
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

  async settlementSelectLastOption(): Promise<void> {
    await this.settlementSelect.all(by.tagName('option')).last().click();
  }

  async settlementSelectOption(option: string): Promise<void> {
    await this.settlementSelect.sendKeys(option);
  }

  getSettlementSelect(): ElementFinder {
    return this.settlementSelect;
  }

  async getSettlementSelectedOption(): Promise<string> {
    return await this.settlementSelect.element(by.css('option:checked')).getText();
  }

  async assetCategorySelectLastOption(): Promise<void> {
    await this.assetCategorySelect.all(by.tagName('option')).last().click();
  }

  async assetCategorySelectOption(option: string): Promise<void> {
    await this.assetCategorySelect.sendKeys(option);
  }

  getAssetCategorySelect(): ElementFinder {
    return this.assetCategorySelect;
  }

  async getAssetCategorySelectedOption(): Promise<string> {
    return await this.assetCategorySelect.element(by.css('option:checked')).getText();
  }

  async purchaseOrderSelectLastOption(): Promise<void> {
    await this.purchaseOrderSelect.all(by.tagName('option')).last().click();
  }

  async purchaseOrderSelectOption(option: string): Promise<void> {
    await this.purchaseOrderSelect.sendKeys(option);
  }

  getPurchaseOrderSelect(): ElementFinder {
    return this.purchaseOrderSelect;
  }

  async getPurchaseOrderSelectedOption(): Promise<string> {
    return await this.purchaseOrderSelect.element(by.css('option:checked')).getText();
  }

  async deliveryNoteSelectLastOption(): Promise<void> {
    await this.deliveryNoteSelect.all(by.tagName('option')).last().click();
  }

  async deliveryNoteSelectOption(option: string): Promise<void> {
    await this.deliveryNoteSelect.sendKeys(option);
  }

  getDeliveryNoteSelect(): ElementFinder {
    return this.deliveryNoteSelect;
  }

  async getDeliveryNoteSelectedOption(): Promise<string> {
    return await this.deliveryNoteSelect.element(by.css('option:checked')).getText();
  }

  async jobSheetSelectLastOption(): Promise<void> {
    await this.jobSheetSelect.all(by.tagName('option')).last().click();
  }

  async jobSheetSelectOption(option: string): Promise<void> {
    await this.jobSheetSelect.sendKeys(option);
  }

  getJobSheetSelect(): ElementFinder {
    return this.jobSheetSelect;
  }

  async getJobSheetSelectedOption(): Promise<string> {
    return await this.jobSheetSelect.element(by.css('option:checked')).getText();
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

  async designatedUsersSelectLastOption(): Promise<void> {
    await this.designatedUsersSelect.all(by.tagName('option')).last().click();
  }

  async designatedUsersSelectOption(option: string): Promise<void> {
    await this.designatedUsersSelect.sendKeys(option);
  }

  getDesignatedUsersSelect(): ElementFinder {
    return this.designatedUsersSelect;
  }

  async getDesignatedUsersSelectedOption(): Promise<string> {
    return await this.designatedUsersSelect.element(by.css('option:checked')).getText();
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

export class AssetRegistrationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-assetRegistration-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-assetRegistration'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
