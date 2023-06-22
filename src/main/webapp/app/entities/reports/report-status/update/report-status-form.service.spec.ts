import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../report-status.test-samples';

import { ReportStatusFormService } from './report-status-form.service';

describe('ReportStatus Form Service', () => {
  let service: ReportStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportStatusFormService);
  });

  describe('Service methods', () => {
    describe('createReportStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReportStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportName: expect.any(Object),
            reportId: expect.any(Object),
            placeholders: expect.any(Object),
            processStatus: expect.any(Object),
          })
        );
      });

      it('passing IReportStatus should create a new form with FormGroup', () => {
        const formGroup = service.createReportStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportName: expect.any(Object),
            reportId: expect.any(Object),
            placeholders: expect.any(Object),
            processStatus: expect.any(Object),
          })
        );
      });
    });

    describe('getReportStatus', () => {
      it('should return NewReportStatus for default ReportStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createReportStatusFormGroup(sampleWithNewData);

        const reportStatus = service.getReportStatus(formGroup) as any;

        expect(reportStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewReportStatus for empty ReportStatus initial value', () => {
        const formGroup = service.createReportStatusFormGroup();

        const reportStatus = service.getReportStatus(formGroup) as any;

        expect(reportStatus).toMatchObject({});
      });

      it('should return IReportStatus', () => {
        const formGroup = service.createReportStatusFormGroup(sampleWithRequiredData);

        const reportStatus = service.getReportStatus(formGroup) as any;

        expect(reportStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReportStatus should not enable id FormControl', () => {
        const formGroup = service.createReportStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReportStatus should disable id FormControl', () => {
        const formGroup = service.createReportStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
