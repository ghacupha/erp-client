import { element, by, ElementFinder } from 'protractor';

export class FxRateTypeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-fx-rate-type div table .btn-danger'));
  title = element.all(by.css('jhi-fx-rate-type div h2#page-heading span')).first();
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

export class FxRateTypeUpdatePage {
  pageTitle = element(by.id('jhi-fx-rate-type-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  fxRateCodeInput = element(by.id('field_fxRateCode'));
  fxRateTypeInput = element(by.id('field_fxRateType'));
  fxRateDetailsInput = element(by.id('field_fxRateDetails'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setFxRateCodeInput(fxRateCode: string): Promise<void> {
    await this.fxRateCodeInput.sendKeys(fxRateCode);
  }

  async getFxRateCodeInput(): Promise<string> {
    return await this.fxRateCodeInput.getAttribute('value');
  }

  async setFxRateTypeInput(fxRateType: string): Promise<void> {
    await this.fxRateTypeInput.sendKeys(fxRateType);
  }

  async getFxRateTypeInput(): Promise<string> {
    return await this.fxRateTypeInput.getAttribute('value');
  }

  async setFxRateDetailsInput(fxRateDetails: string): Promise<void> {
    await this.fxRateDetailsInput.sendKeys(fxRateDetails);
  }

  async getFxRateDetailsInput(): Promise<string> {
    return await this.fxRateDetailsInput.getAttribute('value');
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

export class FxRateTypeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-fxRateType-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-fxRateType'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
