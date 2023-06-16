import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../work-project-register.test-samples';

import { WorkProjectRegisterFormService } from './work-project-register-form.service';

describe('WorkProjectRegister Form Service', () => {
  let service: WorkProjectRegisterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkProjectRegisterFormService);
  });

  describe('Service methods', () => {
    describe('createWorkProjectRegisterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catalogueNumber: expect.any(Object),
            description: expect.any(Object),
            details: expect.any(Object),
            totalProjectCost: expect.any(Object),
            additionalNotes: expect.any(Object),
            dealers: expect.any(Object),
            settlementCurrency: expect.any(Object),
            placeholders: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });

      it('passing IWorkProjectRegister should create a new form with FormGroup', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catalogueNumber: expect.any(Object),
            description: expect.any(Object),
            details: expect.any(Object),
            totalProjectCost: expect.any(Object),
            additionalNotes: expect.any(Object),
            dealers: expect.any(Object),
            settlementCurrency: expect.any(Object),
            placeholders: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });
    });

    describe('getWorkProjectRegister', () => {
      it('should return NewWorkProjectRegister for default WorkProjectRegister initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWorkProjectRegisterFormGroup(sampleWithNewData);

        const workProjectRegister = service.getWorkProjectRegister(formGroup) as any;

        expect(workProjectRegister).toMatchObject(sampleWithNewData);
      });

      it('should return NewWorkProjectRegister for empty WorkProjectRegister initial value', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup();

        const workProjectRegister = service.getWorkProjectRegister(formGroup) as any;

        expect(workProjectRegister).toMatchObject({});
      });

      it('should return IWorkProjectRegister', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup(sampleWithRequiredData);

        const workProjectRegister = service.getWorkProjectRegister(formGroup) as any;

        expect(workProjectRegister).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWorkProjectRegister should not enable id FormControl', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWorkProjectRegister should disable id FormControl', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
