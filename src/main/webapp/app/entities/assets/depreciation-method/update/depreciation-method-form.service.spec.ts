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

import { sampleWithRequiredData, sampleWithNewData } from '../depreciation-method.test-samples';

import { DepreciationMethodFormService } from './depreciation-method-form.service';

describe('DepreciationMethod Form Service', () => {
  let service: DepreciationMethodFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepreciationMethodFormService);
  });

  describe('Service methods', () => {
    describe('createDepreciationMethodFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDepreciationMethodFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            depreciationMethodName: expect.any(Object),
            description: expect.any(Object),
            depreciationType: expect.any(Object),
            remarks: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IDepreciationMethod should create a new form with FormGroup', () => {
        const formGroup = service.createDepreciationMethodFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            depreciationMethodName: expect.any(Object),
            description: expect.any(Object),
            depreciationType: expect.any(Object),
            remarks: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getDepreciationMethod', () => {
      it('should return NewDepreciationMethod for default DepreciationMethod initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDepreciationMethodFormGroup(sampleWithNewData);

        const depreciationMethod = service.getDepreciationMethod(formGroup) as any;

        expect(depreciationMethod).toMatchObject(sampleWithNewData);
      });

      it('should return NewDepreciationMethod for empty DepreciationMethod initial value', () => {
        const formGroup = service.createDepreciationMethodFormGroup();

        const depreciationMethod = service.getDepreciationMethod(formGroup) as any;

        expect(depreciationMethod).toMatchObject({});
      });

      it('should return IDepreciationMethod', () => {
        const formGroup = service.createDepreciationMethodFormGroup(sampleWithRequiredData);

        const depreciationMethod = service.getDepreciationMethod(formGroup) as any;

        expect(depreciationMethod).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDepreciationMethod should not enable id FormControl', () => {
        const formGroup = service.createDepreciationMethodFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDepreciationMethod should disable id FormControl', () => {
        const formGroup = service.createDepreciationMethodFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
