import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../asset-category.test-samples';

import { AssetCategoryFormService } from './asset-category-form.service';

describe('AssetCategory Form Service', () => {
  let service: AssetCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createAssetCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAssetCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetCategoryName: expect.any(Object),
            description: expect.any(Object),
            notes: expect.any(Object),
            remarks: expect.any(Object),
            depreciationMethod: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IAssetCategory should create a new form with FormGroup', () => {
        const formGroup = service.createAssetCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetCategoryName: expect.any(Object),
            description: expect.any(Object),
            notes: expect.any(Object),
            remarks: expect.any(Object),
            depreciationMethod: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getAssetCategory', () => {
      it('should return NewAssetCategory for default AssetCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAssetCategoryFormGroup(sampleWithNewData);

        const assetCategory = service.getAssetCategory(formGroup) as any;

        expect(assetCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewAssetCategory for empty AssetCategory initial value', () => {
        const formGroup = service.createAssetCategoryFormGroup();

        const assetCategory = service.getAssetCategory(formGroup) as any;

        expect(assetCategory).toMatchObject({});
      });

      it('should return IAssetCategory', () => {
        const formGroup = service.createAssetCategoryFormGroup(sampleWithRequiredData);

        const assetCategory = service.getAssetCategory(formGroup) as any;

        expect(assetCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAssetCategory should not enable id FormControl', () => {
        const formGroup = service.createAssetCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAssetCategory should disable id FormControl', () => {
        const formGroup = service.createAssetCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
