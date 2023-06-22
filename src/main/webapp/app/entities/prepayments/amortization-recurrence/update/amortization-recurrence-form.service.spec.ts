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

import { sampleWithRequiredData, sampleWithNewData } from '../amortization-recurrence.test-samples';

import { AmortizationRecurrenceFormService } from './amortization-recurrence-form.service';

describe('AmortizationRecurrence Form Service', () => {
  let service: AmortizationRecurrenceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmortizationRecurrenceFormService);
  });

  describe('Service methods', () => {
    describe('createAmortizationRecurrenceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAmortizationRecurrenceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstAmortizationDate: expect.any(Object),
            amortizationFrequency: expect.any(Object),
            numberOfRecurrences: expect.any(Object),
            notes: expect.any(Object),
            particulars: expect.any(Object),
            isActive: expect.any(Object),
            isOverWritten: expect.any(Object),
            timeOfInstallation: expect.any(Object),
            recurrenceGuid: expect.any(Object),
            prepaymentAccountGuid: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
            applicationParameters: expect.any(Object),
            depreciationMethod: expect.any(Object),
            prepaymentAccount: expect.any(Object),
          })
        );
      });

      it('passing IAmortizationRecurrence should create a new form with FormGroup', () => {
        const formGroup = service.createAmortizationRecurrenceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstAmortizationDate: expect.any(Object),
            amortizationFrequency: expect.any(Object),
            numberOfRecurrences: expect.any(Object),
            notes: expect.any(Object),
            particulars: expect.any(Object),
            isActive: expect.any(Object),
            isOverWritten: expect.any(Object),
            timeOfInstallation: expect.any(Object),
            recurrenceGuid: expect.any(Object),
            prepaymentAccountGuid: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
            applicationParameters: expect.any(Object),
            depreciationMethod: expect.any(Object),
            prepaymentAccount: expect.any(Object),
          })
        );
      });
    });

    describe('getAmortizationRecurrence', () => {
      it('should return NewAmortizationRecurrence for default AmortizationRecurrence initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAmortizationRecurrenceFormGroup(sampleWithNewData);

        const amortizationRecurrence = service.getAmortizationRecurrence(formGroup) as any;

        expect(amortizationRecurrence).toMatchObject(sampleWithNewData);
      });

      it('should return NewAmortizationRecurrence for empty AmortizationRecurrence initial value', () => {
        const formGroup = service.createAmortizationRecurrenceFormGroup();

        const amortizationRecurrence = service.getAmortizationRecurrence(formGroup) as any;

        expect(amortizationRecurrence).toMatchObject({});
      });

      it('should return IAmortizationRecurrence', () => {
        const formGroup = service.createAmortizationRecurrenceFormGroup(sampleWithRequiredData);

        const amortizationRecurrence = service.getAmortizationRecurrence(formGroup) as any;

        expect(amortizationRecurrence).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAmortizationRecurrence should not enable id FormControl', () => {
        const formGroup = service.createAmortizationRecurrenceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAmortizationRecurrence should disable id FormControl', () => {
        const formGroup = service.createAmortizationRecurrenceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
