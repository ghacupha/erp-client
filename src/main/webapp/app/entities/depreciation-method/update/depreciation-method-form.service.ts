import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDepreciationMethod, NewDepreciationMethod } from '../depreciation-method.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDepreciationMethod for edit and NewDepreciationMethodFormGroupInput for create.
 */
type DepreciationMethodFormGroupInput = IDepreciationMethod | PartialWithRequiredKeyOf<NewDepreciationMethod>;

type DepreciationMethodFormDefaults = Pick<NewDepreciationMethod, 'id' | 'placeholders'>;

type DepreciationMethodFormGroupContent = {
  id: FormControl<IDepreciationMethod['id'] | NewDepreciationMethod['id']>;
  depreciationMethodName: FormControl<IDepreciationMethod['depreciationMethodName']>;
  description: FormControl<IDepreciationMethod['description']>;
  depreciationType: FormControl<IDepreciationMethod['depreciationType']>;
  remarks: FormControl<IDepreciationMethod['remarks']>;
  placeholders: FormControl<IDepreciationMethod['placeholders']>;
};

export type DepreciationMethodFormGroup = FormGroup<DepreciationMethodFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DepreciationMethodFormService {
  createDepreciationMethodFormGroup(depreciationMethod: DepreciationMethodFormGroupInput = { id: null }): DepreciationMethodFormGroup {
    const depreciationMethodRawValue = {
      ...this.getFormDefaults(),
      ...depreciationMethod,
    };
    return new FormGroup<DepreciationMethodFormGroupContent>({
      id: new FormControl(
        { value: depreciationMethodRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      depreciationMethodName: new FormControl(depreciationMethodRawValue.depreciationMethodName, {
        validators: [Validators.required],
      }),
      description: new FormControl(depreciationMethodRawValue.description),
      depreciationType: new FormControl(depreciationMethodRawValue.depreciationType, {
        validators: [Validators.required],
      }),
      remarks: new FormControl(depreciationMethodRawValue.remarks),
      placeholders: new FormControl(depreciationMethodRawValue.placeholders ?? []),
    });
  }

  getDepreciationMethod(form: DepreciationMethodFormGroup): IDepreciationMethod | NewDepreciationMethod {
    return form.getRawValue() as IDepreciationMethod | NewDepreciationMethod;
  }

  resetForm(form: DepreciationMethodFormGroup, depreciationMethod: DepreciationMethodFormGroupInput): void {
    const depreciationMethodRawValue = { ...this.getFormDefaults(), ...depreciationMethod };
    form.reset(
      {
        ...depreciationMethodRawValue,
        id: { value: depreciationMethodRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DepreciationMethodFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
