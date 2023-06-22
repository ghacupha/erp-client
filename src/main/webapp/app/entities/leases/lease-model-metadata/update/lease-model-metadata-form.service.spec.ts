import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../lease-model-metadata.test-samples';

import { LeaseModelMetadataFormService } from './lease-model-metadata-form.service';

describe('LeaseModelMetadata Form Service', () => {
  let service: LeaseModelMetadataFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaseModelMetadataFormService);
  });

  describe('Service methods', () => {
    describe('createLeaseModelMetadataFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLeaseModelMetadataFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            modelTitle: expect.any(Object),
            modelVersion: expect.any(Object),
            description: expect.any(Object),
            modelNotes: expect.any(Object),
            annualDiscountingRate: expect.any(Object),
            commencementDate: expect.any(Object),
            terminalDate: expect.any(Object),
            totalReportingPeriods: expect.any(Object),
            reportingPeriodsPerYear: expect.any(Object),
            settlementPeriodsPerYear: expect.any(Object),
            initialLiabilityAmount: expect.any(Object),
            initialROUAmount: expect.any(Object),
            totalDepreciationPeriods: expect.any(Object),
            placeholders: expect.any(Object),
            leaseMappings: expect.any(Object),
            leaseContract: expect.any(Object),
            predecessor: expect.any(Object),
            liabilityCurrency: expect.any(Object),
            rouAssetCurrency: expect.any(Object),
            modelAttachments: expect.any(Object),
            securityClearance: expect.any(Object),
            leaseLiabilityAccount: expect.any(Object),
            interestPayableAccount: expect.any(Object),
            interestExpenseAccount: expect.any(Object),
            rouAssetAccount: expect.any(Object),
            rouDepreciationAccount: expect.any(Object),
            accruedDepreciationAccount: expect.any(Object),
          })
        );
      });

      it('passing ILeaseModelMetadata should create a new form with FormGroup', () => {
        const formGroup = service.createLeaseModelMetadataFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            modelTitle: expect.any(Object),
            modelVersion: expect.any(Object),
            description: expect.any(Object),
            modelNotes: expect.any(Object),
            annualDiscountingRate: expect.any(Object),
            commencementDate: expect.any(Object),
            terminalDate: expect.any(Object),
            totalReportingPeriods: expect.any(Object),
            reportingPeriodsPerYear: expect.any(Object),
            settlementPeriodsPerYear: expect.any(Object),
            initialLiabilityAmount: expect.any(Object),
            initialROUAmount: expect.any(Object),
            totalDepreciationPeriods: expect.any(Object),
            placeholders: expect.any(Object),
            leaseMappings: expect.any(Object),
            leaseContract: expect.any(Object),
            predecessor: expect.any(Object),
            liabilityCurrency: expect.any(Object),
            rouAssetCurrency: expect.any(Object),
            modelAttachments: expect.any(Object),
            securityClearance: expect.any(Object),
            leaseLiabilityAccount: expect.any(Object),
            interestPayableAccount: expect.any(Object),
            interestExpenseAccount: expect.any(Object),
            rouAssetAccount: expect.any(Object),
            rouDepreciationAccount: expect.any(Object),
            accruedDepreciationAccount: expect.any(Object),
          })
        );
      });
    });

    describe('getLeaseModelMetadata', () => {
      it('should return NewLeaseModelMetadata for default LeaseModelMetadata initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLeaseModelMetadataFormGroup(sampleWithNewData);

        const leaseModelMetadata = service.getLeaseModelMetadata(formGroup) as any;

        expect(leaseModelMetadata).toMatchObject(sampleWithNewData);
      });

      it('should return NewLeaseModelMetadata for empty LeaseModelMetadata initial value', () => {
        const formGroup = service.createLeaseModelMetadataFormGroup();

        const leaseModelMetadata = service.getLeaseModelMetadata(formGroup) as any;

        expect(leaseModelMetadata).toMatchObject({});
      });

      it('should return ILeaseModelMetadata', () => {
        const formGroup = service.createLeaseModelMetadataFormGroup(sampleWithRequiredData);

        const leaseModelMetadata = service.getLeaseModelMetadata(formGroup) as any;

        expect(leaseModelMetadata).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILeaseModelMetadata should not enable id FormControl', () => {
        const formGroup = service.createLeaseModelMetadataFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLeaseModelMetadata should disable id FormControl', () => {
        const formGroup = service.createLeaseModelMetadataFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
