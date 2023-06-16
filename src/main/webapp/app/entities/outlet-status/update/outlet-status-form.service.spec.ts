import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../outlet-status.test-samples';

import { OutletStatusFormService } from './outlet-status-form.service';

describe('OutletStatus Form Service', () => {
  let service: OutletStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutletStatusFormService);
  });

  describe('Service methods', () => {
    describe('createOutletStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOutletStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            branchStatusTypeCode: expect.any(Object),
            branchStatusType: expect.any(Object),
            branchStatusTypeDescription: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IOutletStatus should create a new form with FormGroup', () => {
        const formGroup = service.createOutletStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            branchStatusTypeCode: expect.any(Object),
            branchStatusType: expect.any(Object),
            branchStatusTypeDescription: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getOutletStatus', () => {
      it('should return NewOutletStatus for default OutletStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createOutletStatusFormGroup(sampleWithNewData);

        const outletStatus = service.getOutletStatus(formGroup) as any;

        expect(outletStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewOutletStatus for empty OutletStatus initial value', () => {
        const formGroup = service.createOutletStatusFormGroup();

        const outletStatus = service.getOutletStatus(formGroup) as any;

        expect(outletStatus).toMatchObject({});
      });

      it('should return IOutletStatus', () => {
        const formGroup = service.createOutletStatusFormGroup(sampleWithRequiredData);

        const outletStatus = service.getOutletStatus(formGroup) as any;

        expect(outletStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOutletStatus should not enable id FormControl', () => {
        const formGroup = service.createOutletStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOutletStatus should disable id FormControl', () => {
        const formGroup = service.createOutletStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
