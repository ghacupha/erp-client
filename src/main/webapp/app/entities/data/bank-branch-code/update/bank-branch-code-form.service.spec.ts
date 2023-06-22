import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../bank-branch-code.test-samples';

import { BankBranchCodeFormService } from './bank-branch-code-form.service';

describe('BankBranchCode Form Service', () => {
  let service: BankBranchCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankBranchCodeFormService);
  });

  describe('Service methods', () => {
    describe('createBankBranchCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBankBranchCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bankCode: expect.any(Object),
            bankName: expect.any(Object),
            branchCode: expect.any(Object),
            branchName: expect.any(Object),
            notes: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IBankBranchCode should create a new form with FormGroup', () => {
        const formGroup = service.createBankBranchCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bankCode: expect.any(Object),
            bankName: expect.any(Object),
            branchCode: expect.any(Object),
            branchName: expect.any(Object),
            notes: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getBankBranchCode', () => {
      it('should return NewBankBranchCode for default BankBranchCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBankBranchCodeFormGroup(sampleWithNewData);

        const bankBranchCode = service.getBankBranchCode(formGroup) as any;

        expect(bankBranchCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewBankBranchCode for empty BankBranchCode initial value', () => {
        const formGroup = service.createBankBranchCodeFormGroup();

        const bankBranchCode = service.getBankBranchCode(formGroup) as any;

        expect(bankBranchCode).toMatchObject({});
      });

      it('should return IBankBranchCode', () => {
        const formGroup = service.createBankBranchCodeFormGroup(sampleWithRequiredData);

        const bankBranchCode = service.getBankBranchCode(formGroup) as any;

        expect(bankBranchCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBankBranchCode should not enable id FormControl', () => {
        const formGroup = service.createBankBranchCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBankBranchCode should disable id FormControl', () => {
        const formGroup = service.createBankBranchCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
