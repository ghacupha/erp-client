import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tax-reference.test-samples';

import { TaxReferenceFormService } from './tax-reference-form.service';

describe('TaxReference Form Service', () => {
  let service: TaxReferenceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxReferenceFormService);
  });

  describe('Service methods', () => {
    describe('createTaxReferenceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaxReferenceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            taxName: expect.any(Object),
            taxDescription: expect.any(Object),
            taxPercentage: expect.any(Object),
            taxReferenceType: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ITaxReference should create a new form with FormGroup', () => {
        const formGroup = service.createTaxReferenceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            taxName: expect.any(Object),
            taxDescription: expect.any(Object),
            taxPercentage: expect.any(Object),
            taxReferenceType: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getTaxReference', () => {
      it('should return NewTaxReference for default TaxReference initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTaxReferenceFormGroup(sampleWithNewData);

        const taxReference = service.getTaxReference(formGroup) as any;

        expect(taxReference).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaxReference for empty TaxReference initial value', () => {
        const formGroup = service.createTaxReferenceFormGroup();

        const taxReference = service.getTaxReference(formGroup) as any;

        expect(taxReference).toMatchObject({});
      });

      it('should return ITaxReference', () => {
        const formGroup = service.createTaxReferenceFormGroup(sampleWithRequiredData);

        const taxReference = service.getTaxReference(formGroup) as any;

        expect(taxReference).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaxReference should not enable id FormControl', () => {
        const formGroup = service.createTaxReferenceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaxReference should disable id FormControl', () => {
        const formGroup = service.createTaxReferenceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
