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

import { sampleWithRequiredData, sampleWithNewData } from '../outlet-status.test-samples';

import { OutletStatusFormService } from './outlet-status-form.service';

describe('OutletStatus Form Service', () => {
  let service: OutletStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutletStatusFormService);
  });

  describe('Service methods', () => {
    describe('createOutletStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOutletStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            branchStatusTypeCode: expect.any(Object),
            branchStatusType: expect.any(Object),
            branchStatusTypeDescription: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IOutletStatus should create a new form with FormGroup', () => {
        const formGroup = service.createOutletStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            branchStatusTypeCode: expect.any(Object),
            branchStatusType: expect.any(Object),
            branchStatusTypeDescription: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getOutletStatus', () => {
      it('should return NewOutletStatus for default OutletStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createOutletStatusFormGroup(sampleWithNewData);

        const outletStatus = service.getOutletStatus(formGroup) as any;

        expect(outletStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewOutletStatus for empty OutletStatus initial value', () => {
        const formGroup = service.createOutletStatusFormGroup();

        const outletStatus = service.getOutletStatus(formGroup) as any;

        expect(outletStatus).toMatchObject({});
      });

      it('should return IOutletStatus', () => {
        const formGroup = service.createOutletStatusFormGroup(sampleWithRequiredData);

        const outletStatus = service.getOutletStatus(formGroup) as any;

        expect(outletStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOutletStatus should not enable id FormControl', () => {
        const formGroup = service.createOutletStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOutletStatus should disable id FormControl', () => {
        const formGroup = service.createOutletStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
