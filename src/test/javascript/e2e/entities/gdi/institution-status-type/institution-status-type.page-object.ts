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

export class InstitutionStatusTypeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-institution-status-type div table .btn-danger'));
  title = element.all(by.css('jhi-institution-status-type div h2#page-heading span')).first();
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

export class InstitutionStatusTypeUpdatePage {
  pageTitle = element(by.id('jhi-institution-status-type-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  institutionStatusCodeInput = element(by.id('field_institutionStatusCode'));
  institutionStatusTypeInput = element(by.id('field_institutionStatusType'));
  insitutionStatusTypeDescriptionInput = element(by.id('field_insitutionStatusTypeDescription'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setInstitutionStatusCodeInput(institutionStatusCode: string): Promise<void> {
    await this.institutionStatusCodeInput.sendKeys(institutionStatusCode);
  }

  async getInstitutionStatusCodeInput(): Promise<string> {
    return await this.institutionStatusCodeInput.getAttribute('value');
  }

  async setInstitutionStatusTypeInput(institutionStatusType: string): Promise<void> {
    await this.institutionStatusTypeInput.sendKeys(institutionStatusType);
  }

  async getInstitutionStatusTypeInput(): Promise<string> {
    return await this.institutionStatusTypeInput.getAttribute('value');
  }

  async setInsitutionStatusTypeDescriptionInput(insitutionStatusTypeDescription: string): Promise<void> {
    await this.insitutionStatusTypeDescriptionInput.sendKeys(insitutionStatusTypeDescription);
  }

  async getInsitutionStatusTypeDescriptionInput(): Promise<string> {
    return await this.insitutionStatusTypeDescriptionInput.getAttribute('value');
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

export class InstitutionStatusTypeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-institutionStatusType-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-institutionStatusType'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
