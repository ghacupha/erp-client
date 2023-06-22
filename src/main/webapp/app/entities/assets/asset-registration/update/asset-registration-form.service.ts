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

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAssetRegistration, NewAssetRegistration } from '../asset-registration.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAssetRegistration for edit and NewAssetRegistrationFormGroupInput for create.
 */
type AssetRegistrationFormGroupInput = IAssetRegistration | PartialWithRequiredKeyOf<NewAssetRegistration>;

type AssetRegistrationFormDefaults = Pick<
  NewAssetRegistration,
  | 'id'
  | 'placeholders'
  | 'paymentInvoices'
  | 'settlements'
  | 'purchaseOrders'
  | 'deliveryNotes'
  | 'jobSheets'
  | 'designatedUsers'
  | 'businessDocuments'
  | 'assetWarranties'
  | 'universallyUniqueMappings'
  | 'assetAccessories'
  | 'serviceOutlets'
>;

type AssetRegistrationFormGroupContent = {
  id: FormControl<IAssetRegistration['id'] | NewAssetRegistration['id']>;
  assetNumber: FormControl<IAssetRegistration['assetNumber']>;
  assetTag: FormControl<IAssetRegistration['assetTag']>;
  assetDetails: FormControl<IAssetRegistration['assetDetails']>;
  assetCost: FormControl<IAssetRegistration['assetCost']>;
  comments: FormControl<IAssetRegistration['comments']>;
  commentsContentType: FormControl<IAssetRegistration['commentsContentType']>;
  modelNumber: FormControl<IAssetRegistration['modelNumber']>;
  serialNumber: FormControl<IAssetRegistration['serialNumber']>;
  placeholders: FormControl<IAssetRegistration['placeholders']>;
  paymentInvoices: FormControl<IAssetRegistration['paymentInvoices']>;
  mainServiceOutlet: FormControl<IAssetRegistration['mainServiceOutlet']>;
  settlements: FormControl<IAssetRegistration['settlements']>;
  assetCategory: FormControl<IAssetRegistration['assetCategory']>;
  purchaseOrders: FormControl<IAssetRegistration['purchaseOrders']>;
  deliveryNotes: FormControl<IAssetRegistration['deliveryNotes']>;
  jobSheets: FormControl<IAssetRegistration['jobSheets']>;
  dealer: FormControl<IAssetRegistration['dealer']>;
  designatedUsers: FormControl<IAssetRegistration['designatedUsers']>;
  settlementCurrency: FormControl<IAssetRegistration['settlementCurrency']>;
  businessDocuments: FormControl<IAssetRegistration['businessDocuments']>;
  assetWarranties: FormControl<IAssetRegistration['assetWarranties']>;
  universallyUniqueMappings: FormControl<IAssetRegistration['universallyUniqueMappings']>;
  assetAccessories: FormControl<IAssetRegistration['assetAccessories']>;
  serviceOutlets: FormControl<IAssetRegistration['serviceOutlets']>;
};

export type AssetRegistrationFormGroup = FormGroup<AssetRegistrationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssetRegistrationFormService {
  createAssetRegistrationFormGroup(assetRegistration: AssetRegistrationFormGroupInput = { id: null }): AssetRegistrationFormGroup {
    const assetRegistrationRawValue = {
      ...this.getFormDefaults(),
      ...assetRegistration,
    };
    return new FormGroup<AssetRegistrationFormGroupContent>({
      id: new FormControl(
        { value: assetRegistrationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      assetNumber: new FormControl(assetRegistrationRawValue.assetNumber, {
        validators: [Validators.required],
      }),
      assetTag: new FormControl(assetRegistrationRawValue.assetTag, {
        validators: [Validators.required],
      }),
      assetDetails: new FormControl(assetRegistrationRawValue.assetDetails),
      assetCost: new FormControl(assetRegistrationRawValue.assetCost, {
        validators: [Validators.required],
      }),
      comments: new FormControl(assetRegistrationRawValue.comments),
      commentsContentType: new FormControl(assetRegistrationRawValue.commentsContentType),
      modelNumber: new FormControl(assetRegistrationRawValue.modelNumber),
      serialNumber: new FormControl(assetRegistrationRawValue.serialNumber),
      placeholders: new FormControl(assetRegistrationRawValue.placeholders ?? []),
      paymentInvoices: new FormControl(assetRegistrationRawValue.paymentInvoices ?? []),
      mainServiceOutlet: new FormControl(assetRegistrationRawValue.mainServiceOutlet),
      settlements: new FormControl(assetRegistrationRawValue.settlements ?? []),
      assetCategory: new FormControl(assetRegistrationRawValue.assetCategory, {
        validators: [Validators.required],
      }),
      purchaseOrders: new FormControl(assetRegistrationRawValue.purchaseOrders ?? []),
      deliveryNotes: new FormControl(assetRegistrationRawValue.deliveryNotes ?? []),
      jobSheets: new FormControl(assetRegistrationRawValue.jobSheets ?? []),
      dealer: new FormControl(assetRegistrationRawValue.dealer, {
        validators: [Validators.required],
      }),
      designatedUsers: new FormControl(assetRegistrationRawValue.designatedUsers ?? []),
      settlementCurrency: new FormControl(assetRegistrationRawValue.settlementCurrency),
      businessDocuments: new FormControl(assetRegistrationRawValue.businessDocuments ?? []),
      assetWarranties: new FormControl(assetRegistrationRawValue.assetWarranties ?? []),
      universallyUniqueMappings: new FormControl(assetRegistrationRawValue.universallyUniqueMappings ?? []),
      assetAccessories: new FormControl(assetRegistrationRawValue.assetAccessories ?? []),
      serviceOutlets: new FormControl(assetRegistrationRawValue.serviceOutlets ?? []),
    });
  }

  getAssetRegistration(form: AssetRegistrationFormGroup): IAssetRegistration | NewAssetRegistration {
    return form.getRawValue() as IAssetRegistration | NewAssetRegistration;
  }

  resetForm(form: AssetRegistrationFormGroup, assetRegistration: AssetRegistrationFormGroupInput): void {
    const assetRegistrationRawValue = { ...this.getFormDefaults(), ...assetRegistration };
    form.reset(
      {
        ...assetRegistrationRawValue,
        id: { value: assetRegistrationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AssetRegistrationFormDefaults {
    return {
      id: null,
      placeholders: [],
      paymentInvoices: [],
      settlements: [],
      purchaseOrders: [],
      deliveryNotes: [],
      jobSheets: [],
      designatedUsers: [],
      businessDocuments: [],
      assetWarranties: [],
      universallyUniqueMappings: [],
      assetAccessories: [],
      serviceOutlets: [],
    };
  }
}
