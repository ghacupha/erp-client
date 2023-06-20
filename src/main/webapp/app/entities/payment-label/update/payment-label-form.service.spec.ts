import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../payment-label.test-samples';

import { PaymentLabelFormService } from './payment-label-form.service';

describe('PaymentLabel Form Service', () => {
  let service: PaymentLabelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentLabelFormService);
  });

  describe('Service methods', () => {
    describe('createPaymentLabelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPaymentLabelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            comments: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            containingPaymentLabel: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IPaymentLabel should create a new form with FormGroup', () => {
        const formGroup = service.createPaymentLabelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            comments: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            containingPaymentLabel: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getPaymentLabel', () => {
      it('should return NewPaymentLabel for default PaymentLabel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPaymentLabelFormGroup(sampleWithNewData);

        const paymentLabel = service.getPaymentLabel(formGroup) as any;

        expect(paymentLabel).toMatchObject(sampleWithNewData);
      });

      it('should return NewPaymentLabel for empty PaymentLabel initial value', () => {
        const formGroup = service.createPaymentLabelFormGroup();

        const paymentLabel = service.getPaymentLabel(formGroup) as any;

        expect(paymentLabel).toMatchObject({});
      });

      it('should return IPaymentLabel', () => {
        const formGroup = service.createPaymentLabelFormGroup(sampleWithRequiredData);

        const paymentLabel = service.getPaymentLabel(formGroup) as any;

        expect(paymentLabel).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPaymentLabel should not enable id FormControl', () => {
        const formGroup = service.createPaymentLabelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPaymentLabel should disable id FormControl', () => {
        const formGroup = service.createPaymentLabelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
