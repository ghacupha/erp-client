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

import { IAssetAccessory, NewAssetAccessory } from '../asset-accessory.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAssetAccessory for edit and NewAssetAccessoryFormGroupInput for create.
 */
type AssetAccessoryFormGroupInput = IAssetAccessory | PartialWithRequiredKeyOf<NewAssetAccessory>;

type AssetAccessoryFormDefaults = Pick<
  NewAssetAccessory,
  | 'id'
  | 'assetWarranties'
  | 'placeholders'
  | 'paymentInvoices'
  | 'settlements'
  | 'purchaseOrders'
  | 'deliveryNotes'
  | 'jobSheets'
  | 'designatedUsers'
  | 'businessDocuments'
  | 'universallyUniqueMappings'
>;

type AssetAccessoryFormGroupContent = {
  id: FormControl<IAssetAccessory['id'] | NewAssetAccessory['id']>;
  assetTag: FormControl<IAssetAccessory['assetTag']>;
  assetDetails: FormControl<IAssetAccessory['assetDetails']>;
  comments: FormControl<IAssetAccessory['comments']>;
  commentsContentType: FormControl<IAssetAccessory['commentsContentType']>;
  modelNumber: FormControl<IAssetAccessory['modelNumber']>;
  serialNumber: FormControl<IAssetAccessory['serialNumber']>;
  assetWarranties: FormControl<IAssetAccessory['assetWarranties']>;
  placeholders: FormControl<IAssetAccessory['placeholders']>;
  paymentInvoices: FormControl<IAssetAccessory['paymentInvoices']>;
  serviceOutlet: FormControl<IAssetAccessory['serviceOutlet']>;
  settlements: FormControl<IAssetAccessory['settlements']>;
  assetCategory: FormControl<IAssetAccessory['assetCategory']>;
  purchaseOrders: FormControl<IAssetAccessory['purchaseOrders']>;
  deliveryNotes: FormControl<IAssetAccessory['deliveryNotes']>;
  jobSheets: FormControl<IAssetAccessory['jobSheets']>;
  dealer: FormControl<IAssetAccessory['dealer']>;
  designatedUsers: FormControl<IAssetAccessory['designatedUsers']>;
  businessDocuments: FormControl<IAssetAccessory['businessDocuments']>;
  universallyUniqueMappings: FormControl<IAssetAccessory['universallyUniqueMappings']>;
};

export type AssetAccessoryFormGroup = FormGroup<AssetAccessoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssetAccessoryFormService {
  createAssetAccessoryFormGroup(assetAccessory: AssetAccessoryFormGroupInput = { id: null }): AssetAccessoryFormGroup {
    const assetAccessoryRawValue = {
      ...this.getFormDefaults(),
      ...assetAccessory,
    };
    return new FormGroup<AssetAccessoryFormGroupContent>({
      id: new FormControl(
        { value: assetAccessoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      assetTag: new FormControl(assetAccessoryRawValue.assetTag),
      assetDetails: new FormControl(assetAccessoryRawValue.assetDetails),
      comments: new FormControl(assetAccessoryRawValue.comments),
      commentsContentType: new FormControl(assetAccessoryRawValue.commentsContentType),
      modelNumber: new FormControl(assetAccessoryRawValue.modelNumber),
      serialNumber: new FormControl(assetAccessoryRawValue.serialNumber),
      assetWarranties: new FormControl(assetAccessoryRawValue.assetWarranties ?? []),
      placeholders: new FormControl(assetAccessoryRawValue.placeholders ?? []),
      paymentInvoices: new FormControl(assetAccessoryRawValue.paymentInvoices ?? []),
      serviceOutlet: new FormControl(assetAccessoryRawValue.serviceOutlet, {
        validators: [Validators.required],
      }),
      settlements: new FormControl(assetAccessoryRawValue.settlements ?? []),
      assetCategory: new FormControl(assetAccessoryRawValue.assetCategory, {
        validators: [Validators.required],
      }),
      purchaseOrders: new FormControl(assetAccessoryRawValue.purchaseOrders ?? []),
      deliveryNotes: new FormControl(assetAccessoryRawValue.deliveryNotes ?? []),
      jobSheets: new FormControl(assetAccessoryRawValue.jobSheets ?? []),
      dealer: new FormControl(assetAccessoryRawValue.dealer, {
        validators: [Validators.required],
      }),
      designatedUsers: new FormControl(assetAccessoryRawValue.designatedUsers ?? []),
      businessDocuments: new FormControl(assetAccessoryRawValue.businessDocuments ?? []),
      universallyUniqueMappings: new FormControl(assetAccessoryRawValue.universallyUniqueMappings ?? []),
    });
  }

  getAssetAccessory(form: AssetAccessoryFormGroup): IAssetAccessory | NewAssetAccessory {
    return form.getRawValue() as IAssetAccessory | NewAssetAccessory;
  }

  resetForm(form: AssetAccessoryFormGroup, assetAccessory: AssetAccessoryFormGroupInput): void {
    const assetAccessoryRawValue = { ...this.getFormDefaults(), ...assetAccessory };
    form.reset(
      {
        ...assetAccessoryRawValue,
        id: { value: assetAccessoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AssetAccessoryFormDefaults {
    return {
      id: null,
      assetWarranties: [],
      placeholders: [],
      paymentInvoices: [],
      settlements: [],
      purchaseOrders: [],
      deliveryNotes: [],
      jobSheets: [],
      designatedUsers: [],
      businessDocuments: [],
      universallyUniqueMappings: [],
    };
  }
}
