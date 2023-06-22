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

import { sampleWithRequiredData, sampleWithNewData } from '../prepayment-marshalling.test-samples';

import { PrepaymentMarshallingFormService } from './prepayment-marshalling-form.service';

describe('PrepaymentMarshalling Form Service', () => {
  let service: PrepaymentMarshallingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepaymentMarshallingFormService);
  });

  describe('Service methods', () => {
    describe('createPrepaymentMarshallingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            inactive: expect.any(Object),
            amortizationCommencementDate: expect.any(Object),
            amortizationPeriods: expect.any(Object),
            prepaymentAccount: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IPrepaymentMarshalling should create a new form with FormGroup', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            inactive: expect.any(Object),
            amortizationCommencementDate: expect.any(Object),
            amortizationPeriods: expect.any(Object),
            prepaymentAccount: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getPrepaymentMarshalling', () => {
      it('should return NewPrepaymentMarshalling for default PrepaymentMarshalling initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPrepaymentMarshallingFormGroup(sampleWithNewData);

        const prepaymentMarshalling = service.getPrepaymentMarshalling(formGroup) as any;

        expect(prepaymentMarshalling).toMatchObject(sampleWithNewData);
      });

      it('should return NewPrepaymentMarshalling for empty PrepaymentMarshalling initial value', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup();

        const prepaymentMarshalling = service.getPrepaymentMarshalling(formGroup) as any;

        expect(prepaymentMarshalling).toMatchObject({});
      });

      it('should return IPrepaymentMarshalling', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup(sampleWithRequiredData);

        const prepaymentMarshalling = service.getPrepaymentMarshalling(formGroup) as any;

        expect(prepaymentMarshalling).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPrepaymentMarshalling should not enable id FormControl', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPrepaymentMarshalling should disable id FormControl', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
