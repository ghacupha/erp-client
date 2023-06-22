import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../application-user.test-samples';

import { ApplicationUserFormService } from './application-user-form.service';

describe('ApplicationUser Form Service', () => {
  let service: ApplicationUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationUserFormService);
  });

  describe('Service methods', () => {
    describe('createApplicationUserFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createApplicationUserFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            designation: expect.any(Object),
            applicationIdentity: expect.any(Object),
            organization: expect.any(Object),
            department: expect.any(Object),
            securityClearance: expect.any(Object),
            systemIdentity: expect.any(Object),
            userProperties: expect.any(Object),
            dealerIdentity: expect.any(Object),
          })
        );
      });

      it('passing IApplicationUser should create a new form with FormGroup', () => {
        const formGroup = service.createApplicationUserFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            designation: expect.any(Object),
            applicationIdentity: expect.any(Object),
            organization: expect.any(Object),
            department: expect.any(Object),
            securityClearance: expect.any(Object),
            systemIdentity: expect.any(Object),
            userProperties: expect.any(Object),
            dealerIdentity: expect.any(Object),
          })
        );
      });
    });

    describe('getApplicationUser', () => {
      it('should return NewApplicationUser for default ApplicationUser initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createApplicationUserFormGroup(sampleWithNewData);

        const applicationUser = service.getApplicationUser(formGroup) as any;

        expect(applicationUser).toMatchObject(sampleWithNewData);
      });

      it('should return NewApplicationUser for empty ApplicationUser initial value', () => {
        const formGroup = service.createApplicationUserFormGroup();

        const applicationUser = service.getApplicationUser(formGroup) as any;

        expect(applicationUser).toMatchObject({});
      });

      it('should return IApplicationUser', () => {
        const formGroup = service.createApplicationUserFormGroup(sampleWithRequiredData);

        const applicationUser = service.getApplicationUser(formGroup) as any;

        expect(applicationUser).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IApplicationUser should not enable id FormControl', () => {
        const formGroup = service.createApplicationUserFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewApplicationUser should disable id FormControl', () => {
        const formGroup = service.createApplicationUserFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
