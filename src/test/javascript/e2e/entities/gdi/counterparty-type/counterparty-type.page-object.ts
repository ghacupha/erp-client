///
/// Erp System - Mark IX No 2 (Hilkiah Series) Client 1.6.3
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
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

export class CounterpartyTypeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-counterparty-type div table .btn-danger'));
  title = element.all(by.css('jhi-counterparty-type div h2#page-heading span')).first();
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

export class CounterpartyTypeUpdatePage {
  pageTitle = element(by.id('jhi-counterparty-type-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  counterpartyTypeCodeInput = element(by.id('field_counterpartyTypeCode'));
  counterPartyTypeInput = element(by.id('field_counterPartyType'));
  counterpartyTypeDescriptionInput = element(by.id('field_counterpartyTypeDescription'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setCounterpartyTypeCodeInput(counterpartyTypeCode: string): Promise<void> {
    await this.counterpartyTypeCodeInput.sendKeys(counterpartyTypeCode);
  }

  async getCounterpartyTypeCodeInput(): Promise<string> {
    return await this.counterpartyTypeCodeInput.getAttribute('value');
  }

  async setCounterPartyTypeInput(counterPartyType: string): Promise<void> {
    await this.counterPartyTypeInput.sendKeys(counterPartyType);
  }

  async getCounterPartyTypeInput(): Promise<string> {
    return await this.counterPartyTypeInput.getAttribute('value');
  }

  async setCounterpartyTypeDescriptionInput(counterpartyTypeDescription: string): Promise<void> {
    await this.counterpartyTypeDescriptionInput.sendKeys(counterpartyTypeDescription);
  }

  async getCounterpartyTypeDescriptionInput(): Promise<string> {
    return await this.counterpartyTypeDescriptionInput.getAttribute('value');
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

export class CounterpartyTypeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-counterpartyType-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-counterpartyType'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
