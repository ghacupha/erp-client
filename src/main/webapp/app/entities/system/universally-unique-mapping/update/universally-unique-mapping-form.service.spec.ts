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

import { sampleWithRequiredData, sampleWithNewData } from '../universally-unique-mapping.test-samples';

import { UniversallyUniqueMappingFormService } from './universally-unique-mapping-form.service';

describe('UniversallyUniqueMapping Form Service', () => {
  let service: UniversallyUniqueMappingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversallyUniqueMappingFormService);
  });

  describe('Service methods', () => {
    describe('createUniversallyUniqueMappingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUniversallyUniqueMappingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            universalKey: expect.any(Object),
            mappedValue: expect.any(Object),
          })
        );
      });

      it('passing IUniversallyUniqueMapping should create a new form with FormGroup', () => {
        const formGroup = service.createUniversallyUniqueMappingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            universalKey: expect.any(Object),
            mappedValue: expect.any(Object),
          })
        );
      });
    });

    describe('getUniversallyUniqueMapping', () => {
      it('should return NewUniversallyUniqueMapping for default UniversallyUniqueMapping initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUniversallyUniqueMappingFormGroup(sampleWithNewData);

        const universallyUniqueMapping = service.getUniversallyUniqueMapping(formGroup) as any;

        expect(universallyUniqueMapping).toMatchObject(sampleWithNewData);
      });

      it('should return NewUniversallyUniqueMapping for empty UniversallyUniqueMapping initial value', () => {
        const formGroup = service.createUniversallyUniqueMappingFormGroup();

        const universallyUniqueMapping = service.getUniversallyUniqueMapping(formGroup) as any;

        expect(universallyUniqueMapping).toMatchObject({});
      });

      it('should return IUniversallyUniqueMapping', () => {
        const formGroup = service.createUniversallyUniqueMappingFormGroup(sampleWithRequiredData);

        const universallyUniqueMapping = service.getUniversallyUniqueMapping(formGroup) as any;

        expect(universallyUniqueMapping).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUniversallyUniqueMapping should not enable id FormControl', () => {
        const formGroup = service.createUniversallyUniqueMappingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUniversallyUniqueMapping should disable id FormControl', () => {
        const formGroup = service.createUniversallyUniqueMappingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
