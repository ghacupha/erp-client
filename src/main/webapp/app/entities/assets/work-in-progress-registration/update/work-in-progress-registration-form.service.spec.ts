import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../work-in-progress-registration.test-samples';

import { WorkInProgressRegistrationFormService } from './work-in-progress-registration-form.service';

describe('WorkInProgressRegistration Form Service', () => {
  let service: WorkInProgressRegistrationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkInProgressRegistrationFormService);
  });

  describe('Service methods', () => {
    describe('createWorkInProgressRegistrationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWorkInProgressRegistrationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sequenceNumber: expect.any(Object),
            particulars: expect.any(Object),
            instalmentAmount: expect.any(Object),
            comments: expect.any(Object),
            placeholders: expect.any(Object),
            paymentInvoices: expect.any(Object),
            serviceOutlets: expect.any(Object),
            settlements: expect.any(Object),
            purchaseOrders: expect.any(Object),
            deliveryNotes: expect.any(Object),
            jobSheets: expect.any(Object),
            dealer: expect.any(Object),
            workInProgressGroup: expect.any(Object),
            settlementCurrency: expect.any(Object),
            workProjectRegister: expect.any(Object),
            businessDocuments: expect.any(Object),
            assetAccessories: expect.any(Object),
            assetWarranties: expect.any(Object),
          })
        );
      });

      it('passing IWorkInProgressRegistration should create a new form with FormGroup', () => {
        const formGroup = service.createWorkInProgressRegistrationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sequenceNumber: expect.any(Object),
            particulars: expect.any(Object),
            instalmentAmount: expect.any(Object),
            comments: expect.any(Object),
            placeholders: expect.any(Object),
            paymentInvoices: expect.any(Object),
            serviceOutlets: expect.any(Object),
            settlements: expect.any(Object),
            purchaseOrders: expect.any(Object),
            deliveryNotes: expect.any(Object),
            jobSheets: expect.any(Object),
            dealer: expect.any(Object),
            workInProgressGroup: expect.any(Object),
            settlementCurrency: expect.any(Object),
            workProjectRegister: expect.any(Object),
            businessDocuments: expect.any(Object),
            assetAccessories: expect.any(Object),
            assetWarranties: expect.any(Object),
          })
        );
      });
    });

    describe('getWorkInProgressRegistration', () => {
      it('should return NewWorkInProgressRegistration for default WorkInProgressRegistration initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWorkInProgressRegistrationFormGroup(sampleWithNewData);

        const workInProgressRegistration = service.getWorkInProgressRegistration(formGroup) as any;

        expect(workInProgressRegistration).toMatchObject(sampleWithNewData);
      });

      it('should return NewWorkInProgressRegistration for empty WorkInProgressRegistration initial value', () => {
        const formGroup = service.createWorkInProgressRegistrationFormGroup();

        const workInProgressRegistration = service.getWorkInProgressRegistration(formGroup) as any;

        expect(workInProgressRegistration).toMatchObject({});
      });

      it('should return IWorkInProgressRegistration', () => {
        const formGroup = service.createWorkInProgressRegistrationFormGroup(sampleWithRequiredData);

        const workInProgressRegistration = service.getWorkInProgressRegistration(formGroup) as any;

        expect(workInProgressRegistration).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWorkInProgressRegistration should not enable id FormControl', () => {
        const formGroup = service.createWorkInProgressRegistrationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWorkInProgressRegistration should disable id FormControl', () => {
        const formGroup = service.createWorkInProgressRegistrationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
