import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../prepayment-marshalling.test-samples';

import { PrepaymentMarshallingFormService } from './prepayment-marshalling-form.service';

describe('PrepaymentMarshalling Form Service', () => {
  let service: PrepaymentMarshallingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepaymentMarshallingFormService);
  });

  describe('Service methods', () => {
    describe('createPrepaymentMarshallingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            inactive: expect.any(Object),
            amortizationCommencementDate: expect.any(Object),
            amortizationPeriods: expect.any(Object),
            prepaymentAccount: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IPrepaymentMarshalling should create a new form with FormGroup', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            inactive: expect.any(Object),
            amortizationCommencementDate: expect.any(Object),
            amortizationPeriods: expect.any(Object),
            prepaymentAccount: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getPrepaymentMarshalling', () => {
      it('should return NewPrepaymentMarshalling for default PrepaymentMarshalling initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPrepaymentMarshallingFormGroup(sampleWithNewData);

        const prepaymentMarshalling = service.getPrepaymentMarshalling(formGroup) as any;

        expect(prepaymentMarshalling).toMatchObject(sampleWithNewData);
      });

      it('should return NewPrepaymentMarshalling for empty PrepaymentMarshalling initial value', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup();

        const prepaymentMarshalling = service.getPrepaymentMarshalling(formGroup) as any;

        expect(prepaymentMarshalling).toMatchObject({});
      });

      it('should return IPrepaymentMarshalling', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup(sampleWithRequiredData);

        const prepaymentMarshalling = service.getPrepaymentMarshalling(formGroup) as any;

        expect(prepaymentMarshalling).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPrepaymentMarshalling should not enable id FormControl', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPrepaymentMarshalling should disable id FormControl', () => {
        const formGroup = service.createPrepaymentMarshallingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
