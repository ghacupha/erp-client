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
