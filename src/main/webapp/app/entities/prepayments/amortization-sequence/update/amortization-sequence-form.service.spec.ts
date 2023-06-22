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

import { sampleWithRequiredData, sampleWithNewData } from '../amortization-sequence.test-samples';

import { AmortizationSequenceFormService } from './amortization-sequence-form.service';

describe('AmortizationSequence Form Service', () => {
  let service: AmortizationSequenceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmortizationSequenceFormService);
  });

  describe('Service methods', () => {
    describe('createAmortizationSequenceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAmortizationSequenceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            prepaymentAccountGuid: expect.any(Object),
            recurrenceGuid: expect.any(Object),
            sequenceNumber: expect.any(Object),
            particulars: expect.any(Object),
            currentAmortizationDate: expect.any(Object),
            previousAmortizationDate: expect.any(Object),
            nextAmortizationDate: expect.any(Object),
            isCommencementSequence: expect.any(Object),
            isTerminalSequence: expect.any(Object),
            amortizationAmount: expect.any(Object),
            sequenceGuid: expect.any(Object),
            prepaymentAccount: expect.any(Object),
            amortizationRecurrence: expect.any(Object),
            placeholders: expect.any(Object),
            prepaymentMappings: expect.any(Object),
            applicationParameters: expect.any(Object),
          })
        );
      });

      it('passing IAmortizationSequence should create a new form with FormGroup', () => {
        const formGroup = service.createAmortizationSequenceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            prepaymentAccountGuid: expect.any(Object),
            recurrenceGuid: expect.any(Object),
            sequenceNumber: expect.any(Object),
            particulars: expect.any(Object),
            currentAmortizationDate: expect.any(Object),
            previousAmortizationDate: expect.any(Object),
            nextAmortizationDate: expect.any(Object),
            isCommencementSequence: expect.any(Object),
            isTerminalSequence: expect.any(Object),
            amortizationAmount: expect.any(Object),
            sequenceGuid: expect.any(Object),
            prepaymentAccount: expect.any(Object),
            amortizationRecurrence: expect.any(Object),
            placeholders: expect.any(Object),
            prepaymentMappings: expect.any(Object),
            applicationParameters: expect.any(Object),
          })
        );
      });
    });

    describe('getAmortizationSequence', () => {
      it('should return NewAmortizationSequence for default AmortizationSequence initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAmortizationSequenceFormGroup(sampleWithNewData);

        const amortizationSequence = service.getAmortizationSequence(formGroup) as any;

        expect(amortizationSequence).toMatchObject(sampleWithNewData);
      });

      it('should return NewAmortizationSequence for empty AmortizationSequence initial value', () => {
        const formGroup = service.createAmortizationSequenceFormGroup();

        const amortizationSequence = service.getAmortizationSequence(formGroup) as any;

        expect(amortizationSequence).toMatchObject({});
      });

      it('should return IAmortizationSequence', () => {
        const formGroup = service.createAmortizationSequenceFormGroup(sampleWithRequiredData);

        const amortizationSequence = service.getAmortizationSequence(formGroup) as any;

        expect(amortizationSequence).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAmortizationSequence should not enable id FormControl', () => {
        const formGroup = service.createAmortizationSequenceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAmortizationSequence should disable id FormControl', () => {
        const formGroup = service.createAmortizationSequenceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
