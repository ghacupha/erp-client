import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../algorithm.test-samples';

import { AlgorithmFormService } from './algorithm-form.service';

describe('Algorithm Form Service', () => {
  let service: AlgorithmFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmFormService);
  });

  describe('Service methods', () => {
    describe('createAlgorithmFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlgorithmFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
          })
        );
      });

      it('passing IAlgorithm should create a new form with FormGroup', () => {
        const formGroup = service.createAlgorithmFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            placeholders: expect.any(Object),
            parameters: expect.any(Object),
          })
        );
      });
    });

    describe('getAlgorithm', () => {
      it('should return NewAlgorithm for default Algorithm initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAlgorithmFormGroup(sampleWithNewData);

        const algorithm = service.getAlgorithm(formGroup) as any;

        expect(algorithm).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlgorithm for empty Algorithm initial value', () => {
        const formGroup = service.createAlgorithmFormGroup();

        const algorithm = service.getAlgorithm(formGroup) as any;

        expect(algorithm).toMatchObject({});
      });

      it('should return IAlgorithm', () => {
        const formGroup = service.createAlgorithmFormGroup(sampleWithRequiredData);

        const algorithm = service.getAlgorithm(formGroup) as any;

        expect(algorithm).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlgorithm should not enable id FormControl', () => {
        const formGroup = service.createAlgorithmFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlgorithm should disable id FormControl', () => {
        const formGroup = service.createAlgorithmFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
