import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../iso-country-code.test-samples';

import { IsoCountryCodeFormService } from './iso-country-code-form.service';

describe('IsoCountryCode Form Service', () => {
  let service: IsoCountryCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsoCountryCodeFormService);
  });

  describe('Service methods', () => {
    describe('createIsoCountryCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createIsoCountryCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            countryCode: expect.any(Object),
            countryDescription: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IIsoCountryCode should create a new form with FormGroup', () => {
        const formGroup = service.createIsoCountryCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            countryCode: expect.any(Object),
            countryDescription: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getIsoCountryCode', () => {
      it('should return NewIsoCountryCode for default IsoCountryCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createIsoCountryCodeFormGroup(sampleWithNewData);

        const isoCountryCode = service.getIsoCountryCode(formGroup) as any;

        expect(isoCountryCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewIsoCountryCode for empty IsoCountryCode initial value', () => {
        const formGroup = service.createIsoCountryCodeFormGroup();

        const isoCountryCode = service.getIsoCountryCode(formGroup) as any;

        expect(isoCountryCode).toMatchObject({});
      });

      it('should return IIsoCountryCode', () => {
        const formGroup = service.createIsoCountryCodeFormGroup(sampleWithRequiredData);

        const isoCountryCode = service.getIsoCountryCode(formGroup) as any;

        expect(isoCountryCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IIsoCountryCode should not enable id FormControl', () => {
        const formGroup = service.createIsoCountryCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewIsoCountryCode should disable id FormControl', () => {
        const formGroup = service.createIsoCountryCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
