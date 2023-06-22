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

import { sampleWithRequiredData, sampleWithNewData } from '../work-in-progress-transfer.test-samples';

import { WorkInProgressTransferFormService } from './work-in-progress-transfer-form.service';

describe('WorkInProgressTransfer Form Service', () => {
  let service: WorkInProgressTransferFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkInProgressTransferFormService);
  });

  describe('Service methods', () => {
    describe('createWorkInProgressTransferFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWorkInProgressTransferFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            targetAssetNumber: expect.any(Object),
            workInProgressRegistrations: expect.any(Object),
            placeholders: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });

      it('passing IWorkInProgressTransfer should create a new form with FormGroup', () => {
        const formGroup = service.createWorkInProgressTransferFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            targetAssetNumber: expect.any(Object),
            workInProgressRegistrations: expect.any(Object),
            placeholders: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });
    });

    describe('getWorkInProgressTransfer', () => {
      it('should return NewWorkInProgressTransfer for default WorkInProgressTransfer initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWorkInProgressTransferFormGroup(sampleWithNewData);

        const workInProgressTransfer = service.getWorkInProgressTransfer(formGroup) as any;

        expect(workInProgressTransfer).toMatchObject(sampleWithNewData);
      });

      it('should return NewWorkInProgressTransfer for empty WorkInProgressTransfer initial value', () => {
        const formGroup = service.createWorkInProgressTransferFormGroup();

        const workInProgressTransfer = service.getWorkInProgressTransfer(formGroup) as any;

        expect(workInProgressTransfer).toMatchObject({});
      });

      it('should return IWorkInProgressTransfer', () => {
        const formGroup = service.createWorkInProgressTransferFormGroup(sampleWithRequiredData);

        const workInProgressTransfer = service.getWorkInProgressTransfer(formGroup) as any;

        expect(workInProgressTransfer).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWorkInProgressTransfer should not enable id FormControl', () => {
        const formGroup = service.createWorkInProgressTransferFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWorkInProgressTransfer should disable id FormControl', () => {
        const formGroup = service.createWorkInProgressTransferFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
