///
/// Erp System - Mark VII No 1 (Gideon Series) Client 1.5.5
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

export class IsoCountryCodeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-iso-country-code div table .btn-danger'));
  title = element.all(by.css('jhi-iso-country-code div h2#page-heading span')).first();
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

export class IsoCountryCodeUpdatePage {
  pageTitle = element(by.id('jhi-iso-country-code-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  countryCodeInput = element(by.id('field_countryCode'));
  countryDescriptionInput = element(by.id('field_countryDescription'));
  continentCodeInput = element(by.id('field_continentCode'));
  continentNameInput = element(by.id('field_continentName'));
  subRegionInput = element(by.id('field_subRegion'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setCountryCodeInput(countryCode: string): Promise<void> {
    await this.countryCodeInput.sendKeys(countryCode);
  }

  async getCountryCodeInput(): Promise<string> {
    return await this.countryCodeInput.getAttribute('value');
  }

  async setCountryDescriptionInput(countryDescription: string): Promise<void> {
    await this.countryDescriptionInput.sendKeys(countryDescription);
  }

  async getCountryDescriptionInput(): Promise<string> {
    return await this.countryDescriptionInput.getAttribute('value');
  }

  async setContinentCodeInput(continentCode: string): Promise<void> {
    await this.continentCodeInput.sendKeys(continentCode);
  }

  async getContinentCodeInput(): Promise<string> {
    return await this.continentCodeInput.getAttribute('value');
  }

  async setContinentNameInput(continentName: string): Promise<void> {
    await this.continentNameInput.sendKeys(continentName);
  }

  async getContinentNameInput(): Promise<string> {
    return await this.continentNameInput.getAttribute('value');
  }

  async setSubRegionInput(subRegion: string): Promise<void> {
    await this.subRegionInput.sendKeys(subRegion);
  }

  async getSubRegionInput(): Promise<string> {
    return await this.subRegionInput.getAttribute('value');
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

export class IsoCountryCodeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-isoCountryCode-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-isoCountryCode'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
