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

import { sampleWithRequiredData, sampleWithNewData } from '../tax-reference.test-samples';

import { TaxReferenceFormService } from './tax-reference-form.service';

describe('TaxReference Form Service', () => {
  let service: TaxReferenceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxReferenceFormService);
  });

  describe('Service methods', () => {
    describe('createTaxReferenceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaxReferenceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            taxName: expect.any(Object),
            taxDescription: expect.any(Object),
            taxPercentage: expect.any(Object),
            taxReferenceType: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ITaxReference should create a new form with FormGroup', () => {
        const formGroup = service.createTaxReferenceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            taxName: expect.any(Object),
            taxDescription: expect.any(Object),
            taxPercentage: expect.any(Object),
            taxReferenceType: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getTaxReference', () => {
      it('should return NewTaxReference for default TaxReference initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTaxReferenceFormGroup(sampleWithNewData);

        const taxReference = service.getTaxReference(formGroup) as any;

        expect(taxReference).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaxReference for empty TaxReference initial value', () => {
        const formGroup = service.createTaxReferenceFormGroup();

        const taxReference = service.getTaxReference(formGroup) as any;

        expect(taxReference).toMatchObject({});
      });

      it('should return ITaxReference', () => {
        const formGroup = service.createTaxReferenceFormGroup(sampleWithRequiredData);

        const taxReference = service.getTaxReference(formGroup) as any;

        expect(taxReference).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaxReference should not enable id FormControl', () => {
        const formGroup = service.createTaxReferenceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaxReference should disable id FormControl', () => {
        const formGroup = service.createTaxReferenceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
