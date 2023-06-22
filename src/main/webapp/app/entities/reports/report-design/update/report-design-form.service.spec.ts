import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../report-design.test-samples';

import { ReportDesignFormService } from './report-design-form.service';

describe('ReportDesign Form Service', () => {
  let service: ReportDesignFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportDesignFormService);
  });

  describe('Service methods', () => {
    describe('createReportDesignFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReportDesignFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catalogueNumber: expect.any(Object),
            designation: expect.any(Object),
            description: expect.any(Object),
            notes: expect.any(Object),
            reportFile: expect.any(Object),
            reportFileChecksum: expect.any(Object),
            parameters: expect.any(Object),
            securityClearance: expect.any(Object),
            reportDesigner: expect.any(Object),
            organization: expect.any(Object),
            department: expect.any(Object),
            placeholders: expect.any(Object),
            systemModule: expect.any(Object),
            fileCheckSumAlgorithm: expect.any(Object),
          })
        );
      });

      it('passing IReportDesign should create a new form with FormGroup', () => {
        const formGroup = service.createReportDesignFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catalogueNumber: expect.any(Object),
            designation: expect.any(Object),
            description: expect.any(Object),
            notes: expect.any(Object),
            reportFile: expect.any(Object),
            reportFileChecksum: expect.any(Object),
            parameters: expect.any(Object),
            securityClearance: expect.any(Object),
            reportDesigner: expect.any(Object),
            organization: expect.any(Object),
            department: expect.any(Object),
            placeholders: expect.any(Object),
            systemModule: expect.any(Object),
            fileCheckSumAlgorithm: expect.any(Object),
          })
        );
      });
    });

    describe('getReportDesign', () => {
      it('should return NewReportDesign for default ReportDesign initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createReportDesignFormGroup(sampleWithNewData);

        const reportDesign = service.getReportDesign(formGroup) as any;

        expect(reportDesign).toMatchObject(sampleWithNewData);
      });

      it('should return NewReportDesign for empty ReportDesign initial value', () => {
        const formGroup = service.createReportDesignFormGroup();

        const reportDesign = service.getReportDesign(formGroup) as any;

        expect(reportDesign).toMatchObject({});
      });

      it('should return IReportDesign', () => {
        const formGroup = service.createReportDesignFormGroup(sampleWithRequiredData);

        const reportDesign = service.getReportDesign(formGroup) as any;

        expect(reportDesign).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReportDesign should not enable id FormControl', () => {
        const formGroup = service.createReportDesignFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReportDesign should disable id FormControl', () => {
        const formGroup = service.createReportDesignFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
