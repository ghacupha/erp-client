import { element, by, ElementFinder } from 'protractor';

export class MonthlyPrepaymentReportRequisitionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-monthly-prepayment-report-requisition div table .btn-danger'));
  title = element.all(by.css('jhi-monthly-prepayment-report-requisition div h2#page-heading span')).first();
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

export class MonthlyPrepaymentReportRequisitionUpdatePage {
  pageTitle = element(by.id('jhi-monthly-prepayment-report-requisition-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));

  fiscalYearSelect = element(by.id('field_fiscalYear'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async fiscalYearSelectLastOption(): Promise<void> {
    await this.fiscalYearSelect.all(by.tagName('option')).last().click();
  }

  async fiscalYearSelectOption(option: string): Promise<void> {
    await this.fiscalYearSelect.sendKeys(option);
  }

  getFiscalYearSelect(): ElementFinder {
    return this.fiscalYearSelect;
  }

  async getFiscalYearSelectedOption(): Promise<string> {
    return await this.fiscalYearSelect.element(by.css('option:checked')).getText();
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

export class MonthlyPrepaymentReportRequisitionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-monthlyPrepaymentReportRequisition-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-monthlyPrepaymentReportRequisition'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
