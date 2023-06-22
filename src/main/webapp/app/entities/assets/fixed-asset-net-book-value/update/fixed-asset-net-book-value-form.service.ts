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

import { IFixedAssetNetBookValue, NewFixedAssetNetBookValue } from '../fixed-asset-net-book-value.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFixedAssetNetBookValue for edit and NewFixedAssetNetBookValueFormGroupInput for create.
 */
type FixedAssetNetBookValueFormGroupInput = IFixedAssetNetBookValue | PartialWithRequiredKeyOf<NewFixedAssetNetBookValue>;

type FixedAssetNetBookValueFormDefaults = Pick<NewFixedAssetNetBookValue, 'id' | 'placeholders'>;

type FixedAssetNetBookValueFormGroupContent = {
  id: FormControl<IFixedAssetNetBookValue['id'] | NewFixedAssetNetBookValue['id']>;
  assetNumber: FormControl<IFixedAssetNetBookValue['assetNumber']>;
  serviceOutletCode: FormControl<IFixedAssetNetBookValue['serviceOutletCode']>;
  assetTag: FormControl<IFixedAssetNetBookValue['assetTag']>;
  assetDescription: FormControl<IFixedAssetNetBookValue['assetDescription']>;
  netBookValueDate: FormControl<IFixedAssetNetBookValue['netBookValueDate']>;
  assetCategory: FormControl<IFixedAssetNetBookValue['assetCategory']>;
  netBookValue: FormControl<IFixedAssetNetBookValue['netBookValue']>;
  depreciationRegime: FormControl<IFixedAssetNetBookValue['depreciationRegime']>;
  fileUploadToken: FormControl<IFixedAssetNetBookValue['fileUploadToken']>;
  compilationToken: FormControl<IFixedAssetNetBookValue['compilationToken']>;
  placeholders: FormControl<IFixedAssetNetBookValue['placeholders']>;
};

export type FixedAssetNetBookValueFormGroup = FormGroup<FixedAssetNetBookValueFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FixedAssetNetBookValueFormService {
  createFixedAssetNetBookValueFormGroup(
    fixedAssetNetBookValue: FixedAssetNetBookValueFormGroupInput = { id: null }
  ): FixedAssetNetBookValueFormGroup {
    const fixedAssetNetBookValueRawValue = {
      ...this.getFormDefaults(),
      ...fixedAssetNetBookValue,
    };
    return new FormGroup<FixedAssetNetBookValueFormGroupContent>({
      id: new FormControl(
        { value: fixedAssetNetBookValueRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      assetNumber: new FormControl(fixedAssetNetBookValueRawValue.assetNumber),
      serviceOutletCode: new FormControl(fixedAssetNetBookValueRawValue.serviceOutletCode),
      assetTag: new FormControl(fixedAssetNetBookValueRawValue.assetTag),
      assetDescription: new FormControl(fixedAssetNetBookValueRawValue.assetDescription),
      netBookValueDate: new FormControl(fixedAssetNetBookValueRawValue.netBookValueDate),
      assetCategory: new FormControl(fixedAssetNetBookValueRawValue.assetCategory),
      netBookValue: new FormControl(fixedAssetNetBookValueRawValue.netBookValue),
      depreciationRegime: new FormControl(fixedAssetNetBookValueRawValue.depreciationRegime),
      fileUploadToken: new FormControl(fixedAssetNetBookValueRawValue.fileUploadToken),
      compilationToken: new FormControl(fixedAssetNetBookValueRawValue.compilationToken),
      placeholders: new FormControl(fixedAssetNetBookValueRawValue.placeholders ?? []),
    });
  }

  getFixedAssetNetBookValue(form: FixedAssetNetBookValueFormGroup): IFixedAssetNetBookValue | NewFixedAssetNetBookValue {
    return form.getRawValue() as IFixedAssetNetBookValue | NewFixedAssetNetBookValue;
  }

  resetForm(form: FixedAssetNetBookValueFormGroup, fixedAssetNetBookValue: FixedAssetNetBookValueFormGroupInput): void {
    const fixedAssetNetBookValueRawValue = { ...this.getFormDefaults(), ...fixedAssetNetBookValue };
    form.reset(
      {
        ...fixedAssetNetBookValueRawValue,
        id: { value: fixedAssetNetBookValueRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FixedAssetNetBookValueFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
