import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUniversallyUniqueMapping, NewUniversallyUniqueMapping } from '../universally-unique-mapping.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUniversallyUniqueMapping for edit and NewUniversallyUniqueMappingFormGroupInput for create.
 */
type UniversallyUniqueMappingFormGroupInput = IUniversallyUniqueMapping | PartialWithRequiredKeyOf<NewUniversallyUniqueMapping>;

type UniversallyUniqueMappingFormDefaults = Pick<NewUniversallyUniqueMapping, 'id'>;

type UniversallyUniqueMappingFormGroupContent = {
  id: FormControl<IUniversallyUniqueMapping['id'] | NewUniversallyUniqueMapping['id']>;
  universalKey: FormControl<IUniversallyUniqueMapping['universalKey']>;
  mappedValue: FormControl<IUniversallyUniqueMapping['mappedValue']>;
};

export type UniversallyUniqueMappingFormGroup = FormGroup<UniversallyUniqueMappingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UniversallyUniqueMappingFormService {
  createUniversallyUniqueMappingFormGroup(
    universallyUniqueMapping: UniversallyUniqueMappingFormGroupInput = { id: null }
  ): UniversallyUniqueMappingFormGroup {
    const universallyUniqueMappingRawValue = {
      ...this.getFormDefaults(),
      ...universallyUniqueMapping,
    };
    return new FormGroup<UniversallyUniqueMappingFormGroupContent>({
      id: new FormControl(
        { value: universallyUniqueMappingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      universalKey: new FormControl(universallyUniqueMappingRawValue.universalKey, {
        validators: [Validators.required],
      }),
      mappedValue: new FormControl(universallyUniqueMappingRawValue.mappedValue),
    });
  }

  getUniversallyUniqueMapping(form: UniversallyUniqueMappingFormGroup): IUniversallyUniqueMapping | NewUniversallyUniqueMapping {
    return form.getRawValue() as IUniversallyUniqueMapping | NewUniversallyUniqueMapping;
  }

  resetForm(form: UniversallyUniqueMappingFormGroup, universallyUniqueMapping: UniversallyUniqueMappingFormGroupInput): void {
    const universallyUniqueMappingRawValue = { ...this.getFormDefaults(), ...universallyUniqueMapping };
    form.reset(
      {
        ...universallyUniqueMappingRawValue,
        id: { value: universallyUniqueMappingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UniversallyUniqueMappingFormDefaults {
    return {
      id: null,
    };
  }
}
