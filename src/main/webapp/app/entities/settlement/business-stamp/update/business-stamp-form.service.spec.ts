import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../business-stamp.test-samples';

import { BusinessStampFormService } from './business-stamp-form.service';

describe('BusinessStamp Form Service', () => {
  let service: BusinessStampFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessStampFormService);
  });

  describe('Service methods', () => {
    describe('createBusinessStampFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBusinessStampFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stampDate: expect.any(Object),
            purpose: expect.any(Object),
            details: expect.any(Object),
            remarks: expect.any(Object),
            stampHolder: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IBusinessStamp should create a new form with FormGroup', () => {
        const formGroup = service.createBusinessStampFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stampDate: expect.any(Object),
            purpose: expect.any(Object),
            details: expect.any(Object),
            remarks: expect.any(Object),
            stampHolder: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getBusinessStamp', () => {
      it('should return NewBusinessStamp for default BusinessStamp initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBusinessStampFormGroup(sampleWithNewData);

        const businessStamp = service.getBusinessStamp(formGroup) as any;

        expect(businessStamp).toMatchObject(sampleWithNewData);
      });

      it('should return NewBusinessStamp for empty BusinessStamp initial value', () => {
        const formGroup = service.createBusinessStampFormGroup();

        const businessStamp = service.getBusinessStamp(formGroup) as any;

        expect(businessStamp).toMatchObject({});
      });

      it('should return IBusinessStamp', () => {
        const formGroup = service.createBusinessStampFormGroup(sampleWithRequiredData);

        const businessStamp = service.getBusinessStamp(formGroup) as any;

        expect(businessStamp).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBusinessStamp should not enable id FormControl', () => {
        const formGroup = service.createBusinessStampFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBusinessStamp should disable id FormControl', () => {
        const formGroup = service.createBusinessStampFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
