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

import { sampleWithRequiredData, sampleWithNewData } from '../fixed-asset-depreciation.test-samples';

import { FixedAssetDepreciationFormService } from './fixed-asset-depreciation-form.service';

describe('FixedAssetDepreciation Form Service', () => {
  let service: FixedAssetDepreciationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedAssetDepreciationFormService);
  });

  describe('Service methods', () => {
    describe('createFixedAssetDepreciationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFixedAssetDepreciationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetNumber: expect.any(Object),
            serviceOutletCode: expect.any(Object),
            assetTag: expect.any(Object),
            assetDescription: expect.any(Object),
            depreciationDate: expect.any(Object),
            assetCategory: expect.any(Object),
            depreciationAmount: expect.any(Object),
            depreciationRegime: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IFixedAssetDepreciation should create a new form with FormGroup', () => {
        const formGroup = service.createFixedAssetDepreciationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetNumber: expect.any(Object),
            serviceOutletCode: expect.any(Object),
            assetTag: expect.any(Object),
            assetDescription: expect.any(Object),
            depreciationDate: expect.any(Object),
            assetCategory: expect.any(Object),
            depreciationAmount: expect.any(Object),
            depreciationRegime: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getFixedAssetDepreciation', () => {
      it('should return NewFixedAssetDepreciation for default FixedAssetDepreciation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFixedAssetDepreciationFormGroup(sampleWithNewData);

        const fixedAssetDepreciation = service.getFixedAssetDepreciation(formGroup) as any;

        expect(fixedAssetDepreciation).toMatchObject(sampleWithNewData);
      });

      it('should return NewFixedAssetDepreciation for empty FixedAssetDepreciation initial value', () => {
        const formGroup = service.createFixedAssetDepreciationFormGroup();

        const fixedAssetDepreciation = service.getFixedAssetDepreciation(formGroup) as any;

        expect(fixedAssetDepreciation).toMatchObject({});
      });

      it('should return IFixedAssetDepreciation', () => {
        const formGroup = service.createFixedAssetDepreciationFormGroup(sampleWithRequiredData);

        const fixedAssetDepreciation = service.getFixedAssetDepreciation(formGroup) as any;

        expect(fixedAssetDepreciation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFixedAssetDepreciation should not enable id FormControl', () => {
        const formGroup = service.createFixedAssetDepreciationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFixedAssetDepreciation should disable id FormControl', () => {
        const formGroup = service.createFixedAssetDepreciationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
