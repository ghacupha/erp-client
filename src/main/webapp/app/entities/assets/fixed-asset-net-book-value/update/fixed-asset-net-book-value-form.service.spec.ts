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

import { sampleWithRequiredData, sampleWithNewData } from '../fixed-asset-net-book-value.test-samples';

import { FixedAssetNetBookValueFormService } from './fixed-asset-net-book-value-form.service';

describe('FixedAssetNetBookValue Form Service', () => {
  let service: FixedAssetNetBookValueFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedAssetNetBookValueFormService);
  });

  describe('Service methods', () => {
    describe('createFixedAssetNetBookValueFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFixedAssetNetBookValueFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetNumber: expect.any(Object),
            serviceOutletCode: expect.any(Object),
            assetTag: expect.any(Object),
            assetDescription: expect.any(Object),
            netBookValueDate: expect.any(Object),
            assetCategory: expect.any(Object),
            netBookValue: expect.any(Object),
            depreciationRegime: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IFixedAssetNetBookValue should create a new form with FormGroup', () => {
        const formGroup = service.createFixedAssetNetBookValueFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetNumber: expect.any(Object),
            serviceOutletCode: expect.any(Object),
            assetTag: expect.any(Object),
            assetDescription: expect.any(Object),
            netBookValueDate: expect.any(Object),
            assetCategory: expect.any(Object),
            netBookValue: expect.any(Object),
            depreciationRegime: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getFixedAssetNetBookValue', () => {
      it('should return NewFixedAssetNetBookValue for default FixedAssetNetBookValue initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFixedAssetNetBookValueFormGroup(sampleWithNewData);

        const fixedAssetNetBookValue = service.getFixedAssetNetBookValue(formGroup) as any;

        expect(fixedAssetNetBookValue).toMatchObject(sampleWithNewData);
      });

      it('should return NewFixedAssetNetBookValue for empty FixedAssetNetBookValue initial value', () => {
        const formGroup = service.createFixedAssetNetBookValueFormGroup();

        const fixedAssetNetBookValue = service.getFixedAssetNetBookValue(formGroup) as any;

        expect(fixedAssetNetBookValue).toMatchObject({});
      });

      it('should return IFixedAssetNetBookValue', () => {
        const formGroup = service.createFixedAssetNetBookValueFormGroup(sampleWithRequiredData);

        const fixedAssetNetBookValue = service.getFixedAssetNetBookValue(formGroup) as any;

        expect(fixedAssetNetBookValue).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFixedAssetNetBookValue should not enable id FormControl', () => {
        const formGroup = service.createFixedAssetNetBookValueFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFixedAssetNetBookValue should disable id FormControl', () => {
        const formGroup = service.createFixedAssetNetBookValueFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
