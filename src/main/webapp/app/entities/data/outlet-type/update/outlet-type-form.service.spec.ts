import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../outlet-type.test-samples';

import { OutletTypeFormService } from './outlet-type-form.service';

describe('OutletType Form Service', () => {
  let service: OutletTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutletTypeFormService);
  });

  describe('Service methods', () => {
    describe('createOutletTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOutletTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            outletTypeCode: expect.any(Object),
            outletType: expect.any(Object),
            outletTypeDetails: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IOutletType should create a new form with FormGroup', () => {
        const formGroup = service.createOutletTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            outletTypeCode: expect.any(Object),
            outletType: expect.any(Object),
            outletTypeDetails: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getOutletType', () => {
      it('should return NewOutletType for default OutletType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createOutletTypeFormGroup(sampleWithNewData);

        const outletType = service.getOutletType(formGroup) as any;

        expect(outletType).toMatchObject(sampleWithNewData);
      });

      it('should return NewOutletType for empty OutletType initial value', () => {
        const formGroup = service.createOutletTypeFormGroup();

        const outletType = service.getOutletType(formGroup) as any;

        expect(outletType).toMatchObject({});
      });

      it('should return IOutletType', () => {
        const formGroup = service.createOutletTypeFormGroup(sampleWithRequiredData);

        const outletType = service.getOutletType(formGroup) as any;

        expect(outletType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOutletType should not enable id FormControl', () => {
        const formGroup = service.createOutletTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOutletType should disable id FormControl', () => {
        const formGroup = service.createOutletTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
