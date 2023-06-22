///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../excel-report-export.test-samples';

import { ExcelReportExportFormService } from './excel-report-export-form.service';

describe('ExcelReportExport Form Service', () => {
  let service: ExcelReportExportFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelReportExportFormService);
  });

  describe('Service methods', () => {
    describe('createExcelReportExportFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createExcelReportExportFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportName: expect.any(Object),
            reportPassword: expect.any(Object),
            reportNotes: expect.any(Object),
            fileCheckSum: expect.any(Object),
            reportFile: expect.any(Object),
            reportTimeStamp: expect.any(Object),
            reportId: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
            reportStatus: expect.any(Object),
            securityClearance: expect.any(Object),
            reportCreator: expect.any(Object),
            organization: expect.any(Object),
            department: expect.any(Object),
            systemModule: expect.any(Object),
            reportDesign: expect.any(Object),
            fileCheckSumAlgorithm: expect.any(Object),
          })
        );
      });

      it('passing IExcelReportExport should create a new form with FormGroup', () => {
        const formGroup = service.createExcelReportExportFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportName: expect.any(Object),
            reportPassword: expect.any(Object),
            reportNotes: expect.any(Object),
            fileCheckSum: expect.any(Object),
            reportFile: expect.any(Object),
            reportTimeStamp: expect.any(Object),
            reportId: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
            reportStatus: expect.any(Object),
            securityClearance: expect.any(Object),
            reportCreator: expect.any(Object),
            organization: expect.any(Object),
            department: expect.any(Object),
            systemModule: expect.any(Object),
            reportDesign: expect.any(Object),
            fileCheckSumAlgorithm: expect.any(Object),
          })
        );
      });
    });

    describe('getExcelReportExport', () => {
      it('should return NewExcelReportExport for default ExcelReportExport initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createExcelReportExportFormGroup(sampleWithNewData);

        const excelReportExport = service.getExcelReportExport(formGroup) as any;

        expect(excelReportExport).toMatchObject(sampleWithNewData);
      });

      it('should return NewExcelReportExport for empty ExcelReportExport initial value', () => {
        const formGroup = service.createExcelReportExportFormGroup();

        const excelReportExport = service.getExcelReportExport(formGroup) as any;

        expect(excelReportExport).toMatchObject({});
      });

      it('should return IExcelReportExport', () => {
        const formGroup = service.createExcelReportExportFormGroup(sampleWithRequiredData);

        const excelReportExport = service.getExcelReportExport(formGroup) as any;

        expect(excelReportExport).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IExcelReportExport should not enable id FormControl', () => {
        const formGroup = service.createExcelReportExportFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewExcelReportExport should disable id FormControl', () => {
        const formGroup = service.createExcelReportExportFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
