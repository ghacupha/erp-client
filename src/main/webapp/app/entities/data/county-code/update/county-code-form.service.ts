import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICountyCode, NewCountyCode } from '../county-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICountyCode for edit and NewCountyCodeFormGroupInput for create.
 */
type CountyCodeFormGroupInput = ICountyCode | PartialWithRequiredKeyOf<NewCountyCode>;

type CountyCodeFormDefaults = Pick<NewCountyCode, 'id' | 'placeholders'>;

type CountyCodeFormGroupContent = {
  id: FormControl<ICountyCode['id'] | NewCountyCode['id']>;
  countyCode: FormControl<ICountyCode['countyCode']>;
  countyName: FormControl<ICountyCode['countyName']>;
  subCountyCode: FormControl<ICountyCode['subCountyCode']>;
  subCountyName: FormControl<ICountyCode['subCountyName']>;
  placeholders: FormControl<ICountyCode['placeholders']>;
};

export type CountyCodeFormGroup = FormGroup<CountyCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CountyCodeFormService {
  createCountyCodeFormGroup(countyCode: CountyCodeFormGroupInput = { id: null }): CountyCodeFormGroup {
    const countyCodeRawValue = {
      ...this.getFormDefaults(),
      ...countyCode,
    };
    return new FormGroup<CountyCodeFormGroupContent>({
      id: new FormControl(
        { value: countyCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      countyCode: new FormControl(countyCodeRawValue.countyCode, {
        validators: [Validators.required],
      }),
      countyName: new FormControl(countyCodeRawValue.countyName, {
        validators: [Validators.required],
      }),
      subCountyCode: new FormControl(countyCodeRawValue.subCountyCode, {
        validators: [Validators.required],
      }),
      subCountyName: new FormControl(countyCodeRawValue.subCountyName, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(countyCodeRawValue.placeholders ?? []),
    });
  }

  getCountyCode(form: CountyCodeFormGroup): ICountyCode | NewCountyCode {
    return form.getRawValue() as ICountyCode | NewCountyCode;
  }

  resetForm(form: CountyCodeFormGroup, countyCode: CountyCodeFormGroupInput): void {
    const countyCodeRawValue = { ...this.getFormDefaults(), ...countyCode };
    form.reset(
      {
        ...countyCodeRawValue,
        id: { value: countyCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CountyCodeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
