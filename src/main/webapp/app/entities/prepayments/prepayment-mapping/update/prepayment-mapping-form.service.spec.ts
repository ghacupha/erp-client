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

import { sampleWithRequiredData, sampleWithNewData } from '../prepayment-mapping.test-samples';

import { PrepaymentMappingFormService } from './prepayment-mapping-form.service';

describe('PrepaymentMapping Form Service', () => {
  let service: PrepaymentMappingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepaymentMappingFormService);
  });

  describe('Service methods', () => {
    describe('createPrepaymentMappingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPrepaymentMappingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            parameterKey: expect.any(Object),
            parameterGuid: expect.any(Object),
            parameter: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IPrepaymentMapping should create a new form with FormGroup', () => {
        const formGroup = service.createPrepaymentMappingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            parameterKey: expect.any(Object),
            parameterGuid: expect.any(Object),
            parameter: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getPrepaymentMapping', () => {
      it('should return NewPrepaymentMapping for default PrepaymentMapping initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPrepaymentMappingFormGroup(sampleWithNewData);

        const prepaymentMapping = service.getPrepaymentMapping(formGroup) as any;

        expect(prepaymentMapping).toMatchObject(sampleWithNewData);
      });

      it('should return NewPrepaymentMapping for empty PrepaymentMapping initial value', () => {
        const formGroup = service.createPrepaymentMappingFormGroup();

        const prepaymentMapping = service.getPrepaymentMapping(formGroup) as any;

        expect(prepaymentMapping).toMatchObject({});
      });

      it('should return IPrepaymentMapping', () => {
        const formGroup = service.createPrepaymentMappingFormGroup(sampleWithRequiredData);

        const prepaymentMapping = service.getPrepaymentMapping(formGroup) as any;

        expect(prepaymentMapping).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPrepaymentMapping should not enable id FormControl', () => {
        const formGroup = service.createPrepaymentMappingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPrepaymentMapping should disable id FormControl', () => {
        const formGroup = service.createPrepaymentMappingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
