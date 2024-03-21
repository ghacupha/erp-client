import { element, by, ElementFinder } from 'protractor';

export class NbvCompilationJobComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-nbv-compilation-job div table .btn-danger'));
  title = element.all(by.css('jhi-nbv-compilation-job div h2#page-heading span')).first();
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

export class NbvCompilationJobUpdatePage {
  pageTitle = element(by.id('jhi-nbv-compilation-job-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  compilationJobIdentifierInput = element(by.id('field_compilationJobIdentifier'));
  compilationJobTimeOfRequestInput = element(by.id('field_compilationJobTimeOfRequest'));
  entitiesAffectedInput = element(by.id('field_entitiesAffected'));
  compilationStatusSelect = element(by.id('field_compilationStatus'));
  jobTitleInput = element(by.id('field_jobTitle'));
  numberOfBatchesInput = element(by.id('field_numberOfBatches'));
  numberOfProcessedBatchesInput = element(by.id('field_numberOfProcessedBatches'));
  processingTimeInput = element(by.id('field_processingTime'));

  activePeriodSelect = element(by.id('field_activePeriod'));
  initiatedBySelect = element(by.id('field_initiatedBy'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setCompilationJobIdentifierInput(compilationJobIdentifier: string): Promise<void> {
    await this.compilationJobIdentifierInput.sendKeys(compilationJobIdentifier);
  }

  async getCompilationJobIdentifierInput(): Promise<string> {
    return await this.compilationJobIdentifierInput.getAttribute('value');
  }

  async setCompilationJobTimeOfRequestInput(compilationJobTimeOfRequest: string): Promise<void> {
    await this.compilationJobTimeOfRequestInput.sendKeys(compilationJobTimeOfRequest);
  }

  async getCompilationJobTimeOfRequestInput(): Promise<string> {
    return await this.compilationJobTimeOfRequestInput.getAttribute('value');
  }

  async setEntitiesAffectedInput(entitiesAffected: string): Promise<void> {
    await this.entitiesAffectedInput.sendKeys(entitiesAffected);
  }

  async getEntitiesAffectedInput(): Promise<string> {
    return await this.entitiesAffectedInput.getAttribute('value');
  }

  async setCompilationStatusSelect(compilationStatus: string): Promise<void> {
    await this.compilationStatusSelect.sendKeys(compilationStatus);
  }

  async getCompilationStatusSelect(): Promise<string> {
    return await this.compilationStatusSelect.element(by.css('option:checked')).getText();
  }

  async compilationStatusSelectLastOption(): Promise<void> {
    await this.compilationStatusSelect.all(by.tagName('option')).last().click();
  }

  async setJobTitleInput(jobTitle: string): Promise<void> {
    await this.jobTitleInput.sendKeys(jobTitle);
  }

  async getJobTitleInput(): Promise<string> {
    return await this.jobTitleInput.getAttribute('value');
  }

  async setNumberOfBatchesInput(numberOfBatches: string): Promise<void> {
    await this.numberOfBatchesInput.sendKeys(numberOfBatches);
  }

  async getNumberOfBatchesInput(): Promise<string> {
    return await this.numberOfBatchesInput.getAttribute('value');
  }

  async setNumberOfProcessedBatchesInput(numberOfProcessedBatches: string): Promise<void> {
    await this.numberOfProcessedBatchesInput.sendKeys(numberOfProcessedBatches);
  }

  async getNumberOfProcessedBatchesInput(): Promise<string> {
    return await this.numberOfProcessedBatchesInput.getAttribute('value');
  }

  async setProcessingTimeInput(processingTime: string): Promise<void> {
    await this.processingTimeInput.sendKeys(processingTime);
  }

  async getProcessingTimeInput(): Promise<string> {
    return await this.processingTimeInput.getAttribute('value');
  }

  async activePeriodSelectLastOption(): Promise<void> {
    await this.activePeriodSelect.all(by.tagName('option')).last().click();
  }

  async activePeriodSelectOption(option: string): Promise<void> {
    await this.activePeriodSelect.sendKeys(option);
  }

  getActivePeriodSelect(): ElementFinder {
    return this.activePeriodSelect;
  }

  async getActivePeriodSelectedOption(): Promise<string> {
    return await this.activePeriodSelect.element(by.css('option:checked')).getText();
  }

  async initiatedBySelectLastOption(): Promise<void> {
    await this.initiatedBySelect.all(by.tagName('option')).last().click();
  }

  async initiatedBySelectOption(option: string): Promise<void> {
    await this.initiatedBySelect.sendKeys(option);
  }

  getInitiatedBySelect(): ElementFinder {
    return this.initiatedBySelect;
  }

  async getInitiatedBySelectedOption(): Promise<string> {
    return await this.initiatedBySelect.element(by.css('option:checked')).getText();
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

export class NbvCompilationJobDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-nbvCompilationJob-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-nbvCompilationJob'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
