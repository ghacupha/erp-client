import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAssetCategory, NewAssetCategory } from '../asset-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAssetCategory for edit and NewAssetCategoryFormGroupInput for create.
 */
type AssetCategoryFormGroupInput = IAssetCategory | PartialWithRequiredKeyOf<NewAssetCategory>;

type AssetCategoryFormDefaults = Pick<NewAssetCategory, 'id' | 'placeholders'>;

type AssetCategoryFormGroupContent = {
  id: FormControl<IAssetCategory['id'] | NewAssetCategory['id']>;
  assetCategoryName: FormControl<IAssetCategory['assetCategoryName']>;
  description: FormControl<IAssetCategory['description']>;
  notes: FormControl<IAssetCategory['notes']>;
  remarks: FormControl<IAssetCategory['remarks']>;
  depreciationMethod: FormControl<IAssetCategory['depreciationMethod']>;
  placeholders: FormControl<IAssetCategory['placeholders']>;
};

export type AssetCategoryFormGroup = FormGroup<AssetCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssetCategoryFormService {
  createAssetCategoryFormGroup(assetCategory: AssetCategoryFormGroupInput = { id: null }): AssetCategoryFormGroup {
    const assetCategoryRawValue = {
      ...this.getFormDefaults(),
      ...assetCategory,
    };
    return new FormGroup<AssetCategoryFormGroupContent>({
      id: new FormControl(
        { value: assetCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      assetCategoryName: new FormControl(assetCategoryRawValue.assetCategoryName, {
        validators: [Validators.required],
      }),
      description: new FormControl(assetCategoryRawValue.description),
      notes: new FormControl(assetCategoryRawValue.notes),
      remarks: new FormControl(assetCategoryRawValue.remarks),
      depreciationMethod: new FormControl(assetCategoryRawValue.depreciationMethod, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(assetCategoryRawValue.placeholders ?? []),
    });
  }

  getAssetCategory(form: AssetCategoryFormGroup): IAssetCategory | NewAssetCategory {
    return form.getRawValue() as IAssetCategory | NewAssetCategory;
  }

  resetForm(form: AssetCategoryFormGroup, assetCategory: AssetCategoryFormGroupInput): void {
    const assetCategoryRawValue = { ...this.getFormDefaults(), ...assetCategory };
    form.reset(
      {
        ...assetCategoryRawValue,
        id: { value: assetCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AssetCategoryFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
