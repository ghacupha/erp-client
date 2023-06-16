import { element, by, ElementFinder } from 'protractor';

export class WorkInProgressRegistrationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-work-in-progress-registration div table .btn-danger'));
  title = element.all(by.css('jhi-work-in-progress-registration div h2#page-heading span')).first();
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

export class WorkInProgressRegistrationUpdatePage {
  pageTitle = element(by.id('jhi-work-in-progress-registration-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  sequenceNumberInput = element(by.id('field_sequenceNumber'));
  particularsInput = element(by.id('field_particulars'));
  instalmentAmountInput = element(by.id('field_instalmentAmount'));
  commentsInput = element(by.id('file_comments'));

  placeholderSelect = element(by.id('field_placeholder'));
  paymentInvoicesSelect = element(by.id('field_paymentInvoices'));
  serviceOutletSelect = element(by.id('field_serviceOutlet'));
  settlementSelect = element(by.id('field_settlement'));
  purchaseOrderSelect = element(by.id('field_purchaseOrder'));
  deliveryNoteSelect = element(by.id('field_deliveryNote'));
  jobSheetSelect = element(by.id('field_jobSheet'));
  dealerSelect = element(by.id('field_dealer'));
  workInProgressGroupSelect = element(by.id('field_workInProgressGroup'));
  settlementCurrencySelect = element(by.id('field_settlementCurrency'));
  workProjectRegisterSelect = element(by.id('field_workProjectRegister'));
  businessDocumentSelect = element(by.id('field_businessDocument'));
  assetAccessorySelect = element(by.id('field_assetAccessory'));
  assetWarrantySelect = element(by.id('field_assetWarranty'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setSequenceNumberInput(sequenceNumber: string): Promise<void> {
    await this.sequenceNumberInput.sendKeys(sequenceNumber);
  }

  async getSequenceNumberInput(): Promise<string> {
    return await this.sequenceNumberInput.getAttribute('value');
  }

  async setParticularsInput(particulars: string): Promise<void> {
    await this.particularsInput.sendKeys(particulars);
  }

  async getParticularsInput(): Promise<string> {
    return await this.particularsInput.getAttribute('value');
  }

  async setInstalmentAmountInput(instalmentAmount: string): Promise<void> {
    await this.instalmentAmountInput.sendKeys(instalmentAmount);
  }

  async getInstalmentAmountInput(): Promise<string> {
    return await this.instalmentAmountInput.getAttribute('value');
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

  async workInProgressGroupSelectLastOption(): Promise<void> {
    await this.workInProgressGroupSelect.all(by.tagName('option')).last().click();
  }

  async workInProgressGroupSelectOption(option: string): Promise<void> {
    await this.workInProgressGroupSelect.sendKeys(option);
  }

  getWorkInProgressGroupSelect(): ElementFinder {
    return this.workInProgressGroupSelect;
  }

  async getWorkInProgressGroupSelectedOption(): Promise<string> {
    return await this.workInProgressGroupSelect.element(by.css('option:checked')).getText();
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

  async workProjectRegisterSelectLastOption(): Promise<void> {
    await this.workProjectRegisterSelect.all(by.tagName('option')).last().click();
  }

  async workProjectRegisterSelectOption(option: string): Promise<void> {
    await this.workProjectRegisterSelect.sendKeys(option);
  }

  getWorkProjectRegisterSelect(): ElementFinder {
    return this.workProjectRegisterSelect;
  }

  async getWorkProjectRegisterSelectedOption(): Promise<string> {
    return await this.workProjectRegisterSelect.element(by.css('option:checked')).getText();
  }

  async businessDocumentSelectLastOption(): Promise<void> {
    await this.businessDocumentSelect.all(by.tagName('option')).last().click();
  }

  async businessDocumentSelectOption(option: string): Promise<void> {
    await this.businessDocumentSelect.sendKeys(option);
  }

  getBusinessDocumentSelect(): ElementFinder {
    return this.businessDocumentSelect;
  }

  async getBusinessDocumentSelectedOption(): Promise<string> {
    return await this.businessDocumentSelect.element(by.css('option:checked')).getText();
  }

  async assetAccessorySelectLastOption(): Promise<void> {
    await this.assetAccessorySelect.all(by.tagName('option')).last().click();
  }

  async assetAccessorySelectOption(option: string): Promise<void> {
    await this.assetAccessorySelect.sendKeys(option);
  }

  getAssetAccessorySelect(): ElementFinder {
    return this.assetAccessorySelect;
  }

  async getAssetAccessorySelectedOption(): Promise<string> {
    return await this.assetAccessorySelect.element(by.css('option:checked')).getText();
  }

  async assetWarrantySelectLastOption(): Promise<void> {
    await this.assetWarrantySelect.all(by.tagName('option')).last().click();
  }

  async assetWarrantySelectOption(option: string): Promise<void> {
    await this.assetWarrantySelect.sendKeys(option);
  }

  getAssetWarrantySelect(): ElementFinder {
    return this.assetWarrantySelect;
  }

  async getAssetWarrantySelectedOption(): Promise<string> {
    return await this.assetWarrantySelect.element(by.css('option:checked')).getText();
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

export class WorkInProgressRegistrationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-workInProgressRegistration-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-workInProgressRegistration'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
