import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../settlement.test-samples';

import { SettlementFormService } from './settlement-form.service';

describe('Settlement Form Service', () => {
  let service: SettlementFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettlementFormService);
  });

  describe('Service methods', () => {
    describe('createSettlementFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSettlementFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            paymentNumber: expect.any(Object),
            paymentDate: expect.any(Object),
            paymentAmount: expect.any(Object),
            description: expect.any(Object),
            notes: expect.any(Object),
            calculationFile: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            placeholders: expect.any(Object),
            settlementCurrency: expect.any(Object),
            paymentLabels: expect.any(Object),
            paymentCategory: expect.any(Object),
            groupSettlement: expect.any(Object),
            biller: expect.any(Object),
            paymentInvoices: expect.any(Object),
            signatories: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });

      it('passing ISettlement should create a new form with FormGroup', () => {
        const formGroup = service.createSettlementFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            paymentNumber: expect.any(Object),
            paymentDate: expect.any(Object),
            paymentAmount: expect.any(Object),
            description: expect.any(Object),
            notes: expect.any(Object),
            calculationFile: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            placeholders: expect.any(Object),
            settlementCurrency: expect.any(Object),
            paymentLabels: expect.any(Object),
            paymentCategory: expect.any(Object),
            groupSettlement: expect.any(Object),
            biller: expect.any(Object),
            paymentInvoices: expect.any(Object),
            signatories: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });
    });

    describe('getSettlement', () => {
      it('should return NewSettlement for default Settlement initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSettlementFormGroup(sampleWithNewData);

        const settlement = service.getSettlement(formGroup) as any;

        expect(settlement).toMatchObject(sampleWithNewData);
      });

      it('should return NewSettlement for empty Settlement initial value', () => {
        const formGroup = service.createSettlementFormGroup();

        const settlement = service.getSettlement(formGroup) as any;

        expect(settlement).toMatchObject({});
      });

      it('should return ISettlement', () => {
        const formGroup = service.createSettlementFormGroup(sampleWithRequiredData);

        const settlement = service.getSettlement(formGroup) as any;

        expect(settlement).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISettlement should not enable id FormControl', () => {
        const formGroup = service.createSettlementFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSettlement should disable id FormControl', () => {
        const formGroup = service.createSettlementFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
