import { element, by, ElementFinder } from 'protractor';

export class WorkInProgressTransferComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-work-in-progress-transfer div table .btn-danger'));
  title = element.all(by.css('jhi-work-in-progress-transfer div h2#page-heading span')).first();
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

export class WorkInProgressTransferUpdatePage {
  pageTitle = element(by.id('jhi-work-in-progress-transfer-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  descriptionInput = element(by.id('field_description'));
  targetAssetNumberInput = element(by.id('field_targetAssetNumber'));

  workInProgressRegistrationSelect = element(by.id('field_workInProgressRegistration'));
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

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setTargetAssetNumberInput(targetAssetNumber: string): Promise<void> {
    await this.targetAssetNumberInput.sendKeys(targetAssetNumber);
  }

  async getTargetAssetNumberInput(): Promise<string> {
    return await this.targetAssetNumberInput.getAttribute('value');
  }

  async workInProgressRegistrationSelectLastOption(): Promise<void> {
    await this.workInProgressRegistrationSelect.all(by.tagName('option')).last().click();
  }

  async workInProgressRegistrationSelectOption(option: string): Promise<void> {
    await this.workInProgressRegistrationSelect.sendKeys(option);
  }

  getWorkInProgressRegistrationSelect(): ElementFinder {
    return this.workInProgressRegistrationSelect;
  }

  async getWorkInProgressRegistrationSelectedOption(): Promise<string> {
    return await this.workInProgressRegistrationSelect.element(by.css('option:checked')).getText();
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

export class WorkInProgressTransferDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-workInProgressTransfer-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-workInProgressTransfer'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
