import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../report-template.test-samples';

import { ReportTemplateFormService } from './report-template-form.service';

describe('ReportTemplate Form Service', () => {
  let service: ReportTemplateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportTemplateFormService);
  });

  describe('Service methods', () => {
    describe('createReportTemplateFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReportTemplateFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catalogueNumber: expect.any(Object),
            description: expect.any(Object),
            notes: expect.any(Object),
            reportFile: expect.any(Object),
            compileReportFile: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IReportTemplate should create a new form with FormGroup', () => {
        const formGroup = service.createReportTemplateFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catalogueNumber: expect.any(Object),
            description: expect.any(Object),
            notes: expect.any(Object),
            reportFile: expect.any(Object),
            compileReportFile: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getReportTemplate', () => {
      it('should return NewReportTemplate for default ReportTemplate initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createReportTemplateFormGroup(sampleWithNewData);

        const reportTemplate = service.getReportTemplate(formGroup) as any;

        expect(reportTemplate).toMatchObject(sampleWithNewData);
      });

      it('should return NewReportTemplate for empty ReportTemplate initial value', () => {
        const formGroup = service.createReportTemplateFormGroup();

        const reportTemplate = service.getReportTemplate(formGroup) as any;

        expect(reportTemplate).toMatchObject({});
      });

      it('should return IReportTemplate', () => {
        const formGroup = service.createReportTemplateFormGroup(sampleWithRequiredData);

        const reportTemplate = service.getReportTemplate(formGroup) as any;

        expect(reportTemplate).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReportTemplate should not enable id FormControl', () => {
        const formGroup = service.createReportTemplateFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReportTemplate should disable id FormControl', () => {
        const formGroup = service.createReportTemplateFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
