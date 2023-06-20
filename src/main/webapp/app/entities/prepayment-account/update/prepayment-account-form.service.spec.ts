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
