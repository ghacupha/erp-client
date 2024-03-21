import { element, by, ElementFinder } from 'protractor';

export class RouAccountBalanceReportComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-rou-account-balance-report div table .btn-danger'));
  title = element.all(by.css('jhi-rou-account-balance-report div h2#page-heading span')).first();
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

export class RouAccountBalanceReportUpdatePage {
  pageTitle = element(by.id('jhi-rou-account-balance-report-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  requestIdInput = element(by.id('field_requestId'));
  timeOfRequestInput = element(by.id('field_timeOfRequest'));
  reportIsCompiledInput = element(by.id('field_reportIsCompiled'));
  fileChecksumInput = element(by.id('field_fileChecksum'));
  tamperedInput = element(by.id('field_tampered'));
  filenameInput = element(by.id('field_filename'));
  reportParametersInput = element(by.id('field_reportParameters'));
  reportFileInput = element(by.id('file_reportFile'));

  requestedBySelect = element(by.id('field_requestedBy'));
  reportingMonthSelect = element(by.id('field_reportingMonth'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setRequestIdInput(requestId: string): Promise<void> {
    await this.requestIdInput.sendKeys(requestId);
  }

  async getRequestIdInput(): Promise<string> {
    return await this.requestIdInput.getAttribute('value');
  }

  async setTimeOfRequestInput(timeOfRequest: string): Promise<void> {
    await this.timeOfRequestInput.sendKeys(timeOfRequest);
  }

  async getTimeOfRequestInput(): Promise<string> {
    return await this.timeOfRequestInput.getAttribute('value');
  }

  getReportIsCompiledInput(): ElementFinder {
    return this.reportIsCompiledInput;
  }

  async setFileChecksumInput(fileChecksum: string): Promise<void> {
    await this.fileChecksumInput.sendKeys(fileChecksum);
  }

  async getFileChecksumInput(): Promise<string> {
    return await this.fileChecksumInput.getAttribute('value');
  }

  getTamperedInput(): ElementFinder {
    return this.tamperedInput;
  }

  async setFilenameInput(filename: string): Promise<void> {
    await this.filenameInput.sendKeys(filename);
  }

  async getFilenameInput(): Promise<string> {
    return await this.filenameInput.getAttribute('value');
  }

  async setReportParametersInput(reportParameters: string): Promise<void> {
    await this.reportParametersInput.sendKeys(reportParameters);
  }

  async getReportParametersInput(): Promise<string> {
    return await this.reportParametersInput.getAttribute('value');
  }

  async setReportFileInput(reportFile: string): Promise<void> {
    await this.reportFileInput.sendKeys(reportFile);
  }

  async getReportFileInput(): Promise<string> {
    return await this.reportFileInput.getAttribute('value');
  }

  async requestedBySelectLastOption(): Promise<void> {
    await this.requestedBySelect.all(by.tagName('option')).last().click();
  }

  async requestedBySelectOption(option: string): Promise<void> {
    await this.requestedBySelect.sendKeys(option);
  }

  getRequestedBySelect(): ElementFinder {
    return this.requestedBySelect;
  }

  async getRequestedBySelectedOption(): Promise<string> {
    return await this.requestedBySelect.element(by.css('option:checked')).getText();
  }

  async reportingMonthSelectLastOption(): Promise<void> {
    await this.reportingMonthSelect.all(by.tagName('option')).last().click();
  }

  async reportingMonthSelectOption(option: string): Promise<void> {
    await this.reportingMonthSelect.sendKeys(option);
  }

  getReportingMonthSelect(): ElementFinder {
    return this.reportingMonthSelect;
  }

  async getReportingMonthSelectedOption(): Promise<string> {
    return await this.reportingMonthSelect.element(by.css('option:checked')).getText();
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

export class RouAccountBalanceReportDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rouAccountBalanceReport-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rouAccountBalanceReport'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
