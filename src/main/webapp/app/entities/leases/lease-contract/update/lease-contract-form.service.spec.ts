import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../lease-contract.test-samples';

import { LeaseContractFormService } from './lease-contract-form.service';

describe('LeaseContract Form Service', () => {
  let service: LeaseContractFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaseContractFormService);
  });

  describe('Service methods', () => {
    describe('createLeaseContractFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLeaseContractFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bookingId: expect.any(Object),
            leaseTitle: expect.any(Object),
            identifier: expect.any(Object),
            description: expect.any(Object),
            commencementDate: expect.any(Object),
            terminalDate: expect.any(Object),
            placeholders: expect.any(Object),
            systemMappings: expect.any(Object),
            businessDocuments: expect.any(Object),
            contractMetadata: expect.any(Object),
          })
        );
      });

      it('passing ILeaseContract should create a new form with FormGroup', () => {
        const formGroup = service.createLeaseContractFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bookingId: expect.any(Object),
            leaseTitle: expect.any(Object),
            identifier: expect.any(Object),
            description: expect.any(Object),
            commencementDate: expect.any(Object),
            terminalDate: expect.any(Object),
            placeholders: expect.any(Object),
            systemMappings: expect.any(Object),
            businessDocuments: expect.any(Object),
            contractMetadata: expect.any(Object),
          })
        );
      });
    });

    describe('getLeaseContract', () => {
      it('should return NewLeaseContract for default LeaseContract initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLeaseContractFormGroup(sampleWithNewData);

        const leaseContract = service.getLeaseContract(formGroup) as any;

        expect(leaseContract).toMatchObject(sampleWithNewData);
      });

      it('should return NewLeaseContract for empty LeaseContract initial value', () => {
        const formGroup = service.createLeaseContractFormGroup();

        const leaseContract = service.getLeaseContract(formGroup) as any;

        expect(leaseContract).toMatchObject({});
      });

      it('should return ILeaseContract', () => {
        const formGroup = service.createLeaseContractFormGroup(sampleWithRequiredData);

        const leaseContract = service.getLeaseContract(formGroup) as any;

        expect(leaseContract).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILeaseContract should not enable id FormControl', () => {
        const formGroup = service.createLeaseContractFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLeaseContract should disable id FormControl', () => {
        const formGroup = service.createLeaseContractFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
