import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../pdf-report-requisition.test-samples';

import { PdfReportRequisitionFormService } from './pdf-report-requisition-form.service';

describe('PdfReportRequisition Form Service', () => {
  let service: PdfReportRequisitionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfReportRequisitionFormService);
  });

  describe('Service methods', () => {
    describe('createPdfReportRequisitionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPdfReportRequisitionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportName: expect.any(Object),
            reportDate: expect.any(Object),
            userPassword: expect.any(Object),
            ownerPassword: expect.any(Object),
            reportFileChecksum: expect.any(Object),
            reportStatus: expect.any(Object),
            reportId: expect.any(Object),
            reportTemplate: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
          })
        );
      });

      it('passing IPdfReportRequisition should create a new form with FormGroup', () => {
        const formGroup = service.createPdfReportRequisitionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportName: expect.any(Object),
            reportDate: expect.any(Object),
            userPassword: expect.any(Object),
            ownerPassword: expect.any(Object),
            reportFileChecksum: expect.any(Object),
            reportStatus: expect.any(Object),
            reportId: expect.any(Object),
            reportTemplate: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
          })
        );
      });
    });

    describe('getPdfReportRequisition', () => {
      it('should return NewPdfReportRequisition for default PdfReportRequisition initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPdfReportRequisitionFormGroup(sampleWithNewData);

        const pdfReportRequisition = service.getPdfReportRequisition(formGroup) as any;

        expect(pdfReportRequisition).toMatchObject(sampleWithNewData);
      });

      it('should return NewPdfReportRequisition for empty PdfReportRequisition initial value', () => {
        const formGroup = service.createPdfReportRequisitionFormGroup();

        const pdfReportRequisition = service.getPdfReportRequisition(formGroup) as any;

        expect(pdfReportRequisition).toMatchObject({});
      });

      it('should return IPdfReportRequisition', () => {
        const formGroup = service.createPdfReportRequisitionFormGroup(sampleWithRequiredData);

        const pdfReportRequisition = service.getPdfReportRequisition(formGroup) as any;

        expect(pdfReportRequisition).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPdfReportRequisition should not enable id FormControl', () => {
        const formGroup = service.createPdfReportRequisitionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPdfReportRequisition should disable id FormControl', () => {
        const formGroup = service.createPdfReportRequisitionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
