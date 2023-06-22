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
