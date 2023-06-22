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

import { IFixedAssetAcquisition, NewFixedAssetAcquisition } from '../fixed-asset-acquisition.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFixedAssetAcquisition for edit and NewFixedAssetAcquisitionFormGroupInput for create.
 */
type FixedAssetAcquisitionFormGroupInput = IFixedAssetAcquisition | PartialWithRequiredKeyOf<NewFixedAssetAcquisition>;

type FixedAssetAcquisitionFormDefaults = Pick<NewFixedAssetAcquisition, 'id' | 'placeholders'>;

type FixedAssetAcquisitionFormGroupContent = {
  id: FormControl<IFixedAssetAcquisition['id'] | NewFixedAssetAcquisition['id']>;
  assetNumber: FormControl<IFixedAssetAcquisition['assetNumber']>;
  serviceOutletCode: FormControl<IFixedAssetAcquisition['serviceOutletCode']>;
  assetTag: FormControl<IFixedAssetAcquisition['assetTag']>;
  assetDescription: FormControl<IFixedAssetAcquisition['assetDescription']>;
  purchaseDate: FormControl<IFixedAssetAcquisition['purchaseDate']>;
  assetCategory: FormControl<IFixedAssetAcquisition['assetCategory']>;
  purchasePrice: FormControl<IFixedAssetAcquisition['purchasePrice']>;
  fileUploadToken: FormControl<IFixedAssetAcquisition['fileUploadToken']>;
  placeholders: FormControl<IFixedAssetAcquisition['placeholders']>;
};

export type FixedAssetAcquisitionFormGroup = FormGroup<FixedAssetAcquisitionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FixedAssetAcquisitionFormService {
  createFixedAssetAcquisitionFormGroup(
    fixedAssetAcquisition: FixedAssetAcquisitionFormGroupInput = { id: null }
  ): FixedAssetAcquisitionFormGroup {
    const fixedAssetAcquisitionRawValue = {
      ...this.getFormDefaults(),
      ...fixedAssetAcquisition,
    };
    return new FormGroup<FixedAssetAcquisitionFormGroupContent>({
      id: new FormControl(
        { value: fixedAssetAcquisitionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      assetNumber: new FormControl(fixedAssetAcquisitionRawValue.assetNumber),
      serviceOutletCode: new FormControl(fixedAssetAcquisitionRawValue.serviceOutletCode),
      assetTag: new FormControl(fixedAssetAcquisitionRawValue.assetTag),
      assetDescription: new FormControl(fixedAssetAcquisitionRawValue.assetDescription),
      purchaseDate: new FormControl(fixedAssetAcquisitionRawValue.purchaseDate),
      assetCategory: new FormControl(fixedAssetAcquisitionRawValue.assetCategory),
      purchasePrice: new FormControl(fixedAssetAcquisitionRawValue.purchasePrice),
      fileUploadToken: new FormControl(fixedAssetAcquisitionRawValue.fileUploadToken),
      placeholders: new FormControl(fixedAssetAcquisitionRawValue.placeholders ?? []),
    });
  }

  getFixedAssetAcquisition(form: FixedAssetAcquisitionFormGroup): IFixedAssetAcquisition | NewFixedAssetAcquisition {
    return form.getRawValue() as IFixedAssetAcquisition | NewFixedAssetAcquisition;
  }

  resetForm(form: FixedAssetAcquisitionFormGroup, fixedAssetAcquisition: FixedAssetAcquisitionFormGroupInput): void {
    const fixedAssetAcquisitionRawValue = { ...this.getFormDefaults(), ...fixedAssetAcquisition };
    form.reset(
      {
        ...fixedAssetAcquisitionRawValue,
        id: { value: fixedAssetAcquisitionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FixedAssetAcquisitionFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
