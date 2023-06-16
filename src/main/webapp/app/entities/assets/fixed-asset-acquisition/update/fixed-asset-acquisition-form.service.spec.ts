import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fixed-asset-acquisition.test-samples';

import { FixedAssetAcquisitionFormService } from './fixed-asset-acquisition-form.service';

describe('FixedAssetAcquisition Form Service', () => {
  let service: FixedAssetAcquisitionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedAssetAcquisitionFormService);
  });

  describe('Service methods', () => {
    describe('createFixedAssetAcquisitionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFixedAssetAcquisitionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetNumber: expect.any(Object),
            serviceOutletCode: expect.any(Object),
            assetTag: expect.any(Object),
            assetDescription: expect.any(Object),
            purchaseDate: expect.any(Object),
            assetCategory: expect.any(Object),
            purchasePrice: expect.any(Object),
            fileUploadToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IFixedAssetAcquisition should create a new form with FormGroup', () => {
        const formGroup = service.createFixedAssetAcquisitionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetNumber: expect.any(Object),
            serviceOutletCode: expect.any(Object),
            assetTag: expect.any(Object),
            assetDescription: expect.any(Object),
            purchaseDate: expect.any(Object),
            assetCategory: expect.any(Object),
            purchasePrice: expect.any(Object),
            fileUploadToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getFixedAssetAcquisition', () => {
      it('should return NewFixedAssetAcquisition for default FixedAssetAcquisition initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFixedAssetAcquisitionFormGroup(sampleWithNewData);

        const fixedAssetAcquisition = service.getFixedAssetAcquisition(formGroup) as any;

        expect(fixedAssetAcquisition).toMatchObject(sampleWithNewData);
      });

      it('should return NewFixedAssetAcquisition for empty FixedAssetAcquisition initial value', () => {
        const formGroup = service.createFixedAssetAcquisitionFormGroup();

        const fixedAssetAcquisition = service.getFixedAssetAcquisition(formGroup) as any;

        expect(fixedAssetAcquisition).toMatchObject({});
      });

      it('should return IFixedAssetAcquisition', () => {
        const formGroup = service.createFixedAssetAcquisitionFormGroup(sampleWithRequiredData);

        const fixedAssetAcquisition = service.getFixedAssetAcquisition(formGroup) as any;

        expect(fixedAssetAcquisition).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFixedAssetAcquisition should not enable id FormControl', () => {
        const formGroup = service.createFixedAssetAcquisitionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFixedAssetAcquisition should disable id FormControl', () => {
        const formGroup = service.createFixedAssetAcquisitionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
