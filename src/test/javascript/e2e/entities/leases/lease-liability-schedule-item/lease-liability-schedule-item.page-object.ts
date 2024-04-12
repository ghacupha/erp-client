///
/// Erp System - Mark X No 7 (Jehoiada Series) Client 1.7.5
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

export class LeaseLiabilityScheduleItemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-lease-liability-schedule-item div table .btn-danger'));
  title = element.all(by.css('jhi-lease-liability-schedule-item div h2#page-heading span')).first();
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

export class LeaseLiabilityScheduleItemUpdatePage {
  pageTitle = element(by.id('jhi-lease-liability-schedule-item-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  sequenceNumberInput = element(by.id('field_sequenceNumber'));
  periodIncludedInput = element(by.id('field_periodIncluded'));
  periodStartDateInput = element(by.id('field_periodStartDate'));
  periodEndDateInput = element(by.id('field_periodEndDate'));
  openingBalanceInput = element(by.id('field_openingBalance'));
  cashPaymentInput = element(by.id('field_cashPayment'));
  principalPaymentInput = element(by.id('field_principalPayment'));
  interestPaymentInput = element(by.id('field_interestPayment'));
  outstandingBalanceInput = element(by.id('field_outstandingBalance'));
  interestPayableOpeningInput = element(by.id('field_interestPayableOpening'));
  interestExpenseAccruedInput = element(by.id('field_interestExpenseAccrued'));
  interestPayableBalanceInput = element(by.id('field_interestPayableBalance'));

  placeholderSelect = element(by.id('field_placeholder'));
  leaseContractSelect = element(by.id('field_leaseContract'));
  leaseModelMetadataSelect = element(by.id('field_leaseModelMetadata'));
  universallyUniqueMappingSelect = element(by.id('field_universallyUniqueMapping'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setSequenceNumberInput(sequenceNumber: string): Promise<void> {
    await this.sequenceNumberInput.sendKeys(sequenceNumber);
  }

  async getSequenceNumberInput(): Promise<string> {
    return await this.sequenceNumberInput.getAttribute('value');
  }

  getPeriodIncludedInput(): ElementFinder {
    return this.periodIncludedInput;
  }

  async setPeriodStartDateInput(periodStartDate: string): Promise<void> {
    await this.periodStartDateInput.sendKeys(periodStartDate);
  }

  async getPeriodStartDateInput(): Promise<string> {
    return await this.periodStartDateInput.getAttribute('value');
  }

  async setPeriodEndDateInput(periodEndDate: string): Promise<void> {
    await this.periodEndDateInput.sendKeys(periodEndDate);
  }

  async getPeriodEndDateInput(): Promise<string> {
    return await this.periodEndDateInput.getAttribute('value');
  }

  async setOpeningBalanceInput(openingBalance: string): Promise<void> {
    await this.openingBalanceInput.sendKeys(openingBalance);
  }

  async getOpeningBalanceInput(): Promise<string> {
    return await this.openingBalanceInput.getAttribute('value');
  }

  async setCashPaymentInput(cashPayment: string): Promise<void> {
    await this.cashPaymentInput.sendKeys(cashPayment);
  }

  async getCashPaymentInput(): Promise<string> {
    return await this.cashPaymentInput.getAttribute('value');
  }

  async setPrincipalPaymentInput(principalPayment: string): Promise<void> {
    await this.principalPaymentInput.sendKeys(principalPayment);
  }

  async getPrincipalPaymentInput(): Promise<string> {
    return await this.principalPaymentInput.getAttribute('value');
  }

  async setInterestPaymentInput(interestPayment: string): Promise<void> {
    await this.interestPaymentInput.sendKeys(interestPayment);
  }

  async getInterestPaymentInput(): Promise<string> {
    return await this.interestPaymentInput.getAttribute('value');
  }

  async setOutstandingBalanceInput(outstandingBalance: string): Promise<void> {
    await this.outstandingBalanceInput.sendKeys(outstandingBalance);
  }

  async getOutstandingBalanceInput(): Promise<string> {
    return await this.outstandingBalanceInput.getAttribute('value');
  }

  async setInterestPayableOpeningInput(interestPayableOpening: string): Promise<void> {
    await this.interestPayableOpeningInput.sendKeys(interestPayableOpening);
  }

  async getInterestPayableOpeningInput(): Promise<string> {
    return await this.interestPayableOpeningInput.getAttribute('value');
  }

  async setInterestExpenseAccruedInput(interestExpenseAccrued: string): Promise<void> {
    await this.interestExpenseAccruedInput.sendKeys(interestExpenseAccrued);
  }

  async getInterestExpenseAccruedInput(): Promise<string> {
    return await this.interestExpenseAccruedInput.getAttribute('value');
  }

  async setInterestPayableBalanceInput(interestPayableBalance: string): Promise<void> {
    await this.interestPayableBalanceInput.sendKeys(interestPayableBalance);
  }

  async getInterestPayableBalanceInput(): Promise<string> {
    return await this.interestPayableBalanceInput.getAttribute('value');
  }

  async placeholderSelectLastOption(): Promise<void> {
    await this.placeholderSelect.all(by.tagName('option')).last().click();
  }

  async placeholderSelectOption(option: string): Promise<void> {
    await this.placeholderSelect.sendKeys(option);
  }

  getPlaceholderSelect(): ElementFinder {
    return this.placeholderSelect;
  }

  async getPlaceholderSelectedOption(): Promise<string> {
    return await this.placeholderSelect.element(by.css('option:checked')).getText();
  }

  async leaseContractSelectLastOption(): Promise<void> {
    await this.leaseContractSelect.all(by.tagName('option')).last().click();
  }

  async leaseContractSelectOption(option: string): Promise<void> {
    await this.leaseContractSelect.sendKeys(option);
  }

  getLeaseContractSelect(): ElementFinder {
    return this.leaseContractSelect;
  }

  async getLeaseContractSelectedOption(): Promise<string> {
    return await this.leaseContractSelect.element(by.css('option:checked')).getText();
  }

  async leaseModelMetadataSelectLastOption(): Promise<void> {
    await this.leaseModelMetadataSelect.all(by.tagName('option')).last().click();
  }

  async leaseModelMetadataSelectOption(option: string): Promise<void> {
    await this.leaseModelMetadataSelect.sendKeys(option);
  }

  getLeaseModelMetadataSelect(): ElementFinder {
    return this.leaseModelMetadataSelect;
  }

  async getLeaseModelMetadataSelectedOption(): Promise<string> {
    return await this.leaseModelMetadataSelect.element(by.css('option:checked')).getText();
  }

  async universallyUniqueMappingSelectLastOption(): Promise<void> {
    await this.universallyUniqueMappingSelect.all(by.tagName('option')).last().click();
  }

  async universallyUniqueMappingSelectOption(option: string): Promise<void> {
    await this.universallyUniqueMappingSelect.sendKeys(option);
  }

  getUniversallyUniqueMappingSelect(): ElementFinder {
    return this.universallyUniqueMappingSelect;
  }

  async getUniversallyUniqueMappingSelectedOption(): Promise<string> {
    return await this.universallyUniqueMappingSelect.element(by.css('option:checked')).getText();
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

export class LeaseLiabilityScheduleItemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-leaseLiabilityScheduleItem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-leaseLiabilityScheduleItem'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
