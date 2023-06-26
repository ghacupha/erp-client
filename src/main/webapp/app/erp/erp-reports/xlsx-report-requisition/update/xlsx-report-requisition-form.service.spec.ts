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

import { sampleWithRequiredData, sampleWithNewData } from '../xlsx-report-requisition.test-samples';

import { XlsxReportRequisitionFormService } from './xlsx-report-requisition-form.service';

describe('XlsxReportRequisition Form Service', () => {
  let service: XlsxReportRequisitionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XlsxReportRequisitionFormService);
  });

  describe('Service methods', () => {
    describe('createXlsxReportRequisitionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createXlsxReportRequisitionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportName: expect.any(Object),
            reportDate: expect.any(Object),
            userPassword: expect.any(Object),
            reportFileChecksum: expect.any(Object),
            reportStatus: expect.any(Object),
            reportId: expect.any(Object),
            reportTemplate: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
          })
        );
      });

      it('passing IXlsxReportRequisition should create a new form with FormGroup', () => {
        const formGroup = service.createXlsxReportRequisitionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportName: expect.any(Object),
            reportDate: expect.any(Object),
            userPassword: expect.any(Object),
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

    describe('getXlsxReportRequisition', () => {
      it('should return NewXlsxReportRequisition for default XlsxReportRequisition initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createXlsxReportRequisitionFormGroup(sampleWithNewData);

        const xlsxReportRequisition = service.getXlsxReportRequisition(formGroup) as any;

        expect(xlsxReportRequisition).toMatchObject(sampleWithNewData);
      });

      it('should return NewXlsxReportRequisition for empty XlsxReportRequisition initial value', () => {
        const formGroup = service.createXlsxReportRequisitionFormGroup();

        const xlsxReportRequisition = service.getXlsxReportRequisition(formGroup) as any;

        expect(xlsxReportRequisition).toMatchObject({});
      });

      it('should return IXlsxReportRequisition', () => {
        const formGroup = service.createXlsxReportRequisitionFormGroup(sampleWithRequiredData);

        const xlsxReportRequisition = service.getXlsxReportRequisition(formGroup) as any;

        expect(xlsxReportRequisition).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IXlsxReportRequisition should not enable id FormControl', () => {
        const formGroup = service.createXlsxReportRequisitionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewXlsxReportRequisition should disable id FormControl', () => {
        const formGroup = service.createXlsxReportRequisitionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
