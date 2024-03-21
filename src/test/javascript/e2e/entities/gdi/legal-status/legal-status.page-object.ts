import { element, by, ElementFinder } from 'protractor';

export class LegalStatusComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-legal-status div table .btn-danger'));
  title = element.all(by.css('jhi-legal-status div h2#page-heading span')).first();
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

export class LegalStatusUpdatePage {
  pageTitle = element(by.id('jhi-legal-status-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  legalStatusCodeInput = element(by.id('field_legalStatusCode'));
  legalStatusTypeInput = element(by.id('field_legalStatusType'));
  legalStatusDescriptionInput = element(by.id('field_legalStatusDescription'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setLegalStatusCodeInput(legalStatusCode: string): Promise<void> {
    await this.legalStatusCodeInput.sendKeys(legalStatusCode);
  }

  async getLegalStatusCodeInput(): Promise<string> {
    return await this.legalStatusCodeInput.getAttribute('value');
  }

  async setLegalStatusTypeInput(legalStatusType: string): Promise<void> {
    await this.legalStatusTypeInput.sendKeys(legalStatusType);
  }

  async getLegalStatusTypeInput(): Promise<string> {
    return await this.legalStatusTypeInput.getAttribute('value');
  }

  async setLegalStatusDescriptionInput(legalStatusDescription: string): Promise<void> {
    await this.legalStatusDescriptionInput.sendKeys(legalStatusDescription);
  }

  async getLegalStatusDescriptionInput(): Promise<string> {
    return await this.legalStatusDescriptionInput.getAttribute('value');
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

export class LegalStatusDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-legalStatus-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-legalStatus'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
