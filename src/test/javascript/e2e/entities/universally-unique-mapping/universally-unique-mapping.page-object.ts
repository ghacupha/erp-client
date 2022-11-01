import { element, by, ElementFinder } from 'protractor';

export class UniversallyUniqueMappingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-universally-unique-mapping div table .btn-danger'));
  title = element.all(by.css('jhi-universally-unique-mapping div h2#page-heading span')).first();
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

export class UniversallyUniqueMappingUpdatePage {
  pageTitle = element(by.id('jhi-universally-unique-mapping-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  universalKeyInput = element(by.id('field_universalKey'));
  mappedValueInput = element(by.id('field_mappedValue'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setUniversalKeyInput(universalKey: string): Promise<void> {
    await this.universalKeyInput.sendKeys(universalKey);
  }

  async getUniversalKeyInput(): Promise<string> {
    return await this.universalKeyInput.getAttribute('value');
  }

  async setMappedValueInput(mappedValue: string): Promise<void> {
    await this.mappedValueInput.sendKeys(mappedValue);
  }

  async getMappedValueInput(): Promise<string> {
    return await this.mappedValueInput.getAttribute('value');
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

export class UniversallyUniqueMappingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-universallyUniqueMapping-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-universallyUniqueMapping'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
