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

import { sampleWithRequiredData, sampleWithNewData } from '../work-project-register.test-samples';

import { WorkProjectRegisterFormService } from './work-project-register-form.service';

describe('WorkProjectRegister Form Service', () => {
  let service: WorkProjectRegisterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkProjectRegisterFormService);
  });

  describe('Service methods', () => {
    describe('createWorkProjectRegisterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catalogueNumber: expect.any(Object),
            description: expect.any(Object),
            details: expect.any(Object),
            totalProjectCost: expect.any(Object),
            additionalNotes: expect.any(Object),
            dealers: expect.any(Object),
            settlementCurrency: expect.any(Object),
            placeholders: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });

      it('passing IWorkProjectRegister should create a new form with FormGroup', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            catalogueNumber: expect.any(Object),
            description: expect.any(Object),
            details: expect.any(Object),
            totalProjectCost: expect.any(Object),
            additionalNotes: expect.any(Object),
            dealers: expect.any(Object),
            settlementCurrency: expect.any(Object),
            placeholders: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });
    });

    describe('getWorkProjectRegister', () => {
      it('should return NewWorkProjectRegister for default WorkProjectRegister initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWorkProjectRegisterFormGroup(sampleWithNewData);

        const workProjectRegister = service.getWorkProjectRegister(formGroup) as any;

        expect(workProjectRegister).toMatchObject(sampleWithNewData);
      });

      it('should return NewWorkProjectRegister for empty WorkProjectRegister initial value', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup();

        const workProjectRegister = service.getWorkProjectRegister(formGroup) as any;

        expect(workProjectRegister).toMatchObject({});
      });

      it('should return IWorkProjectRegister', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup(sampleWithRequiredData);

        const workProjectRegister = service.getWorkProjectRegister(formGroup) as any;

        expect(workProjectRegister).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWorkProjectRegister should not enable id FormControl', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWorkProjectRegister should disable id FormControl', () => {
        const formGroup = service.createWorkProjectRegisterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
