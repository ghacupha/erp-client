import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../payment-calculation.test-samples';

import { PaymentCalculationFormService } from './payment-calculation-form.service';

describe('PaymentCalculation Form Service', () => {
  let service: PaymentCalculationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentCalculationFormService);
  });

  describe('Service methods', () => {
    describe('createPaymentCalculationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPaymentCalculationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            paymentExpense: expect.any(Object),
            withholdingVAT: expect.any(Object),
            withholdingTax: expect.any(Object),
            paymentAmount: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            paymentCategory: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IPaymentCalculation should create a new form with FormGroup', () => {
        const formGroup = service.createPaymentCalculationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            paymentExpense: expect.any(Object),
            withholdingVAT: expect.any(Object),
            withholdingTax: expect.any(Object),
            paymentAmount: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            paymentCategory: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getPaymentCalculation', () => {
      it('should return NewPaymentCalculation for default PaymentCalculation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPaymentCalculationFormGroup(sampleWithNewData);

        const paymentCalculation = service.getPaymentCalculation(formGroup) as any;

        expect(paymentCalculation).toMatchObject(sampleWithNewData);
      });

      it('should return NewPaymentCalculation for empty PaymentCalculation initial value', () => {
        const formGroup = service.createPaymentCalculationFormGroup();

        const paymentCalculation = service.getPaymentCalculation(formGroup) as any;

        expect(paymentCalculation).toMatchObject({});
      });

      it('should return IPaymentCalculation', () => {
        const formGroup = service.createPaymentCalculationFormGroup(sampleWithRequiredData);

        const paymentCalculation = service.getPaymentCalculation(formGroup) as any;

        expect(paymentCalculation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPaymentCalculation should not enable id FormControl', () => {
        const formGroup = service.createPaymentCalculationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPaymentCalculation should disable id FormControl', () => {
        const formGroup = service.createPaymentCalculationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
