import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../security-clearance.test-samples';

import { SecurityClearanceFormService } from './security-clearance-form.service';

describe('SecurityClearance Form Service', () => {
  let service: SecurityClearanceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityClearanceFormService);
  });

  describe('Service methods', () => {
    describe('createSecurityClearanceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSecurityClearanceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            clearanceLevel: expect.any(Object),
            grantedClearances: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ISecurityClearance should create a new form with FormGroup', () => {
        const formGroup = service.createSecurityClearanceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            clearanceLevel: expect.any(Object),
            grantedClearances: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getSecurityClearance', () => {
      it('should return NewSecurityClearance for default SecurityClearance initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSecurityClearanceFormGroup(sampleWithNewData);

        const securityClearance = service.getSecurityClearance(formGroup) as any;

        expect(securityClearance).toMatchObject(sampleWithNewData);
      });

      it('should return NewSecurityClearance for empty SecurityClearance initial value', () => {
        const formGroup = service.createSecurityClearanceFormGroup();

        const securityClearance = service.getSecurityClearance(formGroup) as any;

        expect(securityClearance).toMatchObject({});
      });

      it('should return ISecurityClearance', () => {
        const formGroup = service.createSecurityClearanceFormGroup(sampleWithRequiredData);

        const securityClearance = service.getSecurityClearance(formGroup) as any;

        expect(securityClearance).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISecurityClearance should not enable id FormControl', () => {
        const formGroup = service.createSecurityClearanceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSecurityClearance should disable id FormControl', () => {
        const formGroup = service.createSecurityClearanceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
