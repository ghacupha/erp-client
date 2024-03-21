import { element, by, ElementFinder } from 'protractor';

export class GdiMasterDataIndexComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-gdi-master-data-index div table .btn-danger'));
  title = element.all(by.css('jhi-gdi-master-data-index div h2#page-heading span')).first();
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

export class GdiMasterDataIndexUpdatePage {
  pageTitle = element(by.id('jhi-gdi-master-data-index-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  entityNameInput = element(by.id('field_entityName'));
  databaseNameInput = element(by.id('field_databaseName'));
  businessDescriptionInput = element(by.id('field_businessDescription'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setEntityNameInput(entityName: string): Promise<void> {
    await this.entityNameInput.sendKeys(entityName);
  }

  async getEntityNameInput(): Promise<string> {
    return await this.entityNameInput.getAttribute('value');
  }

  async setDatabaseNameInput(databaseName: string): Promise<void> {
    await this.databaseNameInput.sendKeys(databaseName);
  }

  async getDatabaseNameInput(): Promise<string> {
    return await this.databaseNameInput.getAttribute('value');
  }

  async setBusinessDescriptionInput(businessDescription: string): Promise<void> {
    await this.businessDescriptionInput.sendKeys(businessDescription);
  }

  async getBusinessDescriptionInput(): Promise<string> {
    return await this.businessDescriptionInput.getAttribute('value');
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

export class GdiMasterDataIndexDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-gdiMasterDataIndex-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-gdiMasterDataIndex'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
