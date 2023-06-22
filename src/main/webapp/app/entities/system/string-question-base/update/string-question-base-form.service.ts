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

import { IStringQuestionBase, NewStringQuestionBase } from '../string-question-base.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStringQuestionBase for edit and NewStringQuestionBaseFormGroupInput for create.
 */
type StringQuestionBaseFormGroupInput = IStringQuestionBase | PartialWithRequiredKeyOf<NewStringQuestionBase>;

type StringQuestionBaseFormDefaults = Pick<NewStringQuestionBase, 'id' | 'required' | 'iterable' | 'parameters' | 'placeholderItems'>;

type StringQuestionBaseFormGroupContent = {
  id: FormControl<IStringQuestionBase['id'] | NewStringQuestionBase['id']>;
  value: FormControl<IStringQuestionBase['value']>;
  key: FormControl<IStringQuestionBase['key']>;
  label: FormControl<IStringQuestionBase['label']>;
  required: FormControl<IStringQuestionBase['required']>;
  order: FormControl<IStringQuestionBase['order']>;
  controlType: FormControl<IStringQuestionBase['controlType']>;
  placeholder: FormControl<IStringQuestionBase['placeholder']>;
  iterable: FormControl<IStringQuestionBase['iterable']>;
  parameters: FormControl<IStringQuestionBase['parameters']>;
  placeholderItems: FormControl<IStringQuestionBase['placeholderItems']>;
};

export type StringQuestionBaseFormGroup = FormGroup<StringQuestionBaseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StringQuestionBaseFormService {
  createStringQuestionBaseFormGroup(stringQuestionBase: StringQuestionBaseFormGroupInput = { id: null }): StringQuestionBaseFormGroup {
    const stringQuestionBaseRawValue = {
      ...this.getFormDefaults(),
      ...stringQuestionBase,
    };
    return new FormGroup<StringQuestionBaseFormGroupContent>({
      id: new FormControl(
        { value: stringQuestionBaseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      value: new FormControl(stringQuestionBaseRawValue.value),
      key: new FormControl(stringQuestionBaseRawValue.key, {
        validators: [Validators.required],
      }),
      label: new FormControl(stringQuestionBaseRawValue.label, {
        validators: [Validators.required],
      }),
      required: new FormControl(stringQuestionBaseRawValue.required),
      order: new FormControl(stringQuestionBaseRawValue.order, {
        validators: [Validators.required],
      }),
      controlType: new FormControl(stringQuestionBaseRawValue.controlType, {
        validators: [Validators.required],
      }),
      placeholder: new FormControl(stringQuestionBaseRawValue.placeholder),
      iterable: new FormControl(stringQuestionBaseRawValue.iterable),
      parameters: new FormControl(stringQuestionBaseRawValue.parameters ?? []),
      placeholderItems: new FormControl(stringQuestionBaseRawValue.placeholderItems ?? []),
    });
  }

  getStringQuestionBase(form: StringQuestionBaseFormGroup): IStringQuestionBase | NewStringQuestionBase {
    return form.getRawValue() as IStringQuestionBase | NewStringQuestionBase;
  }

  resetForm(form: StringQuestionBaseFormGroup, stringQuestionBase: StringQuestionBaseFormGroupInput): void {
    const stringQuestionBaseRawValue = { ...this.getFormDefaults(), ...stringQuestionBase };
    form.reset(
      {
        ...stringQuestionBaseRawValue,
        id: { value: stringQuestionBaseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): StringQuestionBaseFormDefaults {
    return {
      id: null,
      required: false,
      iterable: false,
      parameters: [],
      placeholderItems: [],
    };
  }
}
