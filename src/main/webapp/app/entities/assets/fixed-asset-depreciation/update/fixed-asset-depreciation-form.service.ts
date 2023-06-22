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

import { IFixedAssetDepreciation, NewFixedAssetDepreciation } from '../fixed-asset-depreciation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFixedAssetDepreciation for edit and NewFixedAssetDepreciationFormGroupInput for create.
 */
type FixedAssetDepreciationFormGroupInput = IFixedAssetDepreciation | PartialWithRequiredKeyOf<NewFixedAssetDepreciation>;

type FixedAssetDepreciationFormDefaults = Pick<NewFixedAssetDepreciation, 'id' | 'placeholders'>;

type FixedAssetDepreciationFormGroupContent = {
  id: FormControl<IFixedAssetDepreciation['id'] | NewFixedAssetDepreciation['id']>;
  assetNumber: FormControl<IFixedAssetDepreciation['assetNumber']>;
  serviceOutletCode: FormControl<IFixedAssetDepreciation['serviceOutletCode']>;
  assetTag: FormControl<IFixedAssetDepreciation['assetTag']>;
  assetDescription: FormControl<IFixedAssetDepreciation['assetDescription']>;
  depreciationDate: FormControl<IFixedAssetDepreciation['depreciationDate']>;
  assetCategory: FormControl<IFixedAssetDepreciation['assetCategory']>;
  depreciationAmount: FormControl<IFixedAssetDepreciation['depreciationAmount']>;
  depreciationRegime: FormControl<IFixedAssetDepreciation['depreciationRegime']>;
  fileUploadToken: FormControl<IFixedAssetDepreciation['fileUploadToken']>;
  compilationToken: FormControl<IFixedAssetDepreciation['compilationToken']>;
  placeholders: FormControl<IFixedAssetDepreciation['placeholders']>;
};

export type FixedAssetDepreciationFormGroup = FormGroup<FixedAssetDepreciationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FixedAssetDepreciationFormService {
  createFixedAssetDepreciationFormGroup(
    fixedAssetDepreciation: FixedAssetDepreciationFormGroupInput = { id: null }
  ): FixedAssetDepreciationFormGroup {
    const fixedAssetDepreciationRawValue = {
      ...this.getFormDefaults(),
      ...fixedAssetDepreciation,
    };
    return new FormGroup<FixedAssetDepreciationFormGroupContent>({
      id: new FormControl(
        { value: fixedAssetDepreciationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      assetNumber: new FormControl(fixedAssetDepreciationRawValue.assetNumber),
      serviceOutletCode: new FormControl(fixedAssetDepreciationRawValue.serviceOutletCode),
      assetTag: new FormControl(fixedAssetDepreciationRawValue.assetTag),
      assetDescription: new FormControl(fixedAssetDepreciationRawValue.assetDescription),
      depreciationDate: new FormControl(fixedAssetDepreciationRawValue.depreciationDate),
      assetCategory: new FormControl(fixedAssetDepreciationRawValue.assetCategory),
      depreciationAmount: new FormControl(fixedAssetDepreciationRawValue.depreciationAmount),
      depreciationRegime: new FormControl(fixedAssetDepreciationRawValue.depreciationRegime),
      fileUploadToken: new FormControl(fixedAssetDepreciationRawValue.fileUploadToken),
      compilationToken: new FormControl(fixedAssetDepreciationRawValue.compilationToken),
      placeholders: new FormControl(fixedAssetDepreciationRawValue.placeholders ?? []),
    });
  }

  getFixedAssetDepreciation(form: FixedAssetDepreciationFormGroup): IFixedAssetDepreciation | NewFixedAssetDepreciation {
    return form.getRawValue() as IFixedAssetDepreciation | NewFixedAssetDepreciation;
  }

  resetForm(form: FixedAssetDepreciationFormGroup, fixedAssetDepreciation: FixedAssetDepreciationFormGroupInput): void {
    const fixedAssetDepreciationRawValue = { ...this.getFormDefaults(), ...fixedAssetDepreciation };
    form.reset(
      {
        ...fixedAssetDepreciationRawValue,
        id: { value: fixedAssetDepreciationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FixedAssetDepreciationFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
