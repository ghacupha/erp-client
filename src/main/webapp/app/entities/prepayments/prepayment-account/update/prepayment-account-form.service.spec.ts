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

import { sampleWithRequiredData, sampleWithNewData } from '../prepayment-account.test-samples';

import { PrepaymentAccountFormService } from './prepayment-account-form.service';

describe('PrepaymentAccount Form Service', () => {
  let service: PrepaymentAccountFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepaymentAccountFormService);
  });

  describe('Service methods', () => {
    describe('createPrepaymentAccountFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPrepaymentAccountFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catalogueNumber: expect.any(Object),
            particulars: expect.any(Object),
            notes: expect.any(Object),
            prepaymentAmount: expect.any(Object),
            prepaymentGuid: expect.any(Object),
            settlementCurrency: expect.any(Object),
            prepaymentTransaction: expect.any(Object),
            serviceOutlet: expect.any(Object),
            dealer: expect.any(Object),
            debitAccount: expect.any(Object),
            transferAccount: expect.any(Object),
            placeholders: expect.any(Object),
            generalParameters: expect.any(Object),
            prepaymentParameters: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });

      it('passing IPrepaymentAccount should create a new form with FormGroup', () => {
        const formGroup = service.createPrepaymentAccountFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catalogueNumber: expect.any(Object),
            particulars: expect.any(Object),
            notes: expect.any(Object),
            prepaymentAmount: expect.any(Object),
            prepaymentGuid: expect.any(Object),
            settlementCurrency: expect.any(Object),
            prepaymentTransaction: expect.any(Object),
            serviceOutlet: expect.any(Object),
            dealer: expect.any(Object),
            debitAccount: expect.any(Object),
            transferAccount: expect.any(Object),
            placeholders: expect.any(Object),
            generalParameters: expect.any(Object),
            prepaymentParameters: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });
    });

    describe('getPrepaymentAccount', () => {
      it('should return NewPrepaymentAccount for default PrepaymentAccount initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPrepaymentAccountFormGroup(sampleWithNewData);

        const prepaymentAccount = service.getPrepaymentAccount(formGroup) as any;

        expect(prepaymentAccount).toMatchObject(sampleWithNewData);
      });

      it('should return NewPrepaymentAccount for empty PrepaymentAccount initial value', () => {
        const formGroup = service.createPrepaymentAccountFormGroup();

        const prepaymentAccount = service.getPrepaymentAccount(formGroup) as any;

        expect(prepaymentAccount).toMatchObject({});
      });

      it('should return IPrepaymentAccount', () => {
        const formGroup = service.createPrepaymentAccountFormGroup(sampleWithRequiredData);

        const prepaymentAccount = service.getPrepaymentAccount(formGroup) as any;

        expect(prepaymentAccount).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPrepaymentAccount should not enable id FormControl', () => {
        const formGroup = service.createPrepaymentAccountFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPrepaymentAccount should disable id FormControl', () => {
        const formGroup = service.createPrepaymentAccountFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
