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

import { sampleWithRequiredData, sampleWithNewData } from '../payment.test-samples';

import { PaymentFormService } from './payment-form.service';

describe('Payment Form Service', () => {
  let service: PaymentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentFormService);
  });

  describe('Service methods', () => {
    describe('createPaymentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPaymentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            paymentNumber: expect.any(Object),
            paymentDate: expect.any(Object),
            invoicedAmount: expect.any(Object),
            paymentAmount: expect.any(Object),
            description: expect.any(Object),
            settlementCurrency: expect.any(Object),
            calculationFile: expect.any(Object),
            dealerName: expect.any(Object),
            purchaseOrderNumber: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            paymentCategory: expect.any(Object),
            placeholders: expect.any(Object),
            paymentGroup: expect.any(Object),
          })
        );
      });

      it('passing IPayment should create a new form with FormGroup', () => {
        const formGroup = service.createPaymentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            paymentNumber: expect.any(Object),
            paymentDate: expect.any(Object),
            invoicedAmount: expect.any(Object),
            paymentAmount: expect.any(Object),
            description: expect.any(Object),
            settlementCurrency: expect.any(Object),
            calculationFile: expect.any(Object),
            dealerName: expect.any(Object),
            purchaseOrderNumber: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            paymentLabels: expect.any(Object),
            paymentCategory: expect.any(Object),
            placeholders: expect.any(Object),
            paymentGroup: expect.any(Object),
          })
        );
      });
    });

    describe('getPayment', () => {
      it('should return NewPayment for default Payment initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPaymentFormGroup(sampleWithNewData);

        const payment = service.getPayment(formGroup) as any;

        expect(payment).toMatchObject(sampleWithNewData);
      });

      it('should return NewPayment for empty Payment initial value', () => {
        const formGroup = service.createPaymentFormGroup();

        const payment = service.getPayment(formGroup) as any;

        expect(payment).toMatchObject({});
      });

      it('should return IPayment', () => {
        const formGroup = service.createPaymentFormGroup(sampleWithRequiredData);

        const payment = service.getPayment(formGroup) as any;

        expect(payment).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPayment should not enable id FormControl', () => {
        const formGroup = service.createPaymentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPayment should disable id FormControl', () => {
        const formGroup = service.createPaymentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
