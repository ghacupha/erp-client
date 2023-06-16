import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../placeholder.test-samples';

import { PlaceholderFormService } from './placeholder-form.service';

describe('Placeholder Form Service', () => {
  let service: PlaceholderFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceholderFormService);
  });

  describe('Service methods', () => {
    describe('createPlaceholderFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPlaceholderFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            token: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            containingPlaceholder: expect.any(Object),
          })
        );
      });

      it('passing IPlaceholder should create a new form with FormGroup', () => {
        const formGroup = service.createPlaceholderFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            token: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            containingPlaceholder: expect.any(Object),
          })
        );
      });
    });

    describe('getPlaceholder', () => {
      it('should return NewPlaceholder for default Placeholder initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPlaceholderFormGroup(sampleWithNewData);

        const placeholder = service.getPlaceholder(formGroup) as any;

        expect(placeholder).toMatchObject(sampleWithNewData);
      });

      it('should return NewPlaceholder for empty Placeholder initial value', () => {
        const formGroup = service.createPlaceholderFormGroup();

        const placeholder = service.getPlaceholder(formGroup) as any;

        expect(placeholder).toMatchObject({});
      });

      it('should return IPlaceholder', () => {
        const formGroup = service.createPlaceholderFormGroup(sampleWithRequiredData);

        const placeholder = service.getPlaceholder(formGroup) as any;

        expect(placeholder).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPlaceholder should not enable id FormControl', () => {
        const formGroup = service.createPlaceholderFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPlaceholder should disable id FormControl', () => {
        const formGroup = service.createPlaceholderFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
