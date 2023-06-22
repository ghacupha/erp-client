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

import { sampleWithRequiredData, sampleWithNewData } from '../payment-label.test-samples';

import { PaymentLabelFormService } from './payment-label-form.service';

describe('PaymentLabel Form Service', () => {
  let service: PaymentLabelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentLabelFormService);
  });

  describe('Service methods', () => {
    describe('createPaymentLabelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPaymentLabelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            comments: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            containingPaymentLabel: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IPaymentLabel should create a new form with FormGroup', () => {
        const formGroup = service.createPaymentLabelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            comments: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            containingPaymentLabel: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getPaymentLabel', () => {
      it('should return NewPaymentLabel for default PaymentLabel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPaymentLabelFormGroup(sampleWithNewData);

        const paymentLabel = service.getPaymentLabel(formGroup) as any;

        expect(paymentLabel).toMatchObject(sampleWithNewData);
      });

      it('should return NewPaymentLabel for empty PaymentLabel initial value', () => {
        const formGroup = service.createPaymentLabelFormGroup();

        const paymentLabel = service.getPaymentLabel(formGroup) as any;

        expect(paymentLabel).toMatchObject({});
      });

      it('should return IPaymentLabel', () => {
        const formGroup = service.createPaymentLabelFormGroup(sampleWithRequiredData);

        const paymentLabel = service.getPaymentLabel(formGroup) as any;

        expect(paymentLabel).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPaymentLabel should not enable id FormControl', () => {
        const formGroup = service.createPaymentLabelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPaymentLabel should disable id FormControl', () => {
        const formGroup = service.createPaymentLabelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
