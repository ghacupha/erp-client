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

import { sampleWithRequiredData, sampleWithNewData } from '../credit-note.test-samples';

import { CreditNoteFormService } from './credit-note-form.service';

describe('CreditNote Form Service', () => {
  let service: CreditNoteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditNoteFormService);
  });

  describe('Service methods', () => {
    describe('createCreditNoteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCreditNoteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            creditNumber: expect.any(Object),
            creditNoteDate: expect.any(Object),
            creditAmount: expect.any(Object),
            remarks: expect.any(Object),
            purchaseOrders: expect.any(Object),
            invoices: expect.any(Object),
            paymentLabels: expect.any(Object),
            placeholders: expect.any(Object),
            settlementCurrency: expect.any(Object),
          })
        );
      });

      it('passing ICreditNote should create a new form with FormGroup', () => {
        const formGroup = service.createCreditNoteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            creditNumber: expect.any(Object),
            creditNoteDate: expect.any(Object),
            creditAmount: expect.any(Object),
            remarks: expect.any(Object),
            purchaseOrders: expect.any(Object),
            invoices: expect.any(Object),
            paymentLabels: expect.any(Object),
            placeholders: expect.any(Object),
            settlementCurrency: expect.any(Object),
          })
        );
      });
    });

    describe('getCreditNote', () => {
      it('should return NewCreditNote for default CreditNote initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCreditNoteFormGroup(sampleWithNewData);

        const creditNote = service.getCreditNote(formGroup) as any;

        expect(creditNote).toMatchObject(sampleWithNewData);
      });

      it('should return NewCreditNote for empty CreditNote initial value', () => {
        const formGroup = service.createCreditNoteFormGroup();

        const creditNote = service.getCreditNote(formGroup) as any;

        expect(creditNote).toMatchObject({});
      });

      it('should return ICreditNote', () => {
        const formGroup = service.createCreditNoteFormGroup(sampleWithRequiredData);

        const creditNote = service.getCreditNote(formGroup) as any;

        expect(creditNote).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICreditNote should not enable id FormControl', () => {
        const formGroup = service.createCreditNoteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCreditNote should disable id FormControl', () => {
        const formGroup = service.createCreditNoteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
