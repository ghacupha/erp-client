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

import { sampleWithRequiredData, sampleWithNewData } from '../purchase-order.test-samples';

import { PurchaseOrderFormService } from './purchase-order-form.service';

describe('PurchaseOrder Form Service', () => {
  let service: PurchaseOrderFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrderFormService);
  });

  describe('Service methods', () => {
    describe('createPurchaseOrderFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPurchaseOrderFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            purchaseOrderNumber: expect.any(Object),
            purchaseOrderDate: expect.any(Object),
            purchaseOrderAmount: expect.any(Object),
            description: expect.any(Object),
            notes: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            settlementCurrency: expect.any(Object),
            placeholders: expect.any(Object),
            signatories: expect.any(Object),
            vendor: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });

      it('passing IPurchaseOrder should create a new form with FormGroup', () => {
        const formGroup = service.createPurchaseOrderFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            purchaseOrderNumber: expect.any(Object),
            purchaseOrderDate: expect.any(Object),
            purchaseOrderAmount: expect.any(Object),
            description: expect.any(Object),
            notes: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            settlementCurrency: expect.any(Object),
            placeholders: expect.any(Object),
            signatories: expect.any(Object),
            vendor: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });
    });

    describe('getPurchaseOrder', () => {
      it('should return NewPurchaseOrder for default PurchaseOrder initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPurchaseOrderFormGroup(sampleWithNewData);

        const purchaseOrder = service.getPurchaseOrder(formGroup) as any;

        expect(purchaseOrder).toMatchObject(sampleWithNewData);
      });

      it('should return NewPurchaseOrder for empty PurchaseOrder initial value', () => {
        const formGroup = service.createPurchaseOrderFormGroup();

        const purchaseOrder = service.getPurchaseOrder(formGroup) as any;

        expect(purchaseOrder).toMatchObject({});
      });

      it('should return IPurchaseOrder', () => {
        const formGroup = service.createPurchaseOrderFormGroup(sampleWithRequiredData);

        const purchaseOrder = service.getPurchaseOrder(formGroup) as any;

        expect(purchaseOrder).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPurchaseOrder should not enable id FormControl', () => {
        const formGroup = service.createPurchaseOrderFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPurchaseOrder should disable id FormControl', () => {
        const formGroup = service.createPurchaseOrderFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
