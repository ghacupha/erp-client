import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../payment-requisition.test-samples';

import { PaymentRequisitionFormService } from './payment-requisition-form.service';

describe('PaymentRequisition Form Service', () => {
  let service: PaymentRequisitionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentRequisitionFormService);
  });

  describe('Service methods', () => {
    describe('createPaymentRequisitionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPaymentRequisitionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            receptionDate: expect.any(Object),
            dealerName: expect.any(Object),
            briefDescription: expect.any(Object),
            requisitionNumber: expect.any(Object),
            invoicedAmount: expect.any(Object),
            disbursementCost: expect.any(Object),
            taxableAmount: expect.any(Object),
            requisitionProcessed: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IPaymentRequisition should create a new form with FormGroup', () => {
        const formGroup = service.createPaymentRequisitionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            receptionDate: expect.any(Object),
            dealerName: expect.any(Object),
            briefDescription: expect.any(Object),
            requisitionNumber: expect.any(Object),
            invoicedAmount: expect.any(Object),
            disbursementCost: expect.any(Object),
            taxableAmount: expect.any(Object),
            requisitionProcessed: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getPaymentRequisition', () => {
      it('should return NewPaymentRequisition for default PaymentRequisition initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPaymentRequisitionFormGroup(sampleWithNewData);

        const paymentRequisition = service.getPaymentRequisition(formGroup) as any;

        expect(paymentRequisition).toMatchObject(sampleWithNewData);
      });

      it('should return NewPaymentRequisition for empty PaymentRequisition initial value', () => {
        const formGroup = service.createPaymentRequisitionFormGroup();

        const paymentRequisition = service.getPaymentRequisition(formGroup) as any;

        expect(paymentRequisition).toMatchObject({});
      });

      it('should return IPaymentRequisition', () => {
        const formGroup = service.createPaymentRequisitionFormGroup(sampleWithRequiredData);

        const paymentRequisition = service.getPaymentRequisition(formGroup) as any;

        expect(paymentRequisition).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPaymentRequisition should not enable id FormControl', () => {
        const formGroup = service.createPaymentRequisitionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPaymentRequisition should disable id FormControl', () => {
        const formGroup = service.createPaymentRequisitionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
