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

import { IAssetWarranty, NewAssetWarranty } from '../asset-warranty.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAssetWarranty for edit and NewAssetWarrantyFormGroupInput for create.
 */
type AssetWarrantyFormGroupInput = IAssetWarranty | PartialWithRequiredKeyOf<NewAssetWarranty>;

type AssetWarrantyFormDefaults = Pick<NewAssetWarranty, 'id' | 'placeholders' | 'universallyUniqueMappings' | 'warrantyAttachments'>;

type AssetWarrantyFormGroupContent = {
  id: FormControl<IAssetWarranty['id'] | NewAssetWarranty['id']>;
  assetTag: FormControl<IAssetWarranty['assetTag']>;
  description: FormControl<IAssetWarranty['description']>;
  modelNumber: FormControl<IAssetWarranty['modelNumber']>;
  serialNumber: FormControl<IAssetWarranty['serialNumber']>;
  expiryDate: FormControl<IAssetWarranty['expiryDate']>;
  placeholders: FormControl<IAssetWarranty['placeholders']>;
  universallyUniqueMappings: FormControl<IAssetWarranty['universallyUniqueMappings']>;
  dealer: FormControl<IAssetWarranty['dealer']>;
  warrantyAttachments: FormControl<IAssetWarranty['warrantyAttachments']>;
};

export type AssetWarrantyFormGroup = FormGroup<AssetWarrantyFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssetWarrantyFormService {
  createAssetWarrantyFormGroup(assetWarranty: AssetWarrantyFormGroupInput = { id: null }): AssetWarrantyFormGroup {
    const assetWarrantyRawValue = {
      ...this.getFormDefaults(),
      ...assetWarranty,
    };
    return new FormGroup<AssetWarrantyFormGroupContent>({
      id: new FormControl(
        { value: assetWarrantyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      assetTag: new FormControl(assetWarrantyRawValue.assetTag),
      description: new FormControl(assetWarrantyRawValue.description),
      modelNumber: new FormControl(assetWarrantyRawValue.modelNumber),
      serialNumber: new FormControl(assetWarrantyRawValue.serialNumber),
      expiryDate: new FormControl(assetWarrantyRawValue.expiryDate),
      placeholders: new FormControl(assetWarrantyRawValue.placeholders ?? []),
      universallyUniqueMappings: new FormControl(assetWarrantyRawValue.universallyUniqueMappings ?? []),
      dealer: new FormControl(assetWarrantyRawValue.dealer, {
        validators: [Validators.required],
      }),
      warrantyAttachments: new FormControl(assetWarrantyRawValue.warrantyAttachments ?? []),
    });
  }

  getAssetWarranty(form: AssetWarrantyFormGroup): IAssetWarranty | NewAssetWarranty {
    return form.getRawValue() as IAssetWarranty | NewAssetWarranty;
  }

  resetForm(form: AssetWarrantyFormGroup, assetWarranty: AssetWarrantyFormGroupInput): void {
    const assetWarrantyRawValue = { ...this.getFormDefaults(), ...assetWarranty };
    form.reset(
      {
        ...assetWarrantyRawValue,
        id: { value: assetWarrantyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AssetWarrantyFormDefaults {
    return {
      id: null,
      placeholders: [],
      universallyUniqueMappings: [],
      warrantyAttachments: [],
    };
  }
}
