import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../asset-accessory.test-samples';

import { AssetAccessoryFormService } from './asset-accessory-form.service';

describe('AssetAccessory Form Service', () => {
  let service: AssetAccessoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetAccessoryFormService);
  });

  describe('Service methods', () => {
    describe('createAssetAccessoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAssetAccessoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetTag: expect.any(Object),
            assetDetails: expect.any(Object),
            comments: expect.any(Object),
            modelNumber: expect.any(Object),
            serialNumber: expect.any(Object),
            assetWarranties: expect.any(Object),
            placeholders: expect.any(Object),
            paymentInvoices: expect.any(Object),
            serviceOutlet: expect.any(Object),
            settlements: expect.any(Object),
            assetCategory: expect.any(Object),
            purchaseOrders: expect.any(Object),
            deliveryNotes: expect.any(Object),
            jobSheets: expect.any(Object),
            dealer: expect.any(Object),
            designatedUsers: expect.any(Object),
            businessDocuments: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
          })
        );
      });

      it('passing IAssetAccessory should create a new form with FormGroup', () => {
        const formGroup = service.createAssetAccessoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetTag: expect.any(Object),
            assetDetails: expect.any(Object),
            comments: expect.any(Object),
            modelNumber: expect.any(Object),
            serialNumber: expect.any(Object),
            assetWarranties: expect.any(Object),
            placeholders: expect.any(Object),
            paymentInvoices: expect.any(Object),
            serviceOutlet: expect.any(Object),
            settlements: expect.any(Object),
            assetCategory: expect.any(Object),
            purchaseOrders: expect.any(Object),
            deliveryNotes: expect.any(Object),
            jobSheets: expect.any(Object),
            dealer: expect.any(Object),
            designatedUsers: expect.any(Object),
            businessDocuments: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
          })
        );
      });
    });

    describe('getAssetAccessory', () => {
      it('should return NewAssetAccessory for default AssetAccessory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAssetAccessoryFormGroup(sampleWithNewData);

        const assetAccessory = service.getAssetAccessory(formGroup) as any;

        expect(assetAccessory).toMatchObject(sampleWithNewData);
      });

      it('should return NewAssetAccessory for empty AssetAccessory initial value', () => {
        const formGroup = service.createAssetAccessoryFormGroup();

        const assetAccessory = service.getAssetAccessory(formGroup) as any;

        expect(assetAccessory).toMatchObject({});
      });

      it('should return IAssetAccessory', () => {
        const formGroup = service.createAssetAccessoryFormGroup(sampleWithRequiredData);

        const assetAccessory = service.getAssetAccessory(formGroup) as any;

        expect(assetAccessory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAssetAccessory should not enable id FormControl', () => {
        const formGroup = service.createAssetAccessoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAssetAccessory should disable id FormControl', () => {
        const formGroup = service.createAssetAccessoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
