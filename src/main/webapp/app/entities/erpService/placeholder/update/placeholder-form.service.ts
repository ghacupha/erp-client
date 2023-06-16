import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPlaceholder, NewPlaceholder } from '../placeholder.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlaceholder for edit and NewPlaceholderFormGroupInput for create.
 */
type PlaceholderFormGroupInput = IPlaceholder | PartialWithRequiredKeyOf<NewPlaceholder>;

type PlaceholderFormDefaults = Pick<NewPlaceholder, 'id'>;

type PlaceholderFormGroupContent = {
  id: FormControl<IPlaceholder['id'] | NewPlaceholder['id']>;
  description: FormControl<IPlaceholder['description']>;
  token: FormControl<IPlaceholder['token']>;
  fileUploadToken: FormControl<IPlaceholder['fileUploadToken']>;
  compilationToken: FormControl<IPlaceholder['compilationToken']>;
  containingPlaceholder: FormControl<IPlaceholder['containingPlaceholder']>;
};

export type PlaceholderFormGroup = FormGroup<PlaceholderFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlaceholderFormService {
  createPlaceholderFormGroup(placeholder: PlaceholderFormGroupInput = { id: null }): PlaceholderFormGroup {
    const placeholderRawValue = {
      ...this.getFormDefaults(),
      ...placeholder,
    };
    return new FormGroup<PlaceholderFormGroupContent>({
      id: new FormControl(
        { value: placeholderRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(placeholderRawValue.description, {
        validators: [Validators.required],
      }),
      token: new FormControl(placeholderRawValue.token),
      fileUploadToken: new FormControl(placeholderRawValue.fileUploadToken),
      compilationToken: new FormControl(placeholderRawValue.compilationToken),
      containingPlaceholder: new FormControl(placeholderRawValue.containingPlaceholder),
    });
  }

  getPlaceholder(form: PlaceholderFormGroup): IPlaceholder | NewPlaceholder {
    return form.getRawValue() as IPlaceholder | NewPlaceholder;
  }

  resetForm(form: PlaceholderFormGroup, placeholder: PlaceholderFormGroupInput): void {
    const placeholderRawValue = { ...this.getFormDefaults(), ...placeholder };
    form.reset(
      {
        ...placeholderRawValue,
        id: { value: placeholderRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PlaceholderFormDefaults {
    return {
      id: null,
    };
  }
}
