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
