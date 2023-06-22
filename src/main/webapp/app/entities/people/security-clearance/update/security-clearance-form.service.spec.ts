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

import { sampleWithRequiredData, sampleWithNewData } from '../security-clearance.test-samples';

import { SecurityClearanceFormService } from './security-clearance-form.service';

describe('SecurityClearance Form Service', () => {
  let service: SecurityClearanceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityClearanceFormService);
  });

  describe('Service methods', () => {
    describe('createSecurityClearanceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSecurityClearanceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            clearanceLevel: expect.any(Object),
            grantedClearances: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ISecurityClearance should create a new form with FormGroup', () => {
        const formGroup = service.createSecurityClearanceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            clearanceLevel: expect.any(Object),
            grantedClearances: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getSecurityClearance', () => {
      it('should return NewSecurityClearance for default SecurityClearance initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSecurityClearanceFormGroup(sampleWithNewData);

        const securityClearance = service.getSecurityClearance(formGroup) as any;

        expect(securityClearance).toMatchObject(sampleWithNewData);
      });

      it('should return NewSecurityClearance for empty SecurityClearance initial value', () => {
        const formGroup = service.createSecurityClearanceFormGroup();

        const securityClearance = service.getSecurityClearance(formGroup) as any;

        expect(securityClearance).toMatchObject({});
      });

      it('should return ISecurityClearance', () => {
        const formGroup = service.createSecurityClearanceFormGroup(sampleWithRequiredData);

        const securityClearance = service.getSecurityClearance(formGroup) as any;

        expect(securityClearance).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISecurityClearance should not enable id FormControl', () => {
        const formGroup = service.createSecurityClearanceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSecurityClearance should disable id FormControl', () => {
        const formGroup = service.createSecurityClearanceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
