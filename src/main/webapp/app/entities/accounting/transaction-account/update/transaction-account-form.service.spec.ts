///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
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

import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../transaction-account.test-samples';

import { TransactionAccountFormService } from './transaction-account-form.service';

describe('TransactionAccount Form Service', () => {
  let service: TransactionAccountFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionAccountFormService);
  });

  describe('Service methods', () => {
    describe('createTransactionAccountFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTransactionAccountFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountNumber: expect.any(Object),
            accountName: expect.any(Object),
            notes: expect.any(Object),
            parentAccount: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ITransactionAccount should create a new form with FormGroup', () => {
        const formGroup = service.createTransactionAccountFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountNumber: expect.any(Object),
            accountName: expect.any(Object),
            notes: expect.any(Object),
            parentAccount: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getTransactionAccount', () => {
      it('should return NewTransactionAccount for default TransactionAccount initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTransactionAccountFormGroup(sampleWithNewData);

        const transactionAccount = service.getTransactionAccount(formGroup) as any;

        expect(transactionAccount).toMatchObject(sampleWithNewData);
      });

      it('should return NewTransactionAccount for empty TransactionAccount initial value', () => {
        const formGroup = service.createTransactionAccountFormGroup();

        const transactionAccount = service.getTransactionAccount(formGroup) as any;

        expect(transactionAccount).toMatchObject({});
      });

      it('should return ITransactionAccount', () => {
        const formGroup = service.createTransactionAccountFormGroup(sampleWithRequiredData);

        const transactionAccount = service.getTransactionAccount(formGroup) as any;

        expect(transactionAccount).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITransactionAccount should not enable id FormControl', () => {
        const formGroup = service.createTransactionAccountFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTransactionAccount should disable id FormControl', () => {
        const formGroup = service.createTransactionAccountFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
