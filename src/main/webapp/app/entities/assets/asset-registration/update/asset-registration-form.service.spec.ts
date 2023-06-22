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

import { sampleWithRequiredData, sampleWithNewData } from '../asset-registration.test-samples';

import { AssetRegistrationFormService } from './asset-registration-form.service';

describe('AssetRegistration Form Service', () => {
  let service: AssetRegistrationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetRegistrationFormService);
  });

  describe('Service methods', () => {
    describe('createAssetRegistrationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAssetRegistrationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetNumber: expect.any(Object),
            assetTag: expect.any(Object),
            assetDetails: expect.any(Object),
            assetCost: expect.any(Object),
            comments: expect.any(Object),
            modelNumber: expect.any(Object),
            serialNumber: expect.any(Object),
            placeholders: expect.any(Object),
            paymentInvoices: expect.any(Object),
            mainServiceOutlet: expect.any(Object),
            settlements: expect.any(Object),
            assetCategory: expect.any(Object),
            purchaseOrders: expect.any(Object),
            deliveryNotes: expect.any(Object),
            jobSheets: expect.any(Object),
            dealer: expect.any(Object),
            designatedUsers: expect.any(Object),
            settlementCurrency: expect.any(Object),
            businessDocuments: expect.any(Object),
            assetWarranties: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
            assetAccessories: expect.any(Object),
            serviceOutlets: expect.any(Object),
          })
        );
      });

      it('passing IAssetRegistration should create a new form with FormGroup', () => {
        const formGroup = service.createAssetRegistrationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assetNumber: expect.any(Object),
            assetTag: expect.any(Object),
            assetDetails: expect.any(Object),
            assetCost: expect.any(Object),
            comments: expect.any(Object),
            modelNumber: expect.any(Object),
            serialNumber: expect.any(Object),
            placeholders: expect.any(Object),
            paymentInvoices: expect.any(Object),
            mainServiceOutlet: expect.any(Object),
            settlements: expect.any(Object),
            assetCategory: expect.any(Object),
            purchaseOrders: expect.any(Object),
            deliveryNotes: expect.any(Object),
            jobSheets: expect.any(Object),
            dealer: expect.any(Object),
            designatedUsers: expect.any(Object),
            settlementCurrency: expect.any(Object),
            businessDocuments: expect.any(Object),
            assetWarranties: expect.any(Object),
            universallyUniqueMappings: expect.any(Object),
            assetAccessories: expect.any(Object),
            serviceOutlets: expect.any(Object),
          })
        );
      });
    });

    describe('getAssetRegistration', () => {
      it('should return NewAssetRegistration for default AssetRegistration initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAssetRegistrationFormGroup(sampleWithNewData);

        const assetRegistration = service.getAssetRegistration(formGroup) as any;

        expect(assetRegistration).toMatchObject(sampleWithNewData);
      });

      it('should return NewAssetRegistration for empty AssetRegistration initial value', () => {
        const formGroup = service.createAssetRegistrationFormGroup();

        const assetRegistration = service.getAssetRegistration(formGroup) as any;

        expect(assetRegistration).toMatchObject({});
      });

      it('should return IAssetRegistration', () => {
        const formGroup = service.createAssetRegistrationFormGroup(sampleWithRequiredData);

        const assetRegistration = service.getAssetRegistration(formGroup) as any;

        expect(assetRegistration).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAssetRegistration should not enable id FormControl', () => {
        const formGroup = service.createAssetRegistrationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAssetRegistration should disable id FormControl', () => {
        const formGroup = service.createAssetRegistrationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
