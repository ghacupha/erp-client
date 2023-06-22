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

import { sampleWithRequiredData, sampleWithNewData } from '../tax-rule.test-samples';

import { TaxRuleFormService } from './tax-rule-form.service';

describe('TaxRule Form Service', () => {
  let service: TaxRuleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxRuleFormService);
  });

  describe('Service methods', () => {
    describe('createTaxRuleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaxRuleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            telcoExciseDuty: expect.any(Object),
            valueAddedTax: expect.any(Object),
            withholdingVAT: expect.any(Object),
            withholdingTaxConsultancy: expect.any(Object),
            withholdingTaxRent: expect.any(Object),
            cateringLevy: expect.any(Object),
            serviceCharge: expect.any(Object),
            withholdingTaxImportedService: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ITaxRule should create a new form with FormGroup', () => {
        const formGroup = service.createTaxRuleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            telcoExciseDuty: expect.any(Object),
            valueAddedTax: expect.any(Object),
            withholdingVAT: expect.any(Object),
            withholdingTaxConsultancy: expect.any(Object),
            withholdingTaxRent: expect.any(Object),
            cateringLevy: expect.any(Object),
            serviceCharge: expect.any(Object),
            withholdingTaxImportedService: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getTaxRule', () => {
      it('should return NewTaxRule for default TaxRule initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTaxRuleFormGroup(sampleWithNewData);

        const taxRule = service.getTaxRule(formGroup) as any;

        expect(taxRule).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaxRule for empty TaxRule initial value', () => {
        const formGroup = service.createTaxRuleFormGroup();

        const taxRule = service.getTaxRule(formGroup) as any;

        expect(taxRule).toMatchObject({});
      });

      it('should return ITaxRule', () => {
        const formGroup = service.createTaxRuleFormGroup(sampleWithRequiredData);

        const taxRule = service.getTaxRule(formGroup) as any;

        expect(taxRule).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaxRule should not enable id FormControl', () => {
        const formGroup = service.createTaxRuleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaxRule should disable id FormControl', () => {
        const formGroup = service.createTaxRuleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
