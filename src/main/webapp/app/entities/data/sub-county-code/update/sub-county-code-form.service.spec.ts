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

import { sampleWithRequiredData, sampleWithNewData } from '../sub-county-code.test-samples';

import { SubCountyCodeFormService } from './sub-county-code-form.service';

describe('SubCountyCode Form Service', () => {
  let service: SubCountyCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCountyCodeFormService);
  });

  describe('Service methods', () => {
    describe('createSubCountyCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSubCountyCodeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            countyCode: expect.any(Object),
            countyName: expect.any(Object),
            subCountyCode: expect.any(Object),
            subCountyName: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ISubCountyCode should create a new form with FormGroup', () => {
        const formGroup = service.createSubCountyCodeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            countyCode: expect.any(Object),
            countyName: expect.any(Object),
            subCountyCode: expect.any(Object),
            subCountyName: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getSubCountyCode', () => {
      it('should return NewSubCountyCode for default SubCountyCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSubCountyCodeFormGroup(sampleWithNewData);

        const subCountyCode = service.getSubCountyCode(formGroup) as any;

        expect(subCountyCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewSubCountyCode for empty SubCountyCode initial value', () => {
        const formGroup = service.createSubCountyCodeFormGroup();

        const subCountyCode = service.getSubCountyCode(formGroup) as any;

        expect(subCountyCode).toMatchObject({});
      });

      it('should return ISubCountyCode', () => {
        const formGroup = service.createSubCountyCodeFormGroup(sampleWithRequiredData);

        const subCountyCode = service.getSubCountyCode(formGroup) as any;

        expect(subCountyCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISubCountyCode should not enable id FormControl', () => {
        const formGroup = service.createSubCountyCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSubCountyCode should disable id FormControl', () => {
        const formGroup = service.createSubCountyCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
