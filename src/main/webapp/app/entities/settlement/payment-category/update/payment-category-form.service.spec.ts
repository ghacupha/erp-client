import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../payment-category.test-samples';

import { PaymentCategoryFormService } from './payment-category-form.service';

describe('PaymentCategory Form Service', () => {
  let service: PaymentCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createPaymentCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPaymentCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            categoryName: expect.any(Object),
            categoryDescription: expect.any(Object),
            categoryType: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IPaymentCategory should create a new form with FormGroup', () => {
        const formGroup = service.createPaymentCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            categoryName: expect.any(Object),
            categoryDescription: expect.any(Object),
            categoryType: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getPaymentCategory', () => {
      it('should return NewPaymentCategory for default PaymentCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPaymentCategoryFormGroup(sampleWithNewData);

        const paymentCategory = service.getPaymentCategory(formGroup) as any;

        expect(paymentCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewPaymentCategory for empty PaymentCategory initial value', () => {
        const formGroup = service.createPaymentCategoryFormGroup();

        const paymentCategory = service.getPaymentCategory(formGroup) as any;

        expect(paymentCategory).toMatchObject({});
      });

      it('should return IPaymentCategory', () => {
        const formGroup = service.createPaymentCategoryFormGroup(sampleWithRequiredData);

        const paymentCategory = service.getPaymentCategory(formGroup) as any;

        expect(paymentCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPaymentCategory should not enable id FormControl', () => {
        const formGroup = service.createPaymentCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPaymentCategory should disable id FormControl', () => {
        const formGroup = service.createPaymentCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
