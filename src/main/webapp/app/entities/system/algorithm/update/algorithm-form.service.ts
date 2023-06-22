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

import { IAlgorithm, NewAlgorithm } from '../algorithm.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlgorithm for edit and NewAlgorithmFormGroupInput for create.
 */
type AlgorithmFormGroupInput = IAlgorithm | PartialWithRequiredKeyOf<NewAlgorithm>;

type AlgorithmFormDefaults = Pick<NewAlgorithm, 'id' | 'placeholders' | 'parameters'>;

type AlgorithmFormGroupContent = {
  id: FormControl<IAlgorithm['id'] | NewAlgorithm['id']>;
  name: FormControl<IAlgorithm['name']>;
  placeholders: FormControl<IAlgorithm['placeholders']>;
  parameters: FormControl<IAlgorithm['parameters']>;
};

export type AlgorithmFormGroup = FormGroup<AlgorithmFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlgorithmFormService {
  createAlgorithmFormGroup(algorithm: AlgorithmFormGroupInput = { id: null }): AlgorithmFormGroup {
    const algorithmRawValue = {
      ...this.getFormDefaults(),
      ...algorithm,
    };
    return new FormGroup<AlgorithmFormGroupContent>({
      id: new FormControl(
        { value: algorithmRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(algorithmRawValue.name, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(algorithmRawValue.placeholders ?? []),
      parameters: new FormControl(algorithmRawValue.parameters ?? []),
    });
  }

  getAlgorithm(form: AlgorithmFormGroup): IAlgorithm | NewAlgorithm {
    return form.getRawValue() as IAlgorithm | NewAlgorithm;
  }

  resetForm(form: AlgorithmFormGroup, algorithm: AlgorithmFormGroupInput): void {
    const algorithmRawValue = { ...this.getFormDefaults(), ...algorithm };
    form.reset(
      {
        ...algorithmRawValue,
        id: { value: algorithmRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlgorithmFormDefaults {
    return {
      id: null,
      placeholders: [],
      parameters: [],
    };
  }
}
