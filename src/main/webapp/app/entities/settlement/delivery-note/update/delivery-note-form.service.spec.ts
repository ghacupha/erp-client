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

import { sampleWithRequiredData, sampleWithNewData } from '../delivery-note.test-samples';

import { DeliveryNoteFormService } from './delivery-note-form.service';

describe('DeliveryNote Form Service', () => {
  let service: DeliveryNoteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryNoteFormService);
  });

  describe('Service methods', () => {
    describe('createDeliveryNoteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDeliveryNoteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            deliveryNoteNumber: expect.any(Object),
            documentDate: expect.any(Object),
            description: expect.any(Object),
            serialNumber: expect.any(Object),
            quantity: expect.any(Object),
            remarks: expect.any(Object),
            placeholders: expect.any(Object),
            receivedBy: expect.any(Object),
            deliveryStamps: expect.any(Object),
            purchaseOrder: expect.any(Object),
            supplier: expect.any(Object),
            signatories: expect.any(Object),
            otherPurchaseOrders: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });

      it('passing IDeliveryNote should create a new form with FormGroup', () => {
        const formGroup = service.createDeliveryNoteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            deliveryNoteNumber: expect.any(Object),
            documentDate: expect.any(Object),
            description: expect.any(Object),
            serialNumber: expect.any(Object),
            quantity: expect.any(Object),
            remarks: expect.any(Object),
            placeholders: expect.any(Object),
            receivedBy: expect.any(Object),
            deliveryStamps: expect.any(Object),
            purchaseOrder: expect.any(Object),
            supplier: expect.any(Object),
            signatories: expect.any(Object),
            otherPurchaseOrders: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });
    });

    describe('getDeliveryNote', () => {
      it('should return NewDeliveryNote for default DeliveryNote initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDeliveryNoteFormGroup(sampleWithNewData);

        const deliveryNote = service.getDeliveryNote(formGroup) as any;

        expect(deliveryNote).toMatchObject(sampleWithNewData);
      });

      it('should return NewDeliveryNote for empty DeliveryNote initial value', () => {
        const formGroup = service.createDeliveryNoteFormGroup();

        const deliveryNote = service.getDeliveryNote(formGroup) as any;

        expect(deliveryNote).toMatchObject({});
      });

      it('should return IDeliveryNote', () => {
        const formGroup = service.createDeliveryNoteFormGroup(sampleWithRequiredData);

        const deliveryNote = service.getDeliveryNote(formGroup) as any;

        expect(deliveryNote).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDeliveryNote should not enable id FormControl', () => {
        const formGroup = service.createDeliveryNoteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDeliveryNote should disable id FormControl', () => {
        const formGroup = service.createDeliveryNoteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
