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

import { sampleWithRequiredData, sampleWithNewData } from '../lease-contract.test-samples';

import { LeaseContractFormService } from './lease-contract-form.service';

describe('LeaseContract Form Service', () => {
  let service: LeaseContractFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaseContractFormService);
  });

  describe('Service methods', () => {
    describe('createLeaseContractFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLeaseContractFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bookingId: expect.any(Object),
            leaseTitle: expect.any(Object),
            identifier: expect.any(Object),
            description: expect.any(Object),
            commencementDate: expect.any(Object),
            terminalDate: expect.any(Object),
            placeholders: expect.any(Object),
            systemMappings: expect.any(Object),
            businessDocuments: expect.any(Object),
            contractMetadata: expect.any(Object),
          })
        );
      });

      it('passing ILeaseContract should create a new form with FormGroup', () => {
        const formGroup = service.createLeaseContractFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bookingId: expect.any(Object),
            leaseTitle: expect.any(Object),
            identifier: expect.any(Object),
            description: expect.any(Object),
            commencementDate: expect.any(Object),
            terminalDate: expect.any(Object),
            placeholders: expect.any(Object),
            systemMappings: expect.any(Object),
            businessDocuments: expect.any(Object),
            contractMetadata: expect.any(Object),
          })
        );
      });
    });

    describe('getLeaseContract', () => {
      it('should return NewLeaseContract for default LeaseContract initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLeaseContractFormGroup(sampleWithNewData);

        const leaseContract = service.getLeaseContract(formGroup) as any;

        expect(leaseContract).toMatchObject(sampleWithNewData);
      });

      it('should return NewLeaseContract for empty LeaseContract initial value', () => {
        const formGroup = service.createLeaseContractFormGroup();

        const leaseContract = service.getLeaseContract(formGroup) as any;

        expect(leaseContract).toMatchObject({});
      });

      it('should return ILeaseContract', () => {
        const formGroup = service.createLeaseContractFormGroup(sampleWithRequiredData);

        const leaseContract = service.getLeaseContract(formGroup) as any;

        expect(leaseContract).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILeaseContract should not enable id FormControl', () => {
        const formGroup = service.createLeaseContractFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLeaseContract should disable id FormControl', () => {
        const formGroup = service.createLeaseContractFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
