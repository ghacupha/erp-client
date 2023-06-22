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

import { sampleWithRequiredData, sampleWithNewData } from '../system-module.test-samples';

import { SystemModuleFormService } from './system-module-form.service';

describe('SystemModule Form Service', () => {
  let service: SystemModuleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemModuleFormService);
  });

  describe('Service methods', () => {
    describe('createSystemModuleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSystemModuleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            moduleName: expect.any(Object),
          })
        );
      });

      it('passing ISystemModule should create a new form with FormGroup', () => {
        const formGroup = service.createSystemModuleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            moduleName: expect.any(Object),
          })
        );
      });
    });

    describe('getSystemModule', () => {
      it('should return NewSystemModule for default SystemModule initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSystemModuleFormGroup(sampleWithNewData);

        const systemModule = service.getSystemModule(formGroup) as any;

        expect(systemModule).toMatchObject(sampleWithNewData);
      });

      it('should return NewSystemModule for empty SystemModule initial value', () => {
        const formGroup = service.createSystemModuleFormGroup();

        const systemModule = service.getSystemModule(formGroup) as any;

        expect(systemModule).toMatchObject({});
      });

      it('should return ISystemModule', () => {
        const formGroup = service.createSystemModuleFormGroup(sampleWithRequiredData);

        const systemModule = service.getSystemModule(formGroup) as any;

        expect(systemModule).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISystemModule should not enable id FormControl', () => {
        const formGroup = service.createSystemModuleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSystemModule should disable id FormControl', () => {
        const formGroup = service.createSystemModuleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
