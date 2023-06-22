import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../signed-payment.test-samples';

import { SignedPaymentFormService } from './signed-payment-form.service';

describe('SignedPayment Form Service', () => {
  let service: SignedPaymentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignedPaymentFormService);
  });

  describe('Service methods', () => {
    describe('createSignedPaymentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSignedPaymentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            transactionNumber: expect.any(Object),
            transactionDate: expect.any(Object),
            transactionCurrency: expect.any(Object),
            transactionAmount: expect.any(Object),
            dealerName: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            paymentCategory: expect.any(Object),
            placeholders: expect.any(Object),
            signedPaymentGroup: expect.any(Object),
          })
        );
      });

      it('passing ISignedPayment should create a new form with FormGroup', () => {
        const formGroup = service.createSignedPaymentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            transactionNumber: expect.any(Object),
            transactionDate: expect.any(Object),
            transactionCurrency: expect.any(Object),
            transactionAmount: expect.any(Object),
            dealerName: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            paymentCategory: expect.any(Object),
            placeholders: expect.any(Object),
            signedPaymentGroup: expect.any(Object),
          })
        );
      });
    });

    describe('getSignedPayment', () => {
      it('should return NewSignedPayment for default SignedPayment initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSignedPaymentFormGroup(sampleWithNewData);

        const signedPayment = service.getSignedPayment(formGroup) as any;

        expect(signedPayment).toMatchObject(sampleWithNewData);
      });

      it('should return NewSignedPayment for empty SignedPayment initial value', () => {
        const formGroup = service.createSignedPaymentFormGroup();

        const signedPayment = service.getSignedPayment(formGroup) as any;

        expect(signedPayment).toMatchObject({});
      });

      it('should return ISignedPayment', () => {
        const formGroup = service.createSignedPaymentFormGroup(sampleWithRequiredData);

        const signedPayment = service.getSignedPayment(formGroup) as any;

        expect(signedPayment).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISignedPayment should not enable id FormControl', () => {
        const formGroup = service.createSignedPaymentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSignedPayment should disable id FormControl', () => {
        const formGroup = service.createSignedPaymentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
