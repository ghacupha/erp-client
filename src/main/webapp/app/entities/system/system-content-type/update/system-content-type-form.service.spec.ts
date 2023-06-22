import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../system-content-type.test-samples';

import { SystemContentTypeFormService } from './system-content-type-form.service';

describe('SystemContentType Form Service', () => {
  let service: SystemContentTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemContentTypeFormService);
  });

  describe('Service methods', () => {
    describe('createSystemContentTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSystemContentTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contentTypeName: expect.any(Object),
            contentTypeHeader: expect.any(Object),
            comments: expect.any(Object),
            availability: expect.any(Object),
            placeholders: expect.any(Object),
            sysMaps: expect.any(Object),
          })
        );
      });

      it('passing ISystemContentType should create a new form with FormGroup', () => {
        const formGroup = service.createSystemContentTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contentTypeName: expect.any(Object),
            contentTypeHeader: expect.any(Object),
            comments: expect.any(Object),
            availability: expect.any(Object),
            placeholders: expect.any(Object),
            sysMaps: expect.any(Object),
          })
        );
      });
    });

    describe('getSystemContentType', () => {
      it('should return NewSystemContentType for default SystemContentType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSystemContentTypeFormGroup(sampleWithNewData);

        const systemContentType = service.getSystemContentType(formGroup) as any;

        expect(systemContentType).toMatchObject(sampleWithNewData);
      });

      it('should return NewSystemContentType for empty SystemContentType initial value', () => {
        const formGroup = service.createSystemContentTypeFormGroup();

        const systemContentType = service.getSystemContentType(formGroup) as any;

        expect(systemContentType).toMatchObject({});
      });

      it('should return ISystemContentType', () => {
        const formGroup = service.createSystemContentTypeFormGroup(sampleWithRequiredData);

        const systemContentType = service.getSystemContentType(formGroup) as any;

        expect(systemContentType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISystemContentType should not enable id FormControl', () => {
        const formGroup = service.createSystemContentTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSystemContentType should disable id FormControl', () => {
        const formGroup = service.createSystemContentTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
