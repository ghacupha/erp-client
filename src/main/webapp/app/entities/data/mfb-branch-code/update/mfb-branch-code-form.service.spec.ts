import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../mfb-branch-code.test-samples';

import { MfbBranchCodeFormService } from './mfb-branch-code-form.service';

describe('MfbBranchCode Form Service', () => {
  let service: MfbBranchCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfbBranchCodeFormService);
  });

  describe('Service methods', () => {
    describe('createMfbBranchCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMfbBranchCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bankCode: expect.any(Object),
            bankName: expect.any(Object),
            branchCode: expect.any(Object),
            branchName: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IMfbBranchCode should create a new form with FormGroup', () => {
        const formGroup = service.createMfbBranchCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bankCode: expect.any(Object),
            bankName: expect.any(Object),
            branchCode: expect.any(Object),
            branchName: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getMfbBranchCode', () => {
      it('should return NewMfbBranchCode for default MfbBranchCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMfbBranchCodeFormGroup(sampleWithNewData);

        const mfbBranchCode = service.getMfbBranchCode(formGroup) as any;

        expect(mfbBranchCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewMfbBranchCode for empty MfbBranchCode initial value', () => {
        const formGroup = service.createMfbBranchCodeFormGroup();

        const mfbBranchCode = service.getMfbBranchCode(formGroup) as any;

        expect(mfbBranchCode).toMatchObject({});
      });

      it('should return IMfbBranchCode', () => {
        const formGroup = service.createMfbBranchCodeFormGroup(sampleWithRequiredData);

        const mfbBranchCode = service.getMfbBranchCode(formGroup) as any;

        expect(mfbBranchCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMfbBranchCode should not enable id FormControl', () => {
        const formGroup = service.createMfbBranchCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMfbBranchCode should disable id FormControl', () => {
        const formGroup = service.createMfbBranchCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
