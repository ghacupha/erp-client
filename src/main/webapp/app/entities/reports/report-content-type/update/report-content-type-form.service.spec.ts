import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../report-content-type.test-samples';

import { ReportContentTypeFormService } from './report-content-type-form.service';

describe('ReportContentType Form Service', () => {
  let service: ReportContentTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportContentTypeFormService);
  });

  describe('Service methods', () => {
    describe('createReportContentTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReportContentTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportTypeName: expect.any(Object),
            reportFileExtension: expect.any(Object),
            systemContentType: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IReportContentType should create a new form with FormGroup', () => {
        const formGroup = service.createReportContentTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportTypeName: expect.any(Object),
            reportFileExtension: expect.any(Object),
            systemContentType: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getReportContentType', () => {
      it('should return NewReportContentType for default ReportContentType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createReportContentTypeFormGroup(sampleWithNewData);

        const reportContentType = service.getReportContentType(formGroup) as any;

        expect(reportContentType).toMatchObject(sampleWithNewData);
      });

      it('should return NewReportContentType for empty ReportContentType initial value', () => {
        const formGroup = service.createReportContentTypeFormGroup();

        const reportContentType = service.getReportContentType(formGroup) as any;

        expect(reportContentType).toMatchObject({});
      });

      it('should return IReportContentType', () => {
        const formGroup = service.createReportContentTypeFormGroup(sampleWithRequiredData);

        const reportContentType = service.getReportContentType(formGroup) as any;

        expect(reportContentType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReportContentType should not enable id FormControl', () => {
        const formGroup = service.createReportContentTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReportContentType should disable id FormControl', () => {
        const formGroup = service.createReportContentTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
