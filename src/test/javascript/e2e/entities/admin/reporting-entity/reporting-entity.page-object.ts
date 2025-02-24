///
/// Erp System - Mark X No 10 (Jehoiada Series) Client 1.7.8
/// Copyright © 2021 - 2024 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { element, by, ElementFinder } from 'protractor';

export class ReportingEntityComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reporting-entity div table .btn-danger'));
  title = element.all(by.css('jhi-reporting-entity div h2#page-heading span')).first();
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

export class ReportingEntityUpdatePage {
  pageTitle = element(by.id('jhi-reporting-entity-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  entityNameInput = element(by.id('field_entityName'));

  reportingCurrencySelect = element(by.id('field_reportingCurrency'));
  retainedEarningsAccountSelect = element(by.id('field_retainedEarningsAccount'));

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

  async reportingCurrencySelectLastOption(): Promise<void> {
    await this.reportingCurrencySelect.all(by.tagName('option')).last().click();
  }

  async reportingCurrencySelectOption(option: string): Promise<void> {
    await this.reportingCurrencySelect.sendKeys(option);
  }

  getReportingCurrencySelect(): ElementFinder {
    return this.reportingCurrencySelect;
  }

  async getReportingCurrencySelectedOption(): Promise<string> {
    return await this.reportingCurrencySelect.element(by.css('option:checked')).getText();
  }

  async retainedEarningsAccountSelectLastOption(): Promise<void> {
    await this.retainedEarningsAccountSelect.all(by.tagName('option')).last().click();
  }

  async retainedEarningsAccountSelectOption(option: string): Promise<void> {
    await this.retainedEarningsAccountSelect.sendKeys(option);
  }

  getRetainedEarningsAccountSelect(): ElementFinder {
    return this.retainedEarningsAccountSelect;
  }

  async getRetainedEarningsAccountSelectedOption(): Promise<string> {
    return await this.retainedEarningsAccountSelect.element(by.css('option:checked')).getText();
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

export class ReportingEntityDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reportingEntity-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reportingEntity'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
