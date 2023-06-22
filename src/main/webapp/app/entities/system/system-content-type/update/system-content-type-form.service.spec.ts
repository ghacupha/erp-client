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

import { sampleWithRequiredData, sampleWithNewData } from '../system-content-type.test-samples';

import { SystemContentTypeFormService } from './system-content-type-form.service';

describe('SystemContentType Form Service', () => {
  let service: SystemContentTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemContentTypeFormService);
  });

  describe('Service methods', () => {
    describe('createSystemContentTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSystemContentTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contentTypeName: expect.any(Object),
            contentTypeHeader: expect.any(Object),
            comments: expect.any(Object),
            availability: expect.any(Object),
            placeholders: expect.any(Object),
            sysMaps: expect.any(Object),
          })
        );
      });

      it('passing ISystemContentType should create a new form with FormGroup', () => {
        const formGroup = service.createSystemContentTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contentTypeName: expect.any(Object),
            contentTypeHeader: expect.any(Object),
            comments: expect.any(Object),
            availability: expect.any(Object),
            placeholders: expect.any(Object),
            sysMaps: expect.any(Object),
          })
        );
      });
    });

    describe('getSystemContentType', () => {
      it('should return NewSystemContentType for default SystemContentType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSystemContentTypeFormGroup(sampleWithNewData);

        const systemContentType = service.getSystemContentType(formGroup) as any;

        expect(systemContentType).toMatchObject(sampleWithNewData);
      });

      it('should return NewSystemContentType for empty SystemContentType initial value', () => {
        const formGroup = service.createSystemContentTypeFormGroup();

        const systemContentType = service.getSystemContentType(formGroup) as any;

        expect(systemContentType).toMatchObject({});
      });

      it('should return ISystemContentType', () => {
        const formGroup = service.createSystemContentTypeFormGroup(sampleWithRequiredData);

        const systemContentType = service.getSystemContentType(formGroup) as any;

        expect(systemContentType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISystemContentType should not enable id FormControl', () => {
        const formGroup = service.createSystemContentTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSystemContentType should disable id FormControl', () => {
        const formGroup = service.createSystemContentTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
