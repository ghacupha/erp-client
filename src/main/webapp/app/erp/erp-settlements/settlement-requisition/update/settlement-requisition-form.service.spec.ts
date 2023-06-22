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

import { sampleWithRequiredData, sampleWithNewData } from '../settlement-requisition.test-samples';

import { SettlementRequisitionFormService } from './settlement-requisition-form.service';

describe('SettlementRequisition Form Service', () => {
  let service: SettlementRequisitionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettlementRequisitionFormService);
  });

  describe('Service methods', () => {
    describe('createSettlementRequisitionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSettlementRequisitionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            serialNumber: expect.any(Object),
            timeOfRequisition: expect.any(Object),
            requisitionNumber: expect.any(Object),
            paymentAmount: expect.any(Object),
            paymentStatus: expect.any(Object),
            settlementCurrency: expect.any(Object),
            currentOwner: expect.any(Object),
            nativeOwner: expect.any(Object),
            nativeDepartment: expect.any(Object),
            biller: expect.any(Object),
            paymentInvoices: expect.any(Object),
            deliveryNotes: expect.any(Object),
            jobSheets: expect.any(Object),
            signatures: expect.any(Object),
            businessDocuments: expect.any(Object),
            applicationMappings: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ISettlementRequisition should create a new form with FormGroup', () => {
        const formGroup = service.createSettlementRequisitionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            serialNumber: expect.any(Object),
            timeOfRequisition: expect.any(Object),
            requisitionNumber: expect.any(Object),
            paymentAmount: expect.any(Object),
            paymentStatus: expect.any(Object),
            settlementCurrency: expect.any(Object),
            currentOwner: expect.any(Object),
            nativeOwner: expect.any(Object),
            nativeDepartment: expect.any(Object),
            biller: expect.any(Object),
            paymentInvoices: expect.any(Object),
            deliveryNotes: expect.any(Object),
            jobSheets: expect.any(Object),
            signatures: expect.any(Object),
            businessDocuments: expect.any(Object),
            applicationMappings: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getSettlementRequisition', () => {
      it('should return NewSettlementRequisition for default SettlementRequisition initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSettlementRequisitionFormGroup(sampleWithNewData);

        const settlementRequisition = service.getSettlementRequisition(formGroup) as any;

        expect(settlementRequisition).toMatchObject(sampleWithNewData);
      });

      it('should return NewSettlementRequisition for empty SettlementRequisition initial value', () => {
        const formGroup = service.createSettlementRequisitionFormGroup();

        const settlementRequisition = service.getSettlementRequisition(formGroup) as any;

        expect(settlementRequisition).toMatchObject({});
      });

      it('should return ISettlementRequisition', () => {
        const formGroup = service.createSettlementRequisitionFormGroup(sampleWithRequiredData);

        const settlementRequisition = service.getSettlementRequisition(formGroup) as any;

        expect(settlementRequisition).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISettlementRequisition should not enable id FormControl', () => {
        const formGroup = service.createSettlementRequisitionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSettlementRequisition should disable id FormControl', () => {
        const formGroup = service.createSettlementRequisitionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
