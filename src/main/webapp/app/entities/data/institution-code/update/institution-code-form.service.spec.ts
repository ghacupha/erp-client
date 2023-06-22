import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../institution-code.test-samples';

import { InstitutionCodeFormService } from './institution-code-form.service';

describe('InstitutionCode Form Service', () => {
  let service: InstitutionCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionCodeFormService);
  });

  describe('Service methods', () => {
    describe('createInstitutionCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInstitutionCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            institutionCode: expect.any(Object),
            institutionName: expect.any(Object),
            shortName: expect.any(Object),
            category: expect.any(Object),
            institutionCategory: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IInstitutionCode should create a new form with FormGroup', () => {
        const formGroup = service.createInstitutionCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            institutionCode: expect.any(Object),
            institutionName: expect.any(Object),
            shortName: expect.any(Object),
            category: expect.any(Object),
            institutionCategory: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getInstitutionCode', () => {
      it('should return NewInstitutionCode for default InstitutionCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInstitutionCodeFormGroup(sampleWithNewData);

        const institutionCode = service.getInstitutionCode(formGroup) as any;

        expect(institutionCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewInstitutionCode for empty InstitutionCode initial value', () => {
        const formGroup = service.createInstitutionCodeFormGroup();

        const institutionCode = service.getInstitutionCode(formGroup) as any;

        expect(institutionCode).toMatchObject({});
      });

      it('should return IInstitutionCode', () => {
        const formGroup = service.createInstitutionCodeFormGroup(sampleWithRequiredData);

        const institutionCode = service.getInstitutionCode(formGroup) as any;

        expect(institutionCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInstitutionCode should not enable id FormControl', () => {
        const formGroup = service.createInstitutionCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInstitutionCode should disable id FormControl', () => {
        const formGroup = service.createInstitutionCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
