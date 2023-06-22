import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../job-sheet.test-samples';

import { JobSheetFormService } from './job-sheet-form.service';

describe('JobSheet Form Service', () => {
  let service: JobSheetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobSheetFormService);
  });

  describe('Service methods', () => {
    describe('createJobSheetFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createJobSheetFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            serialNumber: expect.any(Object),
            jobSheetDate: expect.any(Object),
            details: expect.any(Object),
            remarks: expect.any(Object),
            biller: expect.any(Object),
            signatories: expect.any(Object),
            contactPerson: expect.any(Object),
            businessStamps: expect.any(Object),
            placeholders: expect.any(Object),
            paymentLabels: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });

      it('passing IJobSheet should create a new form with FormGroup', () => {
        const formGroup = service.createJobSheetFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            serialNumber: expect.any(Object),
            jobSheetDate: expect.any(Object),
            details: expect.any(Object),
            remarks: expect.any(Object),
            biller: expect.any(Object),
            signatories: expect.any(Object),
            contactPerson: expect.any(Object),
            businessStamps: expect.any(Object),
            placeholders: expect.any(Object),
            paymentLabels: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });
    });

    describe('getJobSheet', () => {
      it('should return NewJobSheet for default JobSheet initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createJobSheetFormGroup(sampleWithNewData);

        const jobSheet = service.getJobSheet(formGroup) as any;

        expect(jobSheet).toMatchObject(sampleWithNewData);
      });

      it('should return NewJobSheet for empty JobSheet initial value', () => {
        const formGroup = service.createJobSheetFormGroup();

        const jobSheet = service.getJobSheet(formGroup) as any;

        expect(jobSheet).toMatchObject({});
      });

      it('should return IJobSheet', () => {
        const formGroup = service.createJobSheetFormGroup(sampleWithRequiredData);

        const jobSheet = service.getJobSheet(formGroup) as any;

        expect(jobSheet).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IJobSheet should not enable id FormControl', () => {
        const formGroup = service.createJobSheetFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewJobSheet should disable id FormControl', () => {
        const formGroup = service.createJobSheetFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
