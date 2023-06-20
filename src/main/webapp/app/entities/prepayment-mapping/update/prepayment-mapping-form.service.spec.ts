import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../prepayment-mapping.test-samples';

import { PrepaymentMappingFormService } from './prepayment-mapping-form.service';

describe('PrepaymentMapping Form Service', () => {
  let service: PrepaymentMappingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepaymentMappingFormService);
  });

  describe('Service methods', () => {
    describe('createPrepaymentMappingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPrepaymentMappingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            parameterKey: expect.any(Object),
            parameterGuid: expect.any(Object),
            parameter: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IPrepaymentMapping should create a new form with FormGroup', () => {
        const formGroup = service.createPrepaymentMappingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            parameterKey: expect.any(Object),
            parameterGuid: expect.any(Object),
            parameter: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getPrepaymentMapping', () => {
      it('should return NewPrepaymentMapping for default PrepaymentMapping initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPrepaymentMappingFormGroup(sampleWithNewData);

        const prepaymentMapping = service.getPrepaymentMapping(formGroup) as any;

        expect(prepaymentMapping).toMatchObject(sampleWithNewData);
      });

      it('should return NewPrepaymentMapping for empty PrepaymentMapping initial value', () => {
        const formGroup = service.createPrepaymentMappingFormGroup();

        const prepaymentMapping = service.getPrepaymentMapping(formGroup) as any;

        expect(prepaymentMapping).toMatchObject({});
      });

      it('should return IPrepaymentMapping', () => {
        const formGroup = service.createPrepaymentMappingFormGroup(sampleWithRequiredData);

        const prepaymentMapping = service.getPrepaymentMapping(formGroup) as any;

        expect(prepaymentMapping).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPrepaymentMapping should not enable id FormControl', () => {
        const formGroup = service.createPrepaymentMappingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPrepaymentMapping should disable id FormControl', () => {
        const formGroup = service.createPrepaymentMappingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
