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

import { sampleWithRequiredData, sampleWithNewData } from '../county-code.test-samples';

import { CountyCodeFormService } from './county-code-form.service';

describe('CountyCode Form Service', () => {
  let service: CountyCodeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountyCodeFormService);
  });

  describe('Service methods', () => {
    describe('createCountyCodeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCountyCodeFormGroup();

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

      it('passing ICountyCode should create a new form with FormGroup', () => {
        const formGroup = service.createCountyCodeFormGroup(sampleWithRequiredData);

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

    describe('getCountyCode', () => {
      it('should return NewCountyCode for default CountyCode initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCountyCodeFormGroup(sampleWithNewData);

        const countyCode = service.getCountyCode(formGroup) as any;

        expect(countyCode).toMatchObject(sampleWithNewData);
      });

      it('should return NewCountyCode for empty CountyCode initial value', () => {
        const formGroup = service.createCountyCodeFormGroup();

        const countyCode = service.getCountyCode(formGroup) as any;

        expect(countyCode).toMatchObject({});
      });

      it('should return ICountyCode', () => {
        const formGroup = service.createCountyCodeFormGroup(sampleWithRequiredData);

        const countyCode = service.getCountyCode(formGroup) as any;

        expect(countyCode).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICountyCode should not enable id FormControl', () => {
        const formGroup = service.createCountyCodeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCountyCode should disable id FormControl', () => {
        const formGroup = service.createCountyCodeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
