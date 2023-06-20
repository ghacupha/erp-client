import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../report-requisition.test-samples';

import { ReportRequisitionFormService } from './report-requisition-form.service';

describe('ReportRequisition Form Service', () => {
  let service: ReportRequisitionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportRequisitionFormService);
  });

  describe('Service methods', () => {
    describe('createReportRequisitionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReportRequisitionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportName: expect.any(Object),
            reportRequestTime: expect.any(Object),
            reportPassword: expect.any(Object),
            reportStatus: expect.any(Object),
            reportId: expect.any(Object),
            reportFileAttachment: expect.any(Object),
            reportFileCheckSum: expect.any(Object),
            reportNotes: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
            reportTemplate: expect.any(Object),
            reportContentType: expect.any(Object),
          })
        );
      });

      it('passing IReportRequisition should create a new form with FormGroup', () => {
        const formGroup = service.createReportRequisitionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportName: expect.any(Object),
            reportRequestTime: expect.any(Object),
            reportPassword: expect.any(Object),
            reportStatus: expect.any(Object),
            reportId: expect.any(Object),
            reportFileAttachment: expect.any(Object),
            reportFileCheckSum: expect.any(Object),
            reportNotes: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
            reportTemplate: expect.any(Object),
            reportContentType: expect.any(Object),
          })
        );
      });
    });

    describe('getReportRequisition', () => {
      it('should return NewReportRequisition for default ReportRequisition initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createReportRequisitionFormGroup(sampleWithNewData);

        const reportRequisition = service.getReportRequisition(formGroup) as any;

        expect(reportRequisition).toMatchObject(sampleWithNewData);
      });

      it('should return NewReportRequisition for empty ReportRequisition initial value', () => {
        const formGroup = service.createReportRequisitionFormGroup();

        const reportRequisition = service.getReportRequisition(formGroup) as any;

        expect(reportRequisition).toMatchObject({});
      });

      it('should return IReportRequisition', () => {
        const formGroup = service.createReportRequisitionFormGroup(sampleWithRequiredData);

        const reportRequisition = service.getReportRequisition(formGroup) as any;

        expect(reportRequisition).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReportRequisition should not enable id FormControl', () => {
        const formGroup = service.createReportRequisitionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReportRequisition should disable id FormControl', () => {
        const formGroup = service.createReportRequisitionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
