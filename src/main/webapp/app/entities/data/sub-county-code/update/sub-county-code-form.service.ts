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

import { ISubCountyCode, NewSubCountyCode } from '../sub-county-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISubCountyCode for edit and NewSubCountyCodeFormGroupInput for create.
 */
type SubCountyCodeFormGroupInput = ISubCountyCode | PartialWithRequiredKeyOf<NewSubCountyCode>;

type SubCountyCodeFormDefaults = Pick<NewSubCountyCode, 'id' | 'placeholders'>;

type SubCountyCodeFormGroupContent = {
  id: FormControl<ISubCountyCode['id'] | NewSubCountyCode['id']>;
  countyCode: FormControl<ISubCountyCode['countyCode']>;
  countyName: FormControl<ISubCountyCode['countyName']>;
  subCountyCode: FormControl<ISubCountyCode['subCountyCode']>;
  subCountyName: FormControl<ISubCountyCode['subCountyName']>;
  placeholders: FormControl<ISubCountyCode['placeholders']>;
};

export type SubCountyCodeFormGroup = FormGroup<SubCountyCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SubCountyCodeFormService {
  createSubCountyCodeFormGroup(subCountyCode: SubCountyCodeFormGroupInput = { id: null }): SubCountyCodeFormGroup {
    const subCountyCodeRawValue = {
      ...this.getFormDefaults(),
      ...subCountyCode,
    };
    return new FormGroup<SubCountyCodeFormGroupContent>({
      id: new FormControl(
        { value: subCountyCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      countyCode: new FormControl(subCountyCodeRawValue.countyCode),
      countyName: new FormControl(subCountyCodeRawValue.countyName),
      subCountyCode: new FormControl(subCountyCodeRawValue.subCountyCode),
      subCountyName: new FormControl(subCountyCodeRawValue.subCountyName),
      placeholders: new FormControl(subCountyCodeRawValue.placeholders ?? []),
    });
  }

  getSubCountyCode(form: SubCountyCodeFormGroup): ISubCountyCode | NewSubCountyCode {
    return form.getRawValue() as ISubCountyCode | NewSubCountyCode;
  }

  resetForm(form: SubCountyCodeFormGroup, subCountyCode: SubCountyCodeFormGroupInput): void {
    const subCountyCodeRawValue = { ...this.getFormDefaults(), ...subCountyCode };
    form.reset(
      {
        ...subCountyCodeRawValue,
        id: { value: subCountyCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SubCountyCodeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
