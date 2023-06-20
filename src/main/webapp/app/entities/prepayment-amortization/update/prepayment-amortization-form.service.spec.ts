import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../prepayment-amortization.test-samples';

import { PrepaymentAmortizationFormService } from './prepayment-amortization-form.service';

describe('PrepaymentAmortization Form Service', () => {
  let service: PrepaymentAmortizationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepaymentAmortizationFormService);
  });

  describe('Service methods', () => {
    describe('createPrepaymentAmortizationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPrepaymentAmortizationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            prepaymentPeriod: expect.any(Object),
            prepaymentAmount: expect.any(Object),
            inactive: expect.any(Object),
            prepaymentAccount: expect.any(Object),
            settlementCurrency: expect.any(Object),
            debitAccount: expect.any(Object),
            creditAccount: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IPrepaymentAmortization should create a new form with FormGroup', () => {
        const formGroup = service.createPrepaymentAmortizationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            prepaymentPeriod: expect.any(Object),
            prepaymentAmount: expect.any(Object),
            inactive: expect.any(Object),
            prepaymentAccount: expect.any(Object),
            settlementCurrency: expect.any(Object),
            debitAccount: expect.any(Object),
            creditAccount: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getPrepaymentAmortization', () => {
      it('should return NewPrepaymentAmortization for default PrepaymentAmortization initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPrepaymentAmortizationFormGroup(sampleWithNewData);

        const prepaymentAmortization = service.getPrepaymentAmortization(formGroup) as any;

        expect(prepaymentAmortization).toMatchObject(sampleWithNewData);
      });

      it('should return NewPrepaymentAmortization for empty PrepaymentAmortization initial value', () => {
        const formGroup = service.createPrepaymentAmortizationFormGroup();

        const prepaymentAmortization = service.getPrepaymentAmortization(formGroup) as any;

        expect(prepaymentAmortization).toMatchObject({});
      });

      it('should return IPrepaymentAmortization', () => {
        const formGroup = service.createPrepaymentAmortizationFormGroup(sampleWithRequiredData);

        const prepaymentAmortization = service.getPrepaymentAmortization(formGroup) as any;

        expect(prepaymentAmortization).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPrepaymentAmortization should not enable id FormControl', () => {
        const formGroup = service.createPrepaymentAmortizationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPrepaymentAmortization should disable id FormControl', () => {
        const formGroup = service.createPrepaymentAmortizationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
