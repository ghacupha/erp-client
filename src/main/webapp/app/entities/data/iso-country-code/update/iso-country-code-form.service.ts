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

import { IIsoCountryCode, NewIsoCountryCode } from '../iso-country-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IIsoCountryCode for edit and NewIsoCountryCodeFormGroupInput for create.
 */
type IsoCountryCodeFormGroupInput = IIsoCountryCode | PartialWithRequiredKeyOf<NewIsoCountryCode>;

type IsoCountryCodeFormDefaults = Pick<NewIsoCountryCode, 'id' | 'placeholders'>;

type IsoCountryCodeFormGroupContent = {
  id: FormControl<IIsoCountryCode['id'] | NewIsoCountryCode['id']>;
  countryCode: FormControl<IIsoCountryCode['countryCode']>;
  countryDescription: FormControl<IIsoCountryCode['countryDescription']>;
  placeholders: FormControl<IIsoCountryCode['placeholders']>;
};

export type IsoCountryCodeFormGroup = FormGroup<IsoCountryCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class IsoCountryCodeFormService {
  createIsoCountryCodeFormGroup(isoCountryCode: IsoCountryCodeFormGroupInput = { id: null }): IsoCountryCodeFormGroup {
    const isoCountryCodeRawValue = {
      ...this.getFormDefaults(),
      ...isoCountryCode,
    };
    return new FormGroup<IsoCountryCodeFormGroupContent>({
      id: new FormControl(
        { value: isoCountryCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      countryCode: new FormControl(isoCountryCodeRawValue.countryCode),
      countryDescription: new FormControl(isoCountryCodeRawValue.countryDescription),
      placeholders: new FormControl(isoCountryCodeRawValue.placeholders ?? []),
    });
  }

  getIsoCountryCode(form: IsoCountryCodeFormGroup): IIsoCountryCode | NewIsoCountryCode {
    return form.getRawValue() as IIsoCountryCode | NewIsoCountryCode;
  }

  resetForm(form: IsoCountryCodeFormGroup, isoCountryCode: IsoCountryCodeFormGroupInput): void {
    const isoCountryCodeRawValue = { ...this.getFormDefaults(), ...isoCountryCode };
    form.reset(
      {
        ...isoCountryCodeRawValue,
        id: { value: isoCountryCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): IsoCountryCodeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
