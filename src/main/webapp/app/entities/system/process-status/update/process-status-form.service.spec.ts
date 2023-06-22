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

import { sampleWithRequiredData, sampleWithNewData } from '../process-status.test-samples';

import { ProcessStatusFormService } from './process-status-form.service';

describe('ProcessStatus Form Service', () => {
  let service: ProcessStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessStatusFormService);
  });

  describe('Service methods', () => {
    describe('createProcessStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProcessStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            statusCode: expect.any(Object),
            description: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
          })
        );
      });

      it('passing IProcessStatus should create a new form with FormGroup', () => {
        const formGroup = service.createProcessStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            statusCode: expect.any(Object),
            description: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
          })
        );
      });
    });

    describe('getProcessStatus', () => {
      it('should return NewProcessStatus for default ProcessStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProcessStatusFormGroup(sampleWithNewData);

        const processStatus = service.getProcessStatus(formGroup) as any;

        expect(processStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewProcessStatus for empty ProcessStatus initial value', () => {
        const formGroup = service.createProcessStatusFormGroup();

        const processStatus = service.getProcessStatus(formGroup) as any;

        expect(processStatus).toMatchObject({});
      });

      it('should return IProcessStatus', () => {
        const formGroup = service.createProcessStatusFormGroup(sampleWithRequiredData);

        const processStatus = service.getProcessStatus(formGroup) as any;

        expect(processStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProcessStatus should not enable id FormControl', () => {
        const formGroup = service.createProcessStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProcessStatus should disable id FormControl', () => {
        const formGroup = service.createProcessStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
