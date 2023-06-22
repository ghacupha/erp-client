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

import { IPrepaymentMapping, NewPrepaymentMapping } from '../prepayment-mapping.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPrepaymentMapping for edit and NewPrepaymentMappingFormGroupInput for create.
 */
type PrepaymentMappingFormGroupInput = IPrepaymentMapping | PartialWithRequiredKeyOf<NewPrepaymentMapping>;

type PrepaymentMappingFormDefaults = Pick<NewPrepaymentMapping, 'id' | 'placeholders'>;

type PrepaymentMappingFormGroupContent = {
  id: FormControl<IPrepaymentMapping['id'] | NewPrepaymentMapping['id']>;
  parameterKey: FormControl<IPrepaymentMapping['parameterKey']>;
  parameterGuid: FormControl<IPrepaymentMapping['parameterGuid']>;
  parameter: FormControl<IPrepaymentMapping['parameter']>;
  placeholders: FormControl<IPrepaymentMapping['placeholders']>;
};

export type PrepaymentMappingFormGroup = FormGroup<PrepaymentMappingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PrepaymentMappingFormService {
  createPrepaymentMappingFormGroup(prepaymentMapping: PrepaymentMappingFormGroupInput = { id: null }): PrepaymentMappingFormGroup {
    const prepaymentMappingRawValue = {
      ...this.getFormDefaults(),
      ...prepaymentMapping,
    };
    return new FormGroup<PrepaymentMappingFormGroupContent>({
      id: new FormControl(
        { value: prepaymentMappingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      parameterKey: new FormControl(prepaymentMappingRawValue.parameterKey, {
        validators: [Validators.required],
      }),
      parameterGuid: new FormControl(prepaymentMappingRawValue.parameterGuid, {
        validators: [Validators.required],
      }),
      parameter: new FormControl(prepaymentMappingRawValue.parameter, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(prepaymentMappingRawValue.placeholders ?? []),
    });
  }

  getPrepaymentMapping(form: PrepaymentMappingFormGroup): IPrepaymentMapping | NewPrepaymentMapping {
    return form.getRawValue() as IPrepaymentMapping | NewPrepaymentMapping;
  }

  resetForm(form: PrepaymentMappingFormGroup, prepaymentMapping: PrepaymentMappingFormGroupInput): void {
    const prepaymentMappingRawValue = { ...this.getFormDefaults(), ...prepaymentMapping };
    form.reset(
      {
        ...prepaymentMappingRawValue,
        id: { value: prepaymentMappingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PrepaymentMappingFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
