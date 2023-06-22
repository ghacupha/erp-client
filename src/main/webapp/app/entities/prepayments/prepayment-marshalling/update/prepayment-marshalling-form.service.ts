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

import { IPrepaymentMarshalling, NewPrepaymentMarshalling } from '../prepayment-marshalling.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPrepaymentMarshalling for edit and NewPrepaymentMarshallingFormGroupInput for create.
 */
type PrepaymentMarshallingFormGroupInput = IPrepaymentMarshalling | PartialWithRequiredKeyOf<NewPrepaymentMarshalling>;

type PrepaymentMarshallingFormDefaults = Pick<NewPrepaymentMarshalling, 'id' | 'inactive' | 'placeholders'>;

type PrepaymentMarshallingFormGroupContent = {
  id: FormControl<IPrepaymentMarshalling['id'] | NewPrepaymentMarshalling['id']>;
  inactive: FormControl<IPrepaymentMarshalling['inactive']>;
  amortizationCommencementDate: FormControl<IPrepaymentMarshalling['amortizationCommencementDate']>;
  amortizationPeriods: FormControl<IPrepaymentMarshalling['amortizationPeriods']>;
  prepaymentAccount: FormControl<IPrepaymentMarshalling['prepaymentAccount']>;
  placeholders: FormControl<IPrepaymentMarshalling['placeholders']>;
};

export type PrepaymentMarshallingFormGroup = FormGroup<PrepaymentMarshallingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PrepaymentMarshallingFormService {
  createPrepaymentMarshallingFormGroup(
    prepaymentMarshalling: PrepaymentMarshallingFormGroupInput = { id: null }
  ): PrepaymentMarshallingFormGroup {
    const prepaymentMarshallingRawValue = {
      ...this.getFormDefaults(),
      ...prepaymentMarshalling,
    };
    return new FormGroup<PrepaymentMarshallingFormGroupContent>({
      id: new FormControl(
        { value: prepaymentMarshallingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      inactive: new FormControl(prepaymentMarshallingRawValue.inactive, {
        validators: [Validators.required],
      }),
      amortizationCommencementDate: new FormControl(prepaymentMarshallingRawValue.amortizationCommencementDate),
      amortizationPeriods: new FormControl(prepaymentMarshallingRawValue.amortizationPeriods),
      prepaymentAccount: new FormControl(prepaymentMarshallingRawValue.prepaymentAccount, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(prepaymentMarshallingRawValue.placeholders ?? []),
    });
  }

  getPrepaymentMarshalling(form: PrepaymentMarshallingFormGroup): IPrepaymentMarshalling | NewPrepaymentMarshalling {
    return form.getRawValue() as IPrepaymentMarshalling | NewPrepaymentMarshalling;
  }

  resetForm(form: PrepaymentMarshallingFormGroup, prepaymentMarshalling: PrepaymentMarshallingFormGroupInput): void {
    const prepaymentMarshallingRawValue = { ...this.getFormDefaults(), ...prepaymentMarshalling };
    form.reset(
      {
        ...prepaymentMarshallingRawValue,
        id: { value: prepaymentMarshallingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PrepaymentMarshallingFormDefaults {
    return {
      id: null,
      inactive: false,
      placeholders: [],
    };
  }
}
