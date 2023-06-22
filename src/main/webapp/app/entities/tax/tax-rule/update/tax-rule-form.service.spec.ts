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
