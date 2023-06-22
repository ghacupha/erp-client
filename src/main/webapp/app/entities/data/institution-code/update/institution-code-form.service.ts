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

import { IInstitutionCode, NewInstitutionCode } from '../institution-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstitutionCode for edit and NewInstitutionCodeFormGroupInput for create.
 */
type InstitutionCodeFormGroupInput = IInstitutionCode | PartialWithRequiredKeyOf<NewInstitutionCode>;

type InstitutionCodeFormDefaults = Pick<NewInstitutionCode, 'id' | 'placeholders'>;

type InstitutionCodeFormGroupContent = {
  id: FormControl<IInstitutionCode['id'] | NewInstitutionCode['id']>;
  institutionCode: FormControl<IInstitutionCode['institutionCode']>;
  institutionName: FormControl<IInstitutionCode['institutionName']>;
  shortName: FormControl<IInstitutionCode['shortName']>;
  category: FormControl<IInstitutionCode['category']>;
  institutionCategory: FormControl<IInstitutionCode['institutionCategory']>;
  placeholders: FormControl<IInstitutionCode['placeholders']>;
};

export type InstitutionCodeFormGroup = FormGroup<InstitutionCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstitutionCodeFormService {
  createInstitutionCodeFormGroup(institutionCode: InstitutionCodeFormGroupInput = { id: null }): InstitutionCodeFormGroup {
    const institutionCodeRawValue = {
      ...this.getFormDefaults(),
      ...institutionCode,
    };
    return new FormGroup<InstitutionCodeFormGroupContent>({
      id: new FormControl(
        { value: institutionCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      institutionCode: new FormControl(institutionCodeRawValue.institutionCode, {
        validators: [Validators.required],
      }),
      institutionName: new FormControl(institutionCodeRawValue.institutionName, {
        validators: [Validators.required],
      }),
      shortName: new FormControl(institutionCodeRawValue.shortName),
      category: new FormControl(institutionCodeRawValue.category),
      institutionCategory: new FormControl(institutionCodeRawValue.institutionCategory),
      placeholders: new FormControl(institutionCodeRawValue.placeholders ?? []),
    });
  }

  getInstitutionCode(form: InstitutionCodeFormGroup): IInstitutionCode | NewInstitutionCode {
    return form.getRawValue() as IInstitutionCode | NewInstitutionCode;
  }

  resetForm(form: InstitutionCodeFormGroup, institutionCode: InstitutionCodeFormGroupInput): void {
    const institutionCodeRawValue = { ...this.getFormDefaults(), ...institutionCode };
    form.reset(
      {
        ...institutionCodeRawValue,
        id: { value: institutionCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InstitutionCodeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
