import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../lease-liability-schedule-item.test-samples';

import { LeaseLiabilityScheduleItemFormService } from './lease-liability-schedule-item-form.service';

describe('LeaseLiabilityScheduleItem Form Service', () => {
  let service: LeaseLiabilityScheduleItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaseLiabilityScheduleItemFormService);
  });

  describe('Service methods', () => {
    describe('createLeaseLiabilityScheduleItemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLeaseLiabilityScheduleItemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sequenceNumber: expect.any(Object),
            periodIncluded: expect.any(Object),
            periodStartDate: expect.any(Object),
            periodEndDate: expect.any(Object),
            openingBalance: expect.any(Object),
            cashPayment: expect.any(Object),
            principalPayment: expect.any(Object),
            interestPayment: expect.any(Object),
            outstandingBalance: expect.any(Object),
            interestPayableOpening: expect.any(Object),
            interestExpenseAccrued: expect.any(Object),
            interestPayableBalance: expect.any(Object),
            placeholders: expect.any(Object),
            leaseContract: expect.any(Object),
            leaseModelMetadata: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
          })
        );
      });

      it('passing ILeaseLiabilityScheduleItem should create a new form with FormGroup', () => {
        const formGroup = service.createLeaseLiabilityScheduleItemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sequenceNumber: expect.any(Object),
            periodIncluded: expect.any(Object),
            periodStartDate: expect.any(Object),
            periodEndDate: expect.any(Object),
            openingBalance: expect.any(Object),
            cashPayment: expect.any(Object),
            principalPayment: expect.any(Object),
            interestPayment: expect.any(Object),
            outstandingBalance: expect.any(Object),
            interestPayableOpening: expect.any(Object),
            interestExpenseAccrued: expect.any(Object),
            interestPayableBalance: expect.any(Object),
            placeholders: expect.any(Object),
            leaseContract: expect.any(Object),
            leaseModelMetadata: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
          })
        );
      });
    });

    describe('getLeaseLiabilityScheduleItem', () => {
      it('should return NewLeaseLiabilityScheduleItem for default LeaseLiabilityScheduleItem initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLeaseLiabilityScheduleItemFormGroup(sampleWithNewData);

        const leaseLiabilityScheduleItem = service.getLeaseLiabilityScheduleItem(formGroup) as any;

        expect(leaseLiabilityScheduleItem).toMatchObject(sampleWithNewData);
      });

      it('should return NewLeaseLiabilityScheduleItem for empty LeaseLiabilityScheduleItem initial value', () => {
        const formGroup = service.createLeaseLiabilityScheduleItemFormGroup();

        const leaseLiabilityScheduleItem = service.getLeaseLiabilityScheduleItem(formGroup) as any;

        expect(leaseLiabilityScheduleItem).toMatchObject({});
      });

      it('should return ILeaseLiabilityScheduleItem', () => {
        const formGroup = service.createLeaseLiabilityScheduleItemFormGroup(sampleWithRequiredData);

        const leaseLiabilityScheduleItem = service.getLeaseLiabilityScheduleItem(formGroup) as any;

        expect(leaseLiabilityScheduleItem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILeaseLiabilityScheduleItem should not enable id FormControl', () => {
        const formGroup = service.createLeaseLiabilityScheduleItemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLeaseLiabilityScheduleItem should disable id FormControl', () => {
        const formGroup = service.createLeaseLiabilityScheduleItemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
