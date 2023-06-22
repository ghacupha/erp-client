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

import { sampleWithRequiredData, sampleWithNewData } from '../invoice.test-samples';

import { InvoiceFormService } from './invoice-form.service';

describe('Invoice Form Service', () => {
  let service: InvoiceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceFormService);
  });

  describe('Service methods', () => {
    describe('createInvoiceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInvoiceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            invoiceNumber: expect.any(Object),
            invoiceDate: expect.any(Object),
            invoiceAmount: expect.any(Object),
            currency: expect.any(Object),
            paymentReference: expect.any(Object),
            dealerName: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IInvoice should create a new form with FormGroup', () => {
        const formGroup = service.createInvoiceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            invoiceNumber: expect.any(Object),
            invoiceDate: expect.any(Object),
            invoiceAmount: expect.any(Object),
            currency: expect.any(Object),
            paymentReference: expect.any(Object),
            dealerName: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getInvoice', () => {
      it('should return NewInvoice for default Invoice initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInvoiceFormGroup(sampleWithNewData);

        const invoice = service.getInvoice(formGroup) as any;

        expect(invoice).toMatchObject(sampleWithNewData);
      });

      it('should return NewInvoice for empty Invoice initial value', () => {
        const formGroup = service.createInvoiceFormGroup();

        const invoice = service.getInvoice(formGroup) as any;

        expect(invoice).toMatchObject({});
      });

      it('should return IInvoice', () => {
        const formGroup = service.createInvoiceFormGroup(sampleWithRequiredData);

        const invoice = service.getInvoice(formGroup) as any;

        expect(invoice).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInvoice should not enable id FormControl', () => {
        const formGroup = service.createInvoiceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInvoice should disable id FormControl', () => {
        const formGroup = service.createInvoiceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
