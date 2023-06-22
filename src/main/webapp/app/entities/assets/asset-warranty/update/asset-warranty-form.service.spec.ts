import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../asset-warranty.test-samples';

import { AssetWarrantyFormService } from './asset-warranty-form.service';

describe('AssetWarranty Form Service', () => {
  let service: AssetWarrantyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetWarrantyFormService);
  });

  describe('Service methods', () => {
    describe('createAssetWarrantyFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAssetWarrantyFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetTag: expect.any(Object),
            description: expect.any(Object),
            modelNumber: expect.any(Object),
            serialNumber: expect.any(Object),
            expiryDate: expect.any(Object),
            placeholders: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
            dealer: expect.any(Object),
            warrantyAttachments: expect.any(Object),
          })
        );
      });

      it('passing IAssetWarranty should create a new form with FormGroup', () => {
        const formGroup = service.createAssetWarrantyFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetTag: expect.any(Object),
            description: expect.any(Object),
            modelNumber: expect.any(Object),
            serialNumber: expect.any(Object),
            expiryDate: expect.any(Object),
            placeholders: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
            dealer: expect.any(Object),
            warrantyAttachments: expect.any(Object),
          })
        );
      });
    });

    describe('getAssetWarranty', () => {
      it('should return NewAssetWarranty for default AssetWarranty initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAssetWarrantyFormGroup(sampleWithNewData);

        const assetWarranty = service.getAssetWarranty(formGroup) as any;

        expect(assetWarranty).toMatchObject(sampleWithNewData);
      });

      it('should return NewAssetWarranty for empty AssetWarranty initial value', () => {
        const formGroup = service.createAssetWarrantyFormGroup();

        const assetWarranty = service.getAssetWarranty(formGroup) as any;

        expect(assetWarranty).toMatchObject({});
      });

      it('should return IAssetWarranty', () => {
        const formGroup = service.createAssetWarrantyFormGroup(sampleWithRequiredData);

        const assetWarranty = service.getAssetWarranty(formGroup) as any;

        expect(assetWarranty).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAssetWarranty should not enable id FormControl', () => {
        const formGroup = service.createAssetWarrantyFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAssetWarranty should disable id FormControl', () => {
        const formGroup = service.createAssetWarrantyFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
