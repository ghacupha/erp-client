import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../county-code.test-samples';

import { CountyCodeFormService } from './county-code-form.service';

describe('CountyCode Form Service', () => {
  let service: CountyCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountyCodeFormService);
  });

  describe('Service methods', () => {
    describe('createCountyCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCountyCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            countyCode: expect.any(Object),
            countyName: expect.any(Object),
            subCountyCode: expect.any(Object),
            subCountyName: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ICountyCode should create a new form with FormGroup', () => {
        const formGroup = service.createCountyCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            countyCode: expect.any(Object),
            countyName: expect.any(Object),
            subCountyCode: expect.any(Object),
            subCountyName: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getCountyCode', () => {
      it('should return NewCountyCode for default CountyCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCountyCodeFormGroup(sampleWithNewData);

        const countyCode = service.getCountyCode(formGroup) as any;

        expect(countyCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewCountyCode for empty CountyCode initial value', () => {
        const formGroup = service.createCountyCodeFormGroup();

        const countyCode = service.getCountyCode(formGroup) as any;

        expect(countyCode).toMatchObject({});
      });

      it('should return ICountyCode', () => {
        const formGroup = service.createCountyCodeFormGroup(sampleWithRequiredData);

        const countyCode = service.getCountyCode(formGroup) as any;

        expect(countyCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICountyCode should not enable id FormControl', () => {
        const formGroup = service.createCountyCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCountyCode should disable id FormControl', () => {
        const formGroup = service.createCountyCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
